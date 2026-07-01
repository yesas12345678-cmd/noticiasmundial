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

// Helper to get Madrid time info
function getMadridTimeInfo() {
  const options = { timeZone: 'Europe/Madrid', hour: 'numeric', hour12: false };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const currentHour = parseInt(formatter.format(new Date()), 10);

  const dateOptions = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateParts = new Intl.DateTimeFormat('en-US', dateOptions).formatToParts(new Date());
  const year = dateParts.find(p => p.type === 'year').value;
  const month = dateParts.find(p => p.type === 'month').value;
  const day = dateParts.find(p => p.type === 'day').value;
  const madridDate = `${year}-${month}-${day}`; // YYYY-MM-DD

  return { currentHour, madridDate };
}

const REALISTIC_FOOTBALL_IMAGES = [
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504155611830-979940686567?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1431324155629-1a6edd1d131d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556056504-517cf015e859?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624880351724-413987415180?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536122985387-a37a6a57c41c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486282458519-5ab1ad1a720e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606925797300-0b35e9072f5d?q=80&w=1200&auto=format&fit=crop"
];

function getRandomImage(excludeList = []) {
  const filtered = REALISTIC_FOOTBALL_IMAGES.filter(img => !excludeList.includes(img));
  const pool = filtered.length > 0 ? filtered : REALISTIC_FOOTBALL_IMAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Generate 2 unique random hours between 9 and 21
function generateRandomHours() {
  const allHours = [];
  for (let h = 9; h <= 21; h++) {
    allHours.push(h);
  }
  // Shuffle allHours
  for (let i = allHours.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allHours[i], allHours[j]] = [allHours[j], allHours[i]];
  }
  // Take first 2 and sort them
  return allHours.slice(0, 2).sort((a, b) => a - b);
}

async function main() {
  const client = await pool.connect();
  try {
    // 1. Create tables if they do not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS daily_generation_schedule (
        scheduled_date DATE PRIMARY KEY,
        hours INT[] NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS generation_log (
        log_date DATE,
        hour INT,
        article_id INT,
        PRIMARY KEY (log_date, hour)
      );
    `);

    // 2. Get current Madrid time
    const { currentHour, madridDate } = getMadridTimeInfo();
    console.log(`Current Madrid Date: ${madridDate}, Hour: ${currentHour}`);

    // 3. Ensure schedule exists for today
    const { rows: existingSchedule } = await client.query(
      'SELECT hours FROM daily_generation_schedule WHERE scheduled_date = $1',
      [madridDate]
    );

    let scheduledHours = [];
    if (existingSchedule.length === 0) {
      scheduledHours = generateRandomHours();
      console.log(`Generating new schedule for today (${madridDate}):`, scheduledHours);
      await client.query(
        'INSERT INTO daily_generation_schedule (scheduled_date, hours) VALUES ($1, $2) ON CONFLICT (scheduled_date) DO UPDATE SET hours = EXCLUDED.hours',
        [madridDate, scheduledHours]
      );
    } else {
      scheduledHours = existingSchedule[0].hours;
      console.log(`Existing schedule for today (${madridDate}):`, scheduledHours);
    }

    // 4. Check if current hour is scheduled
    if (!scheduledHours.includes(currentHour)) {
      console.log(`Current hour (${currentHour}) is not in today's scheduled hours. Exiting.`);
      return;
    }

    // 5. Check if already generated for this hour
    const { rows: loggedGenerations } = await client.query(
      'SELECT article_id FROM generation_log WHERE log_date = $1 AND hour = $2',
      [madridDate, currentHour]
    );

    if (loggedGenerations.length > 0) {
      console.log(`An article (ID: ${loggedGenerations[0].article_id}) was already generated for hour ${currentHour} today. Exiting.`);
      return;
    }

    // 6. Find an empty article to generate
    const { rows: emptyArticles } = await client.query(
      `SELECT id, title, keyword, category FROM articles WHERE content = '' OR content IS NULL OR length(content) = 0 ORDER BY id ASC LIMIT 1`
    );

    if (emptyArticles.length === 0) {
      console.log("No empty articles found in the database. Exiting.");
      return;
    }

    const article = emptyArticles[0];
    console.log(`Found empty article to generate: ID: ${article.id} - "${article.title}"`);

    // Prepare prompt
    let promptText = templateText;
    promptText = promptText.replace('[INSERTAR NICHO O SECTOR AQUÍ]', `Fútbol e Información del Mundial de la FIFA 2026 - Categoría: ${article.category}`);
    promptText = promptText.replace('[INSERTAR TÍTULO AQUÍ]', article.title);
    promptText = promptText.replace('[INSERTAR KEYWORDS AQUÍ]', article.keyword || '');
    promptText = promptText.replace('[OPCIONAL: INSERTAR DETALLES ADICIONALES]', `Detalles: Artículo real sobre el Mundial 2026 al día de hoy 24 de Junio de 2026.`);

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
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (parsed) {
      console.log("Adding realistic cover and inline action images to generated article...");
      const coverImage = getRandomImage();
      const inlineImage = getRandomImage([coverImage]);

      const inlineImageHtml = `
<div data-role='middle-image' class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2'>
  <img src='${inlineImage}' alt='Acción y análisis en el terreno de juego' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>Análisis visual y telemetría de jugadas sobre el césped.</p>
</div>
`;

      let finalContent = parsed.content || '';
      if (finalContent && finalContent.includes('</div>')) {
        const paragraphSplit = finalContent.split('</p>');
        if (paragraphSplit.length >= 4) {
          const middleIndex = Math.floor(paragraphSplit.length / 2);
          paragraphSplit[middleIndex] = paragraphSplit[middleIndex] + inlineImageHtml;
          finalContent = paragraphSplit.join('</p>');
        } else {
          const lastClosingDiv = finalContent.lastIndexOf('</div>');
          if (lastClosingDiv !== -1) {
            finalContent = finalContent.slice(0, lastClosingDiv) + inlineImageHtml + finalContent.slice(lastClosingDiv);
          }
        }
      }

      console.log("Updating database...");
      await client.query(
        `UPDATE articles 
         SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, content = $5, image_url = $6 
         WHERE id = $7`,
        [
          parsed.title,
          parsed.meta_title,
          parsed.meta_description,
          parsed.excerpt,
          finalContent,
          coverImage,
          article.id
        ]
      );

      await client.query(
        'INSERT INTO generation_log (log_date, hour, article_id) VALUES ($1, $2, $3)',
        [madridDate, currentHour, article.id]
      );

      console.log(`Article ID ${article.id} successfully generated, illustrated, and updated at hour ${currentHour}!`);
    }

  } catch (err) {
    console.error("Error running daily generation:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
