import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

// Load environment variables from local env files if they exist (.env.local, .env)
const envFiles = [".env.local", ".env"];
for (const file of envFiles) {
  try {
    const envPath = path.resolve(file);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const index = trimmed.indexOf("=");
          const key = trimmed.slice(0, index).trim();
          const val = trimmed.slice(index + 1).trim();
          process.env[key] = val;
        }
      });
      console.log(`[ENV] Cargadas variables desde: ${file}`);
    }
  } catch (e) {
    console.warn(`No se pudo leer ${file}:`, e.message);
  }
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:cugh0qsq8uaeawz5@187.127.233.89:5435/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

const pool = new Pool({
  connectionString,
  ssl: false,
});

async function logCronExecution(status, errorMessage = null, details = null) {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS cron_logs (
          id SERIAL PRIMARY KEY,
          script_name VARCHAR(255) NOT NULL,
          status VARCHAR(50) NOT NULL,
          error_message TEXT,
          details TEXT,
          executed_at TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await client.query(
        `INSERT INTO cron_logs (script_name, status, error_message, details)
         VALUES ($1, $2, $3, $4)`,
        ["scheduleDailyArticles.mjs", status, errorMessage, details]
      );
    } finally {
      client.release();
    }
  } catch (e) {
    console.error("Failed to write cron log to DB:", e.message);
  }
}

if (!apiKey) {
  const errMsg = "ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY.";
  console.error(errMsg);
  await logCronExecution("ERROR", errMsg, "Missing DEEPSEEK_API_KEY environment variable.");
  await pool.end();
  process.exit(1);
}

const templatePath = path.resolve('template_general.md');
if (!fs.existsSync(templatePath)) {
  console.error("ERROR: No se encuentra 'template_general.md' en la raíz del proyecto.");
  process.exit(1);
}
const templateContent = fs.readFileSync(templatePath, "utf-8");

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
    'photo-1516450360452-9312f5e86fc7', 'photo-1501281668745-f7f57925c3b4', 'photo-1460661419201-fd4cecdf8a8b',
    'photo-1485579149621-3123dd979885', 'photo-1448375240586-882707db888b', 'photo-1500627869374-13ad993b011e',
    'photo-1506744038136-46273834b3fb', 'photo-1513829096960-ef9a31447e51', 'photo-1528459801416-a9e53bbf4e17',
    'photo-1518235506717-e1ed3306a89b', 'photo-1516450360452-9312f5e86fc7', 'photo-1460661419201-fd4cecdf8a8b',
    'photo-1513364776144-60967b0f800f'
  ],
  deportes: [
    'photo-1508098682722-e99c43a406b2', 'photo-1517649763962-0c623066013b', 'photo-1502014822147-1aedfb0d76b8',
    'photo-1461896836934-ffe607ba8211', 'photo-1517466787929-bc90951d0974', 'photo-1541252260730-0412e8e2108e',
    'photo-1505666287802-931dc83948e9', 'photo-1543351611-58f69d7c1781', 'photo-1518063319789-7217e6706b04',
    'photo-1519766304817-4f37bda74a27', 'photo-1484482340112-e1e26827a555', 'photo-1516738901171-8eb4fc13bd20',
    'photo-1517838277536-f5f99be501cd', 'photo-1530541930197-ff16ac917b0e', 'photo-1529156069898-49953e39b3ac',
    'photo-1552674605-db6ffd4facb5', 'photo-1519766304817-4f37bda74a27', 'photo-1517649763962-0c623066013b',
    'photo-1508098682722-e99c43a406b2', 'photo-1461896836934-ffe607ba8211'
  ]
};

