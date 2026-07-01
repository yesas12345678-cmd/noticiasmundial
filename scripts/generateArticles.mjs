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
  console.error("Error: DEEPSEEK_API_KEY is not defined.");
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined.");
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
    // Fetch all empty articles
    const { rows: emptyArticles } = await client.query(
      `SELECT id, title, keyword, category, excerpt FROM articles WHERE content = '' OR content IS NULL OR length(content) = 0 ORDER BY id ASC`
    );

    console.log(`Found ${emptyArticles.length} empty articles to generate.`);

    for (let i = 0; i < emptyArticles.length; i++) {
      const article = emptyArticles[i];
      console.log(`\n[${i + 1}/${emptyArticles.length}] Processing Article ID ${article.id}: "${article.title}"...`);

      // Prepare prompt
      let promptText = templateText;
      promptText = promptText.replace('[INSERTAR NICHO O SECTOR AQUÍ]', `Fútbol e Información del Mundial de la FIFA 2026 - Categoría: ${article.category}`);
      promptText = promptText.replace('[INSERTAR TÍTULO AQUÍ]', article.title);
      promptText = promptText.replace('[INSERTAR KEYWORDS AQUÍ]', article.keyword || '');
      promptText = promptText.replace('[OPCIONAL: INSERTAR DETALLES ADICIONALES]', `Detalles: Artículo real sobre el Mundial 2026.`);

      let parsed = null;
      let attempt = 0;
      const maxAttempts = 3;
      let currentPrompt = promptText;

      while (attempt < maxAttempts) {
        attempt++;
        try {
          console.log(`Calling DeepSeek API (Attempt ${attempt}/${maxAttempts})...`);
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
                  content: 'Eres un redactor experto en SEO, redacción deportiva y EEAT. Debes responder únicamente con el objeto JSON solicitado, sin explicaciones ni markdown que lo envuelva. Tu artículo debe ser extremadamente detallado y tener obligatoriamente entre 2200 y 2800 palabras de texto legible (excluyendo etiquetas HTML).'
                },
                {
                  role: 'user',
                  content: currentPrompt
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

          parsed = JSON.parse(cleaned);

          if (!parsed.title || !parsed.meta_title || !parsed.meta_description || !parsed.excerpt || !parsed.content) {
            throw new Error("Missing required JSON fields in API response.");
          }

          const textOnly = parsed.content.replace(/<[^>]*>/g, ' ');
          const wordCount = textOnly.trim().split(/\s+/).filter(w => w.length > 0).length;
          console.log(`Actual word count: ${wordCount} words.`);

          if (wordCount < 2000 || wordCount > 3000) {
            console.warn(`Warning: Word count ${wordCount} is outside the 2000-3000 range.`);
            if (attempt < maxAttempts) {
              currentPrompt = `${promptText}\n\n[SISTEMA: El resultado anterior tenía ${wordCount} palabras. Es OBLIGATORIO que el artículo tenga estrictamente entre 2000 y 3000 palabras de texto legible (excluyendo etiquetas HTML). Por favor, ajusta la extensión de las secciones para cumplir exactamente con este rango.]`;
              continue;
            } else {
              console.log("Saving article anyway despite word count warning on last attempt.");
            }
          }

          break;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err.message);
          if (attempt >= maxAttempts) {
            console.error(`Failed to generate content for article ID ${article.id}.`);
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (parsed) {
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
        console.log(`Article ID ${article.id} successfully generated and updated in database!`);
      }

      // Add a small 2-second delay to avoid aggressive rate limiting
      if (i < emptyArticles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log("All empty articles generated successfully!");

  } catch (err) {
    console.error("Error running generation loop:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
