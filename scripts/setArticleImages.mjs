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

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: false,
});

// A pre-curated collection of high-quality, realistic, professional World Cup / football stadium and match action images from Unsplash.
// We avoid placeholders or poor illustrations, providing a rich, premium look.
const REALISTIC_FOOTBALL_IMAGES = [
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop", // Stadium lights, dynamic angle
  "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200&auto=format&fit=crop", // Soccer pitch, dramatic sunset
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1200&auto=format&fit=crop", // Football net under stadium lights
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop", // Professional match in progress
  "https://images.unsplash.com/photo-1504155611830-979940686567?q=80&w=1200&auto=format&fit=crop", // Player kick, turf flying
  "https://images.unsplash.com/photo-1431324155629-1a6edd1d131d?q=80&w=1200&auto=format&fit=crop", // Professional soccer field view
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200&auto=format&fit=crop", // Match kick-off close up
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop", // Action shot on goal
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200&auto=format&fit=crop", // Ball on grass line
  "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1200&auto=format&fit=crop", // Crowded stadium, night match
  "https://images.unsplash.com/photo-1556056504-517cf015e859?q=80&w=1200&auto=format&fit=crop", // Stadium structure
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop", // Lush stadium field
  "https://images.unsplash.com/photo-1624880351724-413987415180?q=80&w=1200&auto=format&fit=crop", // Penalty box action shot
  "https://images.unsplash.com/photo-1536122985387-a37a6a57c41c?q=80&w=1200&auto=format&fit=crop", // Referee with whistle in hand
  "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop", // Football boots close up
  "https://images.unsplash.com/photo-1486282458519-5ab1ad1a720e?q=80&w=1200&auto=format&fit=crop", // Fans in stands cheering
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1200&auto=format&fit=crop", // Ball flying through the air
  "https://images.unsplash.com/photo-1606925797300-0b35e9072f5d?q=80&w=1200&auto=format&fit=crop"  // Tactics board with soccer ball
];

function getRandomImage(excludeList = []) {
  const filtered = REALISTIC_FOOTBALL_IMAGES.filter(img => !excludeList.includes(img));
  const pool = filtered.length > 0 ? filtered : REALISTIC_FOOTBALL_IMAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function main() {
  const client = await pool.connect();
  try {
    // 1. Fetch all articles from database
    const { rows: articles } = await client.query(
      `SELECT id, title, image_url, content FROM articles ORDER BY id ASC`
    );

    console.log(`Found ${articles.length} articles to update with cover and inline images.`);

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      const usedImages = [];

      // A. Check if cover image is missing or empty
      let coverImage = art.image_url;
      if (!coverImage || coverImage === '') {
        coverImage = getRandomImage();
        usedImages.push(coverImage);
        console.log(`Article ID ${art.id}: Set cover image to ${coverImage}`);
        await client.query(`UPDATE articles SET image_url = $1 WHERE id = $2`, [coverImage, art.id]);
      } else {
        usedImages.push(coverImage);
      }

      // B. Inject inline image into the middle of the HTML content if not already present
      let content = art.content || '';
      
      // Only inject if content is not empty and doesn't already contain a middle action image block
      if (content && !content.includes('data-role="middle-image"') && content.includes('</div>')) {
        const inlineImage = getRandomImage(usedImages);
        console.log(`Article ID ${art.id}: Injecting inline action image in content...`);

        // Image component wrapper formatted using Tailwind CSS matching the premium style system
        const inlineImageHtml = `
<div data-role='middle-image' class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2'>
  <img src='${inlineImage}' alt='Acción y análisis en el terreno de juego' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>Análisis visual y telemetría de jugadas sobre el césped.</p>
</div>
`;

        // Inject the image at roughly the middle of the article body
        // Find the second H2 or third H3, or search for middle paragraph tags
        const paragraphSplit = content.split('</p>');
        if (paragraphSplit.length >= 4) {
          const middleIndex = Math.floor(paragraphSplit.length / 2);
          paragraphSplit[middleIndex] = paragraphSplit[middleIndex] + inlineImageHtml;
          content = paragraphSplit.join('</p>');
        } else {
          // If short content, inject before the last closing div
          const lastClosingDiv = content.lastIndexOf('</div>');
          if (lastClosingDiv !== -1) {
            content = content.slice(0, lastClosingDiv) + inlineImageHtml + content.slice(lastClosingDiv);
          }
        }

        await client.query(`UPDATE articles SET content = $1 WHERE id = $2`, [content, art.id]);
        console.log(`Article ID ${art.id}: Inline image injected successfully.`);
      }
    }

    console.log("All articles updated with cover and mid-content images successfully!");
  } catch (err) {
    console.error("Error setting article images:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
