import { Pool } from 'pg';
import { mockArticles } from '@/data/mockData';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:cugh0qsq8uaeawz5@187.127.233.89:5435/postgres';

export const pool = new Pool({
  connectionString,
  ssl: false,
});

export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT '',
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        trending BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        meta_title VARCHAR(255),
        meta_description TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        keyword VARCHAR(255) UNIQUE
      );
    `);

    // Create cron_logs table if it doesn't exist (following previous project pattern)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cron_logs (
        id SERIAL PRIMARY KEY,
        script_name VARCHAR(255) NOT NULL,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) NOT NULL,
        error_message TEXT,
        details TEXT
      );
    `);

    // 2. Check if table is empty
    const { rows } = await client.query('SELECT COUNT(*) FROM articles');
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      console.log("Database table 'articles' is empty. Seeding initial World Cup articles...");

      for (const article of mockArticles) {
        // Mock semantic content details for the HTML body
        const htmlContent = `
          <p>El fútbol de selecciones nacionales entra en su etapa decisiva. Con el torneo mundial a la vuelta de la esquina, el equipo liderado por su cuerpo técnico ultima detalles para lo que promete ser un choque electrizante.</p>
          <div class="my-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-md relative aspect-[16/9] w-full max-w-2xl mx-auto group">
            <img src="${article.imageUrl}" alt="${article.title}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          </div>
          <p>Los analistas y expertos coinciden en que la preparación física, la solidez táctica del mediocampo y la velocidad de los extremos serán factores determinantes. Manténgase al tanto del portal para futuros reportes tácticos en vivo y del minuto a minuto del encuentro.</p>
        `;

        const metaTitle = `Noticias Mundial | ${article.title}`;
        const metaDescription = article.excerpt.substring(0, 160);
        const keyword = `key-${article.category}-${article.id}`;

        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category, date, read_time, image_url, author, content, likes, trending, meta_title, meta_description, keyword
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            category = EXCLUDED.category,
            date = EXCLUDED.date,
            read_time = EXCLUDED.read_time,
            image_url = EXCLUDED.image_url,
            author = EXCLUDED.author,
            content = EXCLUDED.content,
            likes = EXCLUDED.likes,
            trending = EXCLUDED.trending,
            meta_title = EXCLUDED.meta_title,
            meta_description = EXCLUDED.meta_description,
            keyword = EXCLUDED.keyword
          `,
          [
            article.id,
            article.title,
            article.excerpt,
            article.category,
            article.date,
            article.readTime,
            article.imageUrl,
            article.author,
            htmlContent,
            article.likes,
            article.trending || false,
            metaTitle,
            metaDescription,
            keyword,
          ]
        );
      }
      console.log('Database pre-populated with World Cup articles successfully!');
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding.`);
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}
