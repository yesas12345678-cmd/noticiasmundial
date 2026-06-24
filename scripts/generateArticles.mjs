import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Pool } = pg;

// Load env variables manually from .env.local
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const firstEquals = trimmed.indexOf('=');
    if (firstEquals === -1) continue;
    const key = trimmed.slice(0, firstEquals).trim();
    const value = trimmed.slice(firstEquals + 1).trim();
    process.env[key] = value;
  }
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DEEPSEEK_API_KEY) {
  console.error("Error: DEEPSEEK_API_KEY is not defined in .env.local.");
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined in .env.local.");
  process.exit(1);
}

const templatePath = path.resolve('template_general.md');
if (!fs.existsSync(templatePath)) {
  console.error("Error: template_general.md not found in the root directory.");
  process.exit(1);
}
const templateText = fs.readFileSync(templatePath, 'utf8');

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: false,
});

async function main() {
  const client = await pool.connect();
  try {
    console.log("Connecting to the database...");
    
    // Fetch articles that are empty
    const { rows: articles } = await client.query(
      `SELECT id, title, keyword, category FROM articles WHERE content = '' OR content IS NULL OR length(content) = 0 ORDER BY id ASC`
    );

    console.log(`Found ${articles.length} articles with empty content.`);
    if (articles.length === 0) {
      console.log("No articles to process. Exiting.");
      return;
    }

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`\n[${i + 1}/${articles.length}] Processing article ID: ${article.id} - "${article.title}"...`);
      
      // Prepare prompt
      let promptText = templateText;
      promptText = promptText.replace('[INSERTAR NICHO O SECTOR AQUÍ]', `Fútbol e Información del Mundial de la FIFA 2026 - Categoría: ${article.category}`);
      promptText = promptText.replace('[INSERTAR TÍTULO AQUÍ]', article.title);
      promptText = promptText.replace('[INSERTAR KEYWORDS AQUÍ]', article.keyword || '');
      promptText = promptText.replace('[OPCIONAL: INSERTAR DETALLES ADICIONALES]', `Detalles: Artículo real sobre el Mundial 2026 al día de hoy 24 de Junio de 2026.`);

      try {
        console.log(`Calling DeepSeek API for "${article.title}"...`);
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: 'Eres un redactor experto en SEO, redacción deportiva y EEAT. Debes responder únicamente con el objeto JSON solicitado, sin explicaciones ni markdown que lo envuelva.'
              },
              {
                role: 'user',
                content: promptText
              }
            ],
            response_format: {
              type: 'json_object'
            }
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${errText}`);
        }

        const data = await response.json();
        const rawContent = data.choices[0].message.content;

        let cleaned = rawContent.trim();
        if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
        }

        const parsed = JSON.parse(cleaned);

        console.log(`Parsing successful. Received fields: ${Object.keys(parsed).join(', ')}`);
        console.log(`Generated content length: ${parsed.content ? parsed.content.length : 0} characters.`);

        // Validation of required keys
        if (!parsed.title || !parsed.meta_title || !parsed.meta_description || !parsed.excerpt || !parsed.content) {
          throw new Error("Missing required JSON fields in API response.");
        }

        console.log("Updating database...");
        await client.query(
          `UPDATE articles 
           SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, content = $5 
           WHERE id = $6`,
          [
            parsed.title,
            parsed.meta_title,
            parsed.meta_description,
            parsed.excerpt,
            parsed.content,
            article.id
          ]
        );
        console.log(`Article ID ${article.id} successfully updated!`);

      } catch (err) {
        console.error(`Error processing article ID ${article.id}:`, err.message);
        console.log("Skipping to next article...");
      }

      // Small delay to prevent hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("\nAll empty articles processed successfully!");

  } catch (err) {
    console.error("Database connection or processing error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