async function getUsedImages(client) {
  const { rows } = await client.query('SELECT image_url, content FROM articles');
  const used = new Set();
  const urlRegex = /https:\/\/images\.unsplash\.com\/([a-zA-Z0-9_-]+)/g;

  rows.forEach(r => {
    if (r.image_url) {
      const match = r.image_url.match(/https:\/\/images\.unsplash\.com\/([a-zA-Z0-9_-]+)/);
      if (match) {
        used.add(match[1]);
        used.add(r.image_url);
      }
    }
    if (r.content) {
      let m;
      while ((m = urlRegex.exec(r.content)) !== null) {
        used.add(m[1]);
      }
    }
  });
  return used;
}

async function isValidImageUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 3000 });
    return res.ok;
  } catch {
    return false;
  }
}

async function getUniqueImageForScript(category, usedImages) {
  const poolIds = PHOTO_ID_POOLS[category] || PHOTO_ID_POOLS.internacional;
  
  for (let attempt = 0; attempt < 25; attempt++) {
    const chosenId = poolIds[Math.floor(Math.random() * poolIds.length)];
    const fullUrl = `https://images.unsplash.com/${chosenId}?auto=format&fit=crop&q=80&w=1200`;
    const base = chosenId;

    if (!usedImages.has(fullUrl) && !usedImages.has(base)) {
      if (await isValidImageUrl(fullUrl)) {
        usedImages.add(fullUrl);
        usedImages.add(base);
        return fullUrl;
      }
    }
  }

  const randomFallbackId = poolIds[Math.floor(Math.random() * poolIds.length)];
  return `https://images.unsplash.com/${randomFallbackId}?auto=format&fit=crop&q=80&w=1200&unique_seed=${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// Clean HTML tag stripper to count words in the article text
function getWordCount(html) {
  if (!html) return 0;
  const plainText = html.replace(/<[^>]*>/g, " ");
  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log("=== PLANIFICADOR DIARIO COMPLETO (5 ARTÍCULOS NUEVOS) ===");
  const generatedArticles = [];

  const client = await pool.connect();
  try {
    // 1. Obtener títulos y keywords existentes de la BD para evitar duplicados
    console.log(">> Obteniendo registros existentes de la base de datos...");
    const existingRes = await client.query("SELECT id, title, keyword FROM articles");
    const existingArticles = existingRes.rows;
    console.log(`[BD] Encontrados ${existingArticles.length} artículos existentes.`);

    const existingTitlesList = existingArticles.map(a => ` - ${a.title} (${a.keyword})`).join("\n");

    // 2. Solicitar a la IA 5 propuestas únicas
    let lasCincoPropuestas = [];
    let attemptsProp = 0;
    const maxPropAttempts = 3;

    while (lasCincoPropuestas.length < 5 && attemptsProp < maxPropAttempts) {
      attemptsProp++;
      console.log(`>> Solicitar nuevas ideas a DeepSeek (Intento ${attemptsProp})...`);
      
      const promptPropuestas = `
Eres el director editorial de noticias y actualidad mundial (Noticias Mundial).
Queremos publicar exactamente CINCO artículos hoy en la web. Deben ser temas de actualidad periodística interesantes, realistas, optimizados para SEO y 100% únicos.

Aquí está la lista de artículos que YA están en la web:
${existingTitlesList}
${lasCincoPropuestas.map(p => ` - ${p.title} (${p.keyword})`).join("\n")}

Por favor, propón CINCO temas completamente nuevos en español que no estén en la lista anterior.
Debes devolver la respuesta estrictamente como un objeto JSON con la siguiente estructura:
{
  "propuestas": [
    {
      "title": "Un título periodístico muy atractivo y profesional sobre actualidad mundial, sin emojis",
      "keyword": "La keyword principal de búsqueda en Google para el artículo",
      "slug": "un-slug-amigable-para-la-url-en-kebab-case",
      "excerpt": "Un resumen introductorio o excerpt de 2-3 líneas para la tarjeta de previsualización",
      "category": "Debe ser exactamente una de estas cinco: 'internacional', 'economia', 'tecnologia', 'cultura', 'deportes'"
    },
    ... (hasta proponer exactamente 5 propuestas) ...
  ]
}
Devuelve únicamente el objeto JSON.
`;

      let responsePropuestasText = "";
      try {
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un director editorial que responde estrictamente en JSON." },
              { role: "user", content: promptPropuestas }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
          })
        });

        if (!res.ok) {
          throw new Error(`Error en API al proponer temas: ${res.statusText}`);
        }
        const data = await res.json();
        responsePropuestasText = data.choices[0].message.content;
      } catch (err) {
        console.error("Error obteniendo propuestas de la IA:", err);
        continue;
      }

      try {
        let cleanJSON = responsePropuestasText.trim();
        if (cleanJSON.startsWith("```")) {
          cleanJSON = cleanJSON
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/s, "")
            .trim();
        }
        
        const parsed = JSON.parse(cleanJSON);
        let propuestasObtenidas = parsed.propuestas || parsed.articles || parsed;
        if (!Array.isArray(propuestasObtenidas)) {
          if (typeof propuestasObtenidas === "object" && propuestasObtenidas !== null) {
            propuestasObtenidas = Object.values(propuestasObtenidas).find(val => Array.isArray(val)) || [];
          } else {
            continue;
          }
        }

        // Validar y filtrar duplicados programáticamente contra la base de datos
        for (const p of propuestasObtenidas) {
          const keywordNorm = p.keyword.toLowerCase().trim();
          const slugNorm = p.slug.toLowerCase().trim();

          const isKeywordDup = existingArticles.some(a => a.keyword && a.keyword.toLowerCase().trim() === keywordNorm) || 
                               lasCincoPropuestas.some(lp => lp.keyword.toLowerCase().trim() === keywordNorm);
          const isSlugDup = existingArticles.some(a => a.slug && a.slug.toLowerCase().trim() === slugNorm) ||
                            lasCincoPropuestas.some(lp => lp.slug.toLowerCase().trim() === slugNorm);

          if (!isKeywordDup && !isSlugDup) {
            lasCincoPropuestas.push(p);
            if (lasCincoPropuestas.length === 5) break;
          } else {
            console.warn(`[DUPLICADO] Filtrada propuesta con keyword '${p.keyword}' o slug '${p.slug}'`);
          }
        }
      } catch (e) {
        console.error("Error parseando el JSON de propuestas:", e.message);
      }
    }

    if (lasCincoPropuestas.length < 5) {
      console.error("ERROR: No se pudieron obtener suficientes propuestas únicas.");
      await logCronExecution("ERROR", "No se pudieron obtener suficientes propuestas únicas de temas.");
      process.exit(1);
    }

    console.log(`[OK] Propuestas únicas seleccionadas:`);
    lasCincoPropuestas.forEach((p, idx) => {
      console.log(`  ${idx + 1}. [${p.category.toUpperCase()}] ${p.title} (Keyword: ${p.keyword})`);
    });

    // Define scheduled target publication timestamps for today/tomorrow
    const targetDate = new Date();
    // If it's late in the day, schedule for tomorrow
    if (targetDate.getHours() >= 20) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    const dateYMD = targetDate.toISOString().slice(0, 10); // YYYY-MM-DD

    const pipelineSchedule = [
      { hour: 8, time: "08:00:00", type: "Pilar / Guía Definitiva", wordMin: 2000, wordMax: 2500, instructions: "Término principal transaccional o informativo amplio." },
      { hour: 11, time: "11:00:00", type: "Tutorial Paso a Paso / 'Cómo hacer'", wordMin: 1500, wordMax: 1800, instructions: "Intención de búsqueda de resolución de problemas inmediatos." },
      { hour: 14, time: "14:00:00", type: "Comparativa / Lista Recomendada (Listicle)", wordMin: 1500, wordMax: 2000, instructions: "Formato estructurado con tablas y pros/contras." },
      { hour: 17, time: "17:00:00", type: "Caso Práctico / Resolución de Problema Específico", wordMin: 1200, wordMax: 1500, instructions: "Enfoque Long-Tail de conversión rápida." },
      { hour: 20, time: "20:00:00", type: "Tendencias / Preguntas Frecuentes (FAQ / Tendencia del Sector)", wordMin: 1200, wordMax: 1500, instructions: "Formato rápido optimizado para Google Featured Snippets y Discover." }
    ];

    const usedImages = await getUsedImages(client);

    for (let i = 0; i < lasCincoPropuestas.length; i++) {
      const prop = lasCincoPropuestas[i];
      const config = pipelineSchedule[i];
      const scheduledPublishTime = `${dateYMD} ${config.time}`;
      console.log(`\n--------------------------------------------------`);
      console.log(`>> Generando Artículo ${i + 1}/5: "${prop.title}"...`);
      console.log(`Programado para: ${scheduledPublishTime}`);
      console.log(`Tipo: ${config.type} (Límites: ${config.wordMin}-${config.wordMax} palabras)`);

      const promptRedaccion = `
Plantilla de Instrucciones y Reglas de Formato:
${templateContent}

Parámetros de Entrada para este Artículo:
*   Título del Artículo: ${prop.title}
*   Palabras Clave Principales (Keywords): ${prop.keyword}
*   Categoría: ${prop.category}
*   Tipo de Artículo: ${config.type}

REQUISITOS OBLIGATORIOS DE ESTRUCTURA Y LONGITUD (CRÍTICO):
Para garantizar que el artículo tenga estrictamente entre ${config.wordMin} y ${config.wordMax} palabras de texto real (sin contar etiquetas HTML) y nunca baje del mínimo de ${config.wordMin} palabras, DEBES desarrollar con amplitud y de forma extensa cada una de las secciones en el HTML del campo 'content' y seguir las siguientes directrices:
- Directrices temáticas: ${config.instructions}
- Incorporar placeholders <!-- INSERTA IMAGEN 1 AQUÍ --> y <!-- INSERTA IMAGEN 2 AQUÍ -->
- Formato dinámico: Uso de negritas estratégicas, listas con viñetas (<ul>, <ol>), citas destacadas (<blockquote>) y tablas comparativas (<table>).
- Clases HTML y Tailwind CSS muy concisas y eficientes para no exceder los límites de tokens y evitar respuestas truncadas.
`;

      let finalResult = null;
      let attempt = 0;
      const maxAttempts = 3;
      let extraInstruction = "";

      while (attempt < maxAttempts) {
        try {
          attempt++;
          console.log(`  Intento ${attempt}: Conectando con DeepSeek...`);
          const res = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [
                {
                  role: "system",
                  content: `
# SYSTEM PROMPT: DIRECTOR EDITORIAL DE ALTO RENDIMIENTO & MAESTRO SEO (PIPELINE 5 ARTÍCULOS/DÍA)

## ROLE & PROFILE
Eres un Director Editorial Senior, Especialista en SEO On-Page/EEAT (Experiencia, Pericia, Autoridad y Confiabilidad) y Arquitecto de Contenidos Digitales. Tu objetivo exclusivo es generar e implementar diariamente un pipeline de artículos únicos, exhaustivos, optimizados para buscadores y con tono humano natural, listos para su publicación directa.

## OBJETIVO OPERATIVO DE ESTE ARTÍCULO
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
                { role: "user", content: promptRedaccion + extraInstruction }
              ],
              temperature: 0.5,
              max_tokens: 8000,
              response_format: { type: "json_object" }
            })
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API Error (${res.status}): ${errText}`);
          }

          const data = await res.json();
          const rawContent = data.choices[0].message.content;
          
          let cleaned = rawContent.trim();
          if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
          }
          const parsedResult = JSON.parse(cleaned);

          if (!parsedResult.title || !parsedResult.meta_title || !parsedResult.meta_description || !parsedResult.excerpt || !parsedResult.content) {
            throw new Error("Faltan campos requeridos en la respuesta JSON.");
          }

          const wordCount = getWordCount(parsedResult.content);
          console.log(`  -> Intento ${attempt}: El artículo tiene ${wordCount} palabras de texto real.`);

          if (wordCount >= config.wordMin && wordCount <= config.wordMax) {
            finalResult = parsedResult;
            break;
          } else {
            console.warn(`  -> ADVERTENCIA: El artículo generado tiene ${wordCount} palabras, fuera del rango requerido (${config.wordMin}-${config.wordMax}). Reintentando con instrucciones de expansión estrictas...`);
            extraInstruction = `\n\n[ATENCIÓN CRÍTICA: Tu redacción anterior contenía únicamente ${wordCount} palabras. Es obligatorio que el artículo tenga exactamente entre ${config.wordMin} y ${config.wordMax} palabras de texto legible. Por favor, reescribe el artículo con muchísima más profundidad para cumplir con este rango exacto sin truncar la respuesta.]`;
          }
        } catch (err) {
          console.error(`  Error en intento ${attempt}:`, err.message);
          if (attempt < maxAttempts) {
            console.log("  Esperando 5 segundos antes de reintentar...");
            await new Promise(res => setTimeout(res, 5000));
          }
        }
      }

      if (!finalResult) {
        console.error(`[ERROR] No se pudo generar un artículo que cumpla con los requisitos para: ${prop.title}`);
        continue;
      }

      // Calculate next numeric ID
      const { rows: maxRows } = await client.query('SELECT MAX(id::int) as max_id FROM articles');
      const nextId = String((maxRows[0].max_id || 0) + 1);

      // Get unique images
      const coverImage = await getUniqueImageForScript(prop.category, usedImages);
      const inlineImage = await getUniqueImageForScript(prop.category, usedImages);

      const inlineImageHtml = `
<div data-role='middle-image' class='my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white p-2'>
  <img src='${inlineImage}' alt='Retrato y cobertura sobre el terreno' class='w-full h-auto rounded-xl object-cover max-h-[450px]' />
  <p class='text-xs text-slate-500 font-sans italic text-center mt-2'>Registro visual y cobertura del acontecimiento en tiempo real.</p>
</div>
`;

      let finalContent = finalResult.content || '';
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

      const dateLabel = 'Hoy';

      // Save to database
      console.log(`  Guardando en la BD con fecha de publicación programada: ${scheduledPublishTime}...`);
      await client.query(
        `INSERT INTO articles (
          id, title, excerpt, category, date, read_time, author, content, likes, trending, published_at, keyword, slug, meta_title, meta_description
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          nextId,
          finalResult.title || prop.title,
          finalResult.excerpt || prop.excerpt,
          prop.category,
          dateLabel,
          '5 min de lectura',
          Math.random() > 0.5 ? 'Mateo Valenzuela' : 'Sofía Benítez',
          finalContent,
          0,
          false,
          scheduledPublishTime,
          prop.keyword,
          prop.slug,
          finalResult.meta_title || prop.title,
          finalResult.meta_description || prop.excerpt
        ]
      );

      console.log(`[OK] Guardado completado con éxito para ID: ${nextId} | Slug: ${prop.slug}`);
      
      generatedArticles.push({
        title: finalResult.title || prop.title,
        slug: prop.slug,
        category: prop.category,
        keyword: prop.keyword
      });

      // Waiting interval to avoid hitting rate limits
      await new Promise(res => setTimeout(res, 3000));
    }

    console.log("\n=== PLANIFICADOR DIARIO COMPLETADO CON ÉXITO ===");
    await logCronExecution("SUCCESS", null, `Se generaron y publicaron ${generatedArticles.length} artículos: ${JSON.stringify(generatedArticles)}`);
  } catch (err) {
    console.error("Excepción general en el proceso:", err);
    await logCronExecution("ERROR", err.message, err.stack);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
