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

const WP_API_URL = 'https://golazos.co/wp-json/wp/v2';
const WP_USER = 'Manuel Lopez';
const WP_APP_PASS = 'ohIu XD40 Rgvv cqMx M8h3 jwvi';
const authHeader = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');

const CATEGORY_MAP = {
  selecciones: { name: 'Selecciones', slug: 'selecciones' },
  lesiones: { name: 'Lesiones & Bajas', slug: 'lesiones' },
  resultados: { name: 'Resultados', slug: 'resultados' },
  estadisticas: { name: 'Estadísticas', slug: 'estadisticas' }
};

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

// Function to upload media and publish/update post on WordPress
async function syncArticleToWordPress(article, cleanContent, coverUrl) {
  try {
    console.log(`[WordPress Sync] Resolving category for: ${article.category}...`);
    const catInfo = CATEGORY_MAP[article.category] || { name: 'Fútbol', slug: 'futbol' };
    let wpCategoryId = null;

    const catCheck = await fetch(`${WP_API_URL}/categories?slug=${catInfo.slug}`, {
      headers: { 'Authorization': authHeader }
    });
    if (catCheck.ok) {
      const data = await catCheck.json();
      if (data && data.length > 0) {
        wpCategoryId = data[0].id;
      }
    }
    if (!wpCategoryId) {
      const catCreate = await fetch(`${WP_API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: catInfo.name, slug: catInfo.slug })
      });
      if (catCreate.ok) {
        const data = await catCreate.json();
        wpCategoryId = data.id;
      }
    }

    if (!wpCategoryId) {
      console.error(`[WordPress Sync] Failed to resolve category.`);
      return;
    }

    // Upload cover image
    let featuredMediaId = null;
    if (coverUrl) {
      console.log(`[WordPress Sync] Downloading and uploading cover image: ${coverUrl}...`);
      const imgRes = await fetch(coverUrl);
      if (imgRes.ok) {
        const blob = await imgRes.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        const filename = `${article.slug}-cover.jpg`;
        const mediaRes = await fetch(`${WP_API_URL}/media`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Type': 'image/jpeg'
          },
          body: buffer
        });
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          featuredMediaId = mediaData.id;
          console.log(`[WordPress Sync] Cover image uploaded. Media ID: ${featuredMediaId}`);
        }
      }
    }

    // Check if post exists
    let wpPostId = null;
    const postCheck = await fetch(`${WP_API_URL}/posts?slug=${article.slug}&status=any`, {
      headers: { 'Authorization': authHeader }
    });
    if (postCheck.ok) {
      const data = await postCheck.json();
      if (data && data.length > 0) {
        wpPostId = data[0].id;
      }
    }

    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
    const cleanTitle = article.title.replace(emojiRegex, '').trim();
    const cleanExcerpt = article.excerpt.replace(emojiRegex, '').trim();
    const cleanMetaTitle = (article.meta_title || `Noticias Mundial | ${article.title}`).replace(emojiRegex, '').trim();
    const cleanMetaDesc = (article.meta_description || article.excerpt).replace(emojiRegex, '').trim();

    const postData = {
      title: cleanTitle,
      content: cleanContent,
      excerpt: cleanExcerpt,
      categories: [wpCategoryId],
      status: 'publish',
      meta: {
        rank_math_focus_keyword: article.keyword,
        rank_math_title: cleanMetaTitle,
        rank_math_description: cleanMetaDesc
      }
    };
    if (featuredMediaId) {
      postData.featured_media = featuredMediaId;
    }

    if (wpPostId) {
      console.log(`[WordPress Sync] Updating existing post ID: ${wpPostId}...`);
      const updateRes = await fetch(`${WP_API_URL}/posts/${wpPostId}`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      if (updateRes.ok) {
        console.log(`[WordPress Sync] Post updated successfully!`);
      } else {
        const errText = await updateRes.text();
        console.error(`[WordPress Sync] Failed to update post: ${errText}`);
      }
    } else {
      console.log(`[WordPress Sync] Creating new post...`);
      postData.slug = article.slug;
      postData.date = new Date(article.published_at).toISOString().slice(0, 19);
      const createRes = await fetch(`${WP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      if (createRes.ok) {
        const data = await createRes.json();
        console.log(`[WordPress Sync] Post created successfully! WP ID: ${data.id}`);
      } else {
        const errText = await createRes.text();
        console.error(`[WordPress Sync] Failed to create post: ${errText}`);
      }
    }
  } catch (err) {
    console.error(`[WordPress Sync] Error:`, err.message);
  }
}

async function main() {
  const client = await pool.connect();
  try {
    // Fetch all empty articles
    const { rows: emptyArticles } = await client.query(
      `SELECT id, title, keyword, category, excerpt, published_at FROM articles WHERE content = '' OR content IS NULL OR length(content) = 0 ORDER BY id ASC`
    );

    console.log(`Found ${emptyArticles.length} empty articles to generate.`);

    for (let i = 0; i < emptyArticles.length; i++) {
      const article = emptyArticles[i];
      const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      article.slug = slug;

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
        console.log(`Article ID ${article.id} successfully generated, illustrated, and updated in database!`);

        // Synchronize with WordPress (golazos.co)
        const updatedArticle = {
          ...article,
          title: parsed.title,
          excerpt: parsed.excerpt,
          meta_title: parsed.meta_title,
          meta_description: parsed.meta_description
        };
        await syncArticleToWordPress(updatedArticle, finalContent, coverImage);
      }

      // Add a delay to avoid aggressive rate limiting
      if (i < emptyArticles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    console.log("All empty articles generated and synced with WordPress successfully!");

  } catch (err) {
    console.error("Error running generation loop:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
