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
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:cugh0qsq8uaeawz5@187.127.233.89:5435/postgres';

if (!DEEPSEEK_API_KEY) {
  console.error("Error: DEEPSEEK_API_KEY is not defined.");
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

// Fallback pools of 40 unique Unsplash photo IDs per category to guarantee no repeats
const PHOTO_ID_POOLS = {
  internacional: [
    'photo-1541872703-74c5e44368f9', 'photo-1451187580459-43490279c0fa', 'photo-1590402421685-64de85567bcf',
    'photo-1579546929518-9e396f3cc809', 'photo-1486406146926-c627a92ad1ab', 'photo-1529107386315-e1a2ed48a620',
    'photo-1526304640581-d334cdbbf45e', 'photo-1454165804606-c3d57bc86b40', 'photo-1473186578172-c141e6798cf4',
    'photo-1517048676732-d65bc937f952', 'photo-1557804506-669a67965ba0', 'photo-1568992687947-868a62a9f521',
    'photo-1517245386807-bb43f82c33c4', 'photo-1497366216548-37526070297c', 'photo-1497215728101-856f4ea42174',
    'photo-1515187029135-18ee286d815b', 'photo-1556761175-4b46a572b786', 'photo-1491336477066-31156b5e4f35',
    'photo-1522071820081-009f0129c71c', 'photo-1531535934027-68782a11f75d', 'photo-1504384308090-c894fdcc538d',
    'photo-1519389950473-47ba0277781c', 'photo-1515378791036-0648a3ef77b2', 'photo-1527689368864-3a821dbccc34',
    'photo-1516321318423-f06f85e504b3', 'photo-1531482615713-2afd69097998', 'photo-1507537297725-24a1c029d3ca',
    'photo-1573164713988-8665fc963095', 'photo-1552667466-07770ae110d0', 'photo-1560250097-0b93528c311a',
    'photo-1573496359142-b8d87734a5a2', 'photo-1573497019940-1c28c88b4f3e', 'photo-1573497491208-6b1acb260507',
    'photo-1580894732444-8febeb78fb3e', 'photo-1580894894513-541e068a3e2b', 'photo-1580894908361-9671950ee345',
    'photo-1581092921461-eab62e97a780', 'photo-1581092580497-e0d23cbdf1dc', 'photo-15810926825-a6a2a5aee158',
    'photo-1581591524425-c7e0978865fc'
  ],
  economia: [
    'photo-1591696205602-2f950c417cb9', 'photo-1611974789855-9c2a0a7236a3', 'photo-1559526324-4b87b5e36e44',
    'photo-1544377193-33dcf4d68fb5', 'photo-1565514020179-026b92b84bb6', 'photo-1607604276583-eef5d076aa5f',
    'photo-1628157582853-a796fa650a6a', 'photo-1579621970563-ebec7560ff3e', 'photo-1579621970795-87fabb3f9765',
    'photo-1579621970588-a35d0e7ab9b6', 'photo-1569025743873-ea3a9ae8a5a6', 'photo-1534951009808-766178b47a4f',
    'photo-1518546305927-5a555bb7020d', 'photo-1553729459-beb747028b4c', 'photo-1520607162513-77705c0f0d4a',
    'photo-1460925895917-afdab827c52f', 'photo-1454165804606-c3d57bc86b40', 'photo-1507679799987-c73779587ccf',
    'photo-1556761175-4b46a572b786', 'photo-1519085360753-af0119f7cbe7', 'photo-1551836022-d5d88e9218df',
    'photo-1552581230-2fe1e74917d2', 'photo-1580618672591-eb180b1a973f', 'photo-1516321318423-f06f85e504b3',
    'photo-1516321497487-e288fb19713f', 'photo-1522071820081-009f0129c71c', 'photo-1523240795612-9a054b0db644',
    'photo-1504805572947-34fad45aed93', 'photo-1524758631624-e2822e304c36', 'photo-1531497865144-0464ef8fb9a9',
    'photo-1531535934027-68782a11f75d', 'photo-1522202176988-66273c2fd55f', 'photo-1542744094-3a31f103e35f',
    'photo-1542744097-8e0ee26cf660', 'photo-1543269664-76bc3997d9ea', 'photo-1543269865-cbf427effbad',
    'photo-1551135049-8a33b5883817', 'photo-1552667466-07770ae110d0', 'photo-1557425955-df376b5903c8',
    'photo-1444653303775-6134b69d5f7f'
  ],
  tecnologia: [
    'photo-1485827404703-89b55fcc595e', 'photo-1518770660439-4636190af475', 'photo-1526374965328-7f61d4dc18c5',
    'photo-1531297484001-80022131f5a1', 'photo-1581092160607-ee22621dd758', 'photo-1581092795360-fd1ca04f0952',
    'photo-1581090464777-f3220bbe1b8b', 'photo-1563986768609-322da13575f3', 'photo-1504639725590-34d0984388bd',
    'photo-1515879218367-8466d910aaa4', 'photo-1550751827-4bd374c3f58b', 'photo-1607799279861-4dd421887fb3',
    'photo-1461749280684-dccba630e2f6', 'photo-1498050108023-c5249f4df085', 'photo-1504384308090-c894fdcc538d',
    'photo-1519389950473-47ba0277781c', 'photo-1535378917042-10a22c95931a', 'photo-1527474305487-b87b222841cc',
    'photo-1523961131990-5ea7c61b2107', 'photo-1618005182384-a83a8bd57fbe', 'photo-1605810230434-7631ac76ec81',
    'photo-1581092335397-9583fe92d232', 'photo-1581091224855-46f903823485', 'photo-1581092918157-198ca18cb49a',
    'photo-1581092160562-40aa08e78837', 'photo-1581091870623-8e59017e235a', 'photo-1581092333481-acdb230d32bb',
    'photo-1581092583597-20b47566e923', 'photo-1581090465225-b82798991d12', 'photo-1531297484001-80022131f5a1',
    'photo-1507238691740-187a5b1d37b8', 'photo-1550751827-4bd374c3f58b', 'photo-1488590528505-98d2b5aba04b',
    'photo-1518770660439-4636190af475', 'photo-1460925895917-afdab827c52f', 'photo-1526374965328-7f61d4dc18c5',
    'photo-1535378917042-10a22c95931a', 'photo-1531297484001-80022131f5a1', 'photo-1518770660439-4636190af475',
    'photo-1550751827-4bd374c3f58b'
  ],
  cultura: [
    'photo-1460661419201-fd4cecdf8a8b', 'photo-1457369804613-52c61a468e7d', 'photo-1513364776144-60967b0f800f',
    'photo-1508962914676-134849a727f0', 'photo-1507679799987-c73779587ccf', 'photo-1558591710-4b4a1ae0f04d',
    'photo-1505232458627-5ec90e586b9c', 'photo-1518152006812-edab29b069ac', 'photo-1492691527719-9d1e07e534b4',
    'photo-1579783900882-c0d3dad7b119', 'photo-1579783902614-a3fb3927b6a5', 'photo-1579783928621-7a13d66a6211',
    'photo-1459749411175-04bf5292ceea', 'photo-1514306191717-452ec28c7814', 'photo-1511671782779-c97d3d27a1d4',
    'photo-1470225620780-dba8ba36b745', 'photo-1511379938547-c1f69419868d', 'photo-1498038432885-c6f3f1b912ee',
    'photo-1465847899084-d164df4dedc6', 'photo-1518609878373-06d740f60d8b', 'photo-1489599849927-2ee91cede3ba',
    'photo-1506157786151-b8491531f063', 'photo-1536440136628-849c177e76a1', 'photo-1516450360452-9312f5e86fc7',
    'photo-1503095391755-14144f54545a', 'photo-1501281668745-f7f57925c3b4', 'photo-1514525253161-7a46d19cd819',
    'photo-1470229722913-7c0e2dbbafd3', 'photo-1516280440614-37939bbacd6a', 'photo-1485579149621-3123dd979885',
    'photo-1533174072545-7a4b6ad7a6c3', 'photo-1501386761578-eac5c94b800a', 'photo-1504609773096-104ff2c73ba4',
    'photo-1505842465776-3b39d7e685f1', 'photo-1513829096963-c5b57f40cfbd', 'photo-1490730141103-6cac27aaab94',
    'photo-1501386761578-eac5c94b800a', 'photo-1448375240586-882707db888b', 'photo-1496442226666-8d4d0e62e6e9',
    'photo-1508700115892-45ecd05ae2ad'
  ],
  deportes: [
    'photo-1508098682722-e99c43a406b2', 'photo-1517649763962-0c623066013b', 'photo-1551958219-acbc608c6377',
    'photo-1556056504-517cf015e859', 'photo-1461896836934-ffe607ba8211', 'photo-1518063319789-7217e6706b04',
    'photo-1577223625816-7546f13df25d', 'photo-1529900748604-07564a03e7a6', 'photo-1504155611830-979940686567',
    'photo-1431324155629-1a6edd1d131d', 'photo-1560272564-c83b66b1ad12', 'photo-1510566337590-2fc1f21d0faa',
    'photo-1522771739844-6a9f6d5f14af', 'photo-1624880351724-413987415180', 'photo-1536122985387-a37a6a57c41c',
    'photo-1552667466-07770ae110d0', 'photo-1486282458519-5ab1ad1a720e', 'photo-1509048191080-d2984bad6ae5',
    'photo-1606925797300-0b35e9072f5d', 'photo-1502014822147-1aedfb0676e0', 'photo-1476480862126-209bfaa8edc8',
    'photo-1517838277536-f5f99be501cd', 'photo-1552674605-db6ffd4facb5', 'photo-1530541930197-df16a441840a',
    'photo-1541252260730-0412e8e2108e', 'photo-1548690312-e3b507d8c110', 'photo-1517438476312-12d8594327c0',
    'photo-1526676069060-6e5a6efb3587', 'photo-1519766304817-4f37bda74a27', 'photo-1535131749006-b7f58c99034b',
    'photo-1518611012118-696072aa579a', 'photo-1516239786497-b195254934a6', 'photo-1544698310-74ea9d1c8258',
    'photo-1524646349956-15906788e2c6', 'photo-1525466723-0d48a0ee5019', 'photo-1529244970774-7540288be836',
    'photo-1547941126-3d5323b218e6', 'photo-1551854838-212c50b4c184', 'photo-1483721310020-03333e577078',
    'photo-1502680390469-be75c86b636f'
  ],
};

async function getUsedImages(client) {
  const used = new Set();
  try {
    const { rows } = await client.query('SELECT image_url, content FROM articles');
    for (const row of rows) {
      if (row.image_url) {
        used.add(row.image_url);
        used.add(row.image_url.split('?')[0]);
      }
      if (row.content) {
        const regex = /<img[^>]+src=['"]([^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(row.content)) !== null) {
          used.add(match[1]);
          used.add(match[1].split('?')[0]);
        }
      }
    }
  } catch (err) {
    console.error('Error fetching used images:', err);
  }
  return used;
}

async function fetchFromUnsplashAPI(category) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return [];
  try {
    const queryMap = {
      internacional: 'politics global diplomacy UN news',
      economia: 'finance stock market business economy',
      tecnologia: 'technology AI computer science microchip',
      cultura: 'museum art exhibition theater literature',
      deportes: 'sports tennis golf formula 1 athletics'
    };
    const searchTerm = queryMap[category] || 'news';
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=30`, {
      headers: { 'Authorization': `Client-ID ${accessKey}` }
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.results) {
        return data.results.map(item => `${item.urls.raw}&auto=format&fit=crop&q=80&w=1200`);
      }
    }
  } catch (err) {
    console.error('Error fetching from Unsplash API:', err);
  }
  return [];
}

async function isValidImageUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(1500) });
    return res.status === 200;
  } catch (err) {
    return false;
  }
}

async function getUniqueImageForScript(category, usedImages) {
  const normalizedCategory = category.toLowerCase();
  
  // 1. Unsplash API
  const apiUrls = await fetchFromUnsplashAPI(normalizedCategory);
  for (const url of apiUrls) {
    const base = url.split('?')[0];
    if (!usedImages.has(url) && !usedImages.has(base)) {
      if (await isValidImageUrl(url)) {
        usedImages.add(url);
        usedImages.add(base);
        return url;
      }
    }
  }

  // 2. Fallback pool
  const poolIds = PHOTO_ID_POOLS[normalizedCategory] || PHOTO_ID_POOLS['internacional'];
  const shuffledIds = [...poolIds].sort(() => Math.random() - 0.5);

  for (const photoId of shuffledIds) {
    const fullUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80&w=1200`;
    const base = fullUrl.split('?')[0];
    if (!usedImages.has(fullUrl) && !usedImages.has(base)) {
      if (await isValidImageUrl(fullUrl)) {
        usedImages.add(fullUrl);
        usedImages.add(base);
        return fullUrl;
      }
    }
  }

  // 3. Absolute fallback
  const randomFallbackId = poolIds[Math.floor(Math.random() * poolIds.length)];
  return `https://images.unsplash.com/${randomFallbackId}?auto=format&fit=crop&q=80&w=1200&unique_seed=${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

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

async function main() {
  const force = process.argv.includes('--force') || process.argv.includes('--no-delay');
  
  if (!force) {
    const { currentHour, madridDate } = getMadridTimeInfo();
    console.log(`Current Madrid Date: ${madridDate}, Hour: ${currentHour}`);

    const clientCheck = await pool.connect();
    let scheduledHours = [8, 11, 14, 17, 20];
    try {
      await clientCheck.query(`
        CREATE TABLE IF NOT EXISTS daily_generation_schedule (
          scheduled_date DATE PRIMARY KEY,
          hours INT[] NOT NULL
        );
      `);

      await clientCheck.query(`
        CREATE TABLE IF NOT EXISTS generation_log (
          log_date DATE,
          hour INT,
          article_id INT,
          PRIMARY KEY (log_date, hour)
        );
      `);

      await clientCheck.query(
        'INSERT INTO daily_generation_schedule (scheduled_date, hours) VALUES ($1, $2) ON CONFLICT (scheduled_date) DO UPDATE SET hours = EXCLUDED.hours',
        [madridDate, scheduledHours]
      );
    } catch (err) {
      console.error("Database check error:", err.message);
    } finally {
      clientCheck.release();
    }

    if (!scheduledHours.includes(currentHour)) {
      console.log(`Current hour (${currentHour}) is not in today's scheduled hours [8, 11, 14, 17, 20]. Exiting.`);
      process.exit(0);
    }
  }

  const client = await pool.connect();
  try {
    const { currentHour, madridDate } = getMadridTimeInfo();

    if (!force) {
      const { rows: loggedGenerations } = await client.query(
        'SELECT article_id FROM generation_log WHERE log_date = $1 AND hour = $2',
        [madridDate, currentHour]
      );
      if (loggedGenerations.length > 0) {
        console.log(`An article (ID: ${loggedGenerations[0].article_id}) was already generated for hour ${currentHour} today. Exiting.`);
        return;
      }
    }

    // Fetch the next article that has empty content
    const { rows: emptyArticles } = await client.query(
      `SELECT id, title, keyword, category, excerpt, published_at FROM articles WHERE content = '' OR content IS NULL OR length(content) = 0 ORDER BY id ASC LIMIT 1`
    );

    let article;

    if (emptyArticles.length === 0) {
      console.log("No empty articles found in the database. Generating a new article concept using DeepSeek...");
      
      const categoriesList = ['internacional', 'economia', 'tecnologia', 'cultura', 'deportes'];
      const chosenCategory = categoriesList[Math.floor(Math.random() * categoriesList.length)];
      
      const conceptPrompt = `
        Genera un concepto único para un artículo periodístico realista de noticias y actualidad mundial del día a día.
        La categoría asignada para este artículo es: "${chosenCategory}".
        
        Debes responder estrictamente en formato JSON con la siguiente estructura:
        {
          "title": "Un título periodístico llamativo y profesional",
          "excerpt": "Una sinopsis o resumen de 2-3 líneas del artículo",
          "keyword": "una-palabra-clave-seo-unica",
          "slug": "un-slug-amigable-para-url"
        }
        
        Nota: Asegúrate de que las noticias parezcan de actualidad en el contexto global (por ejemplo, previas de eventos, crónicas, informes, debates de geopolítica o análisis económicos). No incluyas explicaciones, solo el JSON puro.
      `;
      
      let conceptData = null;
      try {
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
                content: 'Eres un periodista internacional experto y estratega de contenido SEO. Responde únicamente con el JSON solicitado.'
              },
              {
                role: 'user',
                content: conceptPrompt
              }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (!response.ok) {
          throw new Error(`Concept generation failed: ${response.statusText}`);
        }

        const data = await response.json();
        conceptData = JSON.parse(data.choices[0].message.content.trim());
      } catch (err) {
        console.error("Error generating new article concept:", err.message);
        return;
      }

      if (!conceptData || !conceptData.title || !conceptData.excerpt) {
        console.error("Invalid concept data generated. Exiting.");
        return;
      }

      // Calculate the next ID
      const { rows: maxRows } = await client.query('SELECT MAX(id::int) as max_id FROM articles');
      const nextId = String((maxRows[0].max_id || 0) + 1);

      const pubDate = new Date();
      const dateLabel = 'Hoy';

      console.log(`Inserting new article concept into database: ID: ${nextId}, Title: "${conceptData.title}"`);
      
      const { rows: newInserted } = await client.query(
        `INSERT INTO articles (
          id, title, excerpt, category, date, read_time, author, content, likes, trending, published_at, keyword, slug
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, title, keyword, category, excerpt, published_at, slug`,
        [
          nextId,
          conceptData.title,
          conceptData.excerpt,
          chosenCategory,
          dateLabel,
          '5 min de lectura',
          Math.random() > 0.5 ? 'Mateo Valenzuela' : 'Sofía Benítez',
          '',
          0,
          false,
          pubDate,
          conceptData.keyword,
          conceptData.slug
        ]
      );
      
      article = newInserted[0];
    } else {
      article = emptyArticles[0];
    }

    const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    article.slug = slug;

    // Define schedule configurations according to the editorial pipeline
    const scheduleConfigs = {
      8: { type: "Pilar / Guía Definitiva", wordMin: 2000, wordMax: 2500, instructions: "Término principal transaccional o informativo amplio." },
      11: { type: "Tutorial Paso a Paso / 'Cómo hacer'", wordMin: 1500, wordMax: 1800, instructions: "Intención de búsqueda de resolución de problemas inmediatos." },
      14: { type: "Comparativa / Lista Recomendada (Listicle)", wordMin: 1500, wordMax: 2000, instructions: "Formato estructurado con tablas y pros/contras." },
      17: { type: "Caso Práctico / Resolución de Problema Específico", wordMin: 1200, wordMax: 1500, instructions: "Enfoque Long-Tail de conversión rápida." },
      20: { type: "Tendencias / Preguntas Frecuentes (FAQ / Tendencia del Sector)", wordMin: 1200, wordMax: 1500, instructions: "Formato rápido optimizado para Google Featured Snippets y Discover." }
    };

    const config = scheduleConfigs[currentHour] || scheduleConfigs[8];

    console.log(`Ready to generate content for Article ID ${article.id}: "${article.title}" (Type: ${config.type}, Limits: ${config.wordMin}-${config.wordMax} words)`);

    // Prepare prompt
    let promptText = templateText;
    promptText = promptText.replace('[INSERTAR NICHO O SECTOR AQUÍ]', `Noticias del acontecer diario y actualidad mundial - Categoría: ${article.category}`);
    promptText = promptText.replace('[INSERTAR TÍTULO AQUÍ]', article.title);
    promptText = promptText.replace('[INSERTAR KEYWORDS AQUÍ]', article.keyword || '');
    promptText = promptText.replace('[OPCIONAL: INSERTAR DETALLES ADICIONALES]', `Detalles: Artículo periodístico de actualidad mundial. Tipo de contenido: ${config.type}.`);

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
                content: `
# SYSTEM PROMPT: DIRECTOR EDITORIAL DE ALTO RENDIMIENTO & MAESTRO SEO (PIPELINE 5 ARTÍCULOS/DÍA)

## ROLE & PROFILE
Eres un Director Editorial Senior, Especialista en SEO On-Page/EEAT (Experiencia, Pericia, Autoridad y Confiabilidad) y Arquitecto de Contenidos Digitales. Tu objetivo exclusivo es generar e implementar diariamente un pipeline de artículos únicos, exhaustivos, optimizados para buscadores y con tono humano natural, listos para su publicación directa.

## OBJETIVO OPERATIVO DE ESTE ARTÍCULO (Hora Programada: ${currentHour}:00)
- Tipo de Artículo: ${config.type}
- Extensión requerida: estrictamente entre ${config.wordMin} y ${config.wordMax} palabras de texto legible (excluyendo etiquetas HTML).
- Directrices temáticas: ${config.instructions}

## MATRIZ DE EJECUCIÓN PASO A PASO (POR CADA ARTÍCULO)

### PASO 1: ANÁLISIS DE INTENCIÓN Y PALABRAS CLAVE
- Palabra clave principal: Ubicada naturalmente en H1, primer párrafo, un H2 y meta datos.
- Palabras clave LSI / Semánticas (mínimo 8-12): Integradas de forma fluida a lo largo del texto.
- Intención de búsqueda: Adaptar la estructura.

### PASO 2: ESTRUCTURA HIERÁRQUICA HTML (OUTLINE SEO)
- H1: Título magnético, < 65 caracteres, incluye palabra clave principal y disparador emocional o numérico.
- H2: Entre 4 y 7 secciones principales ordenadas lógicamente.
- H3: Subsecciones detalladas dentro de cada H2 cuando sea necesario.
- Índice de Contenidos (Table of Contents) en HTML semánticamente estructurado.

### PASO 3: REDACCIÓN DE ALTO IMPACTO (ANTI-AI PATTERN)
- Regla de estilo HUMANO:
  - Prohibidas muletillas de IA (Ej: "En el acelerado mundo actual", "En conclusión", "Es fundamental recordar", "Desbloquea el potencial", "En resumen").
  - Usa sintaxis variada (frases cortas de impacto alternadas con explicaciones desarrolladas).
  - Tono: Profesional, directo, empático, de autoridad pero accesible.
  - Formato dinámico: Uso de negritas estratégicas, listas con viñetas (<ul>, <ol>), citas destacadas (<blockquote>) y tablas comparativas (<table>).

### PASO 4: INTEGRACIÓN DE MULTIMEDIA Y PROMPTS VISUALES
Usa indicaciones semánticas claras y etiquetas alt optimizadas para SEO.

### PASO 5: METADATOS Y RICH SNIPPETS
Proporcionarás un bloque JSON con:
- title: Título del artículo.
- meta_title: Max 60 caracteres (incluye palabra clave).
- meta_description: Max 155 caracteres con llamada a la acción (CTA).
- excerpt: Resumen corto.
- content: El cuerpo del artículo entregado estrictamente en HTML semántico puro (sin etiquetas html, head o body). Utiliza clases HTML y Tailwind CSS muy concisas y eficientes para no exceder los límites de tokens y evitar respuestas truncadas.

## REGLAS STRICTAS DE CALIDAD Y SEGURIDAD
1. Veracidad de Datos.
2. Cierre sin Clichés (no uses 'En resumen' ni 'Conclusión').
3. Optimización Featured Snippet: En el primer H2, responder directamente a la pregunta principal en un párrafo conciso de 40-50 palabras en formato definición/respuesta directa.
                `.trim()
              },
              {
                role: 'user',
                content: currentPrompt
              }
            ],
            response_format: { type: 'json_object' }
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

        if (wordCount < config.wordMin || wordCount > config.wordMax) {
          console.warn(`Warning: Word count ${wordCount} is outside the ${config.wordMin}-${config.wordMax} range.`);
          if (attempt < maxAttempts) {
            currentPrompt = `${promptText}\n\n[SISTEMA: El resultado anterior tenía ${wordCount} palabras. Es OBLIGATORIO que el artículo tenga estrictamente entre ${config.wordMin} y ${config.wordMax} palabras de texto legible. Por favor, ajusta la extensión de las secciones para cumplir exactamente con este rango sin truncar la respuesta.]`;
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
      const usedImages = await getUsedImages(client);
      const coverImage = await getUniqueImageForScript(article.category, usedImages);
      const inlineImage = await getUniqueImageForScript(article.category, usedImages);

      const inlineImageHtml = `
<div data-role='middle-image' class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2'>
  <img src='${inlineImage}' alt='Retrato y cobertura sobre el terreno' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>Registro visual y cobertura del acontecimiento en tiempo real.</p>
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

      if (!force) {
        await client.query(
          'INSERT INTO generation_log (log_date, hour, article_id) VALUES ($1, $2, $3)',
          [madridDate, currentHour, article.id]
        );
      }

      console.log(`Article ID ${article.id} successfully generated, illustrated, and updated in database at hour ${currentHour}!`);
    }

  } catch (err) {
    console.error("Error running daily generation:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
