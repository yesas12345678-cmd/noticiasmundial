import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Client } = pg;

// 1. Load env vars manually from .env.local
function loadEnv() {
  try {
    const envPath = path.resolve('.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const parts = trimmed.split('=');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
            process.env[key] = value;
          }
        }
      });
      console.log('Loaded variables from .env.local successfully.');
    } else {
      console.warn('Warning: .env.local not found in project root.');
    }
  } catch (err) {
    console.error('Error reading .env.local file:', err);
  }
}

loadEnv();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DEEPSEEK_API_KEY) {
  console.error('CRITICAL: DEEPSEEK_API_KEY is not defined in environment variables.');
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error('CRITICAL: DATABASE_URL is not defined in environment variables.');
  process.exit(1);
}

// 2. Read template_general.md
let template = '';
try {
  template = fs.readFileSync(path.resolve('template_general.md'), 'utf8');
  console.log('Successfully read template_general.md');
} catch (err) {
  console.error('CRITICAL: Could not read template_general.md:', err);
  process.exit(1);
}

// Update the niche and word count requirements in template
template = template.replace('[INSERTAR NICHO O SECTOR AQUÍ]', 'Copa Mundial de la FIFA 2026 y fútbol internacional');
// Replace the word count from "2.000 y 2.500 palabras" to "2.500 y 3.500+ palabras"
template = template.replace(
  'El artículo debe contener estrictamente entre **2.000 y 2.500 palabras de texto real**',
  'El artículo debe contener estrictamente entre **2.500 y 3.500+ palabras de texto real**'
);

// Helper function to calculate word count and read time
function calculateReadTime(htmlContent) {
  if (!htmlContent) return '3 min de lectura';
  const cleanText = htmlContent.replace(/<[^>]*>/g, ' '); // Strip HTML tags
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200); // Average reading speed of 200 words per minute
  return `${minutes} min de lectura`;
}

// 3. Connect to database and fetch articles
async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: false,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database.');

    // Fetch articles with empty or zero-length content
    const { rows: articles } = await client.query(
      "SELECT id, title, category, keyword, excerpt FROM articles WHERE content IS NULL OR content = '' OR LENGTH(content) = 0 ORDER BY id ASC"
    );

    console.log(`Found ${articles.length} articles that need content generation.`);

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      console.log(`\n[${i + 1}/${articles.length}] Processing Article #${art.id}: "${art.title}"...`);

      // Construct system prompt by injecting metadata
      let systemPrompt = template
        .replace('[INSERTAR TÍTULO AQUÍ]', art.title)
        .replace('[INSERTAR KEYWORDS AQUÍ]', art.keyword);

      if (systemPrompt.includes('[OPCIONAL: INSERTAR DETALLES ADICIONALES]')) {
        systemPrompt = systemPrompt.replace(
          '[OPCIONAL: INSERTAR DETALLES ADICIONALES]',
          `Categoría del artículo: ${art.category}. Extracto del boletín original: ${art.excerpt}`
        );
      }

      let success = false;
      let retries = 3;

      while (!success && retries > 0) {
        try {
          console.log(`Sending API request to DeepSeek (Retries left: ${retries - 1})...`);
          
          const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Escribe el artículo completo con las directivas especificadas. El artículo debe ser en español, de 2500 a 3500+ palabras de texto real, utilizar formato HTML adaptado a Tailwind CSS en comillas simples para la propiedad 'content', no contener emojis bajo ninguna circunstancia, e incluir tablas, tarjetas y acordeones. Devuelve la respuesta estrictamente estructurada como un objeto JSON.` }
              ],
              response_format: { type: 'json_object' },
              temperature: 0.3,
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API HTTP Error ${response.status}: ${errText}`);
          }

          const resData = await response.json();
          const jsonText = resData.choices[0].message.content;

          // Parse JSON returned by model
          const parsed = JSON.parse(jsonText);

          if (!parsed.content || !parsed.title) {
            throw new Error('API returned JSON, but properties "content" or "title" are missing.');
          }

          const readTime = calculateReadTime(parsed.content);

          console.log('Article generated successfully. Updating database...');

          // Perform UPDATE query
          await client.query(
            `
            UPDATE articles SET
              title = $1,
              meta_title = $2,
              meta_description = $3,
              excerpt = $4,
              content = $5,
              read_time = $6
            WHERE id = $7
            `,
            [
              parsed.title,
              parsed.meta_title || parsed.title,
              parsed.meta_description || parsed.excerpt || '',
              parsed.excerpt || art.excerpt,
              parsed.content,
              readTime,
              art.id,
            ]
          );

          console.log(`Successfully saved Article #${art.id}!`);
          success = true;
        } catch (err) {
          console.error(`Error processing article #${art.id}:`, err.message);
          retries--;
          if (retries === 0) {
            console.error(`Failed to process Article #${art.id} after all retries. Skipping.`);
          } else {
            console.log('Waiting 5 seconds before retrying...');
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      }

      // Respect rate limits: add a small delay between requests
      if (i < articles.length - 1) {
        console.log('Waiting 2 seconds before the next article...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\nAll empty articles processed successfully.');
  } catch (err) {
    console.error('Fatal database error:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
