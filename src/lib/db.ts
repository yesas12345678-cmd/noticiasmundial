import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:cugh0qsq8uaeawz5@187.127.233.89:5435/postgres';

export const pool = new Pool({
  connectionString,
  ssl: false,
});

// Definition of 50 unique SEO-optimized articles
const SEED_ARTICLES_DATA = [
  // 1-10
  {
    title: 'Estrategia y pressing de España en el debut mundialista',
    excerpt: 'Detalles del bloque medio y transiciones veloces del combinado nacional para contrarrestar rivales replegados.',
    keyword: 'estrategia-espana-mundial',
    slug: 'estrategia-espana-debut-mundialista',
  },
  {
    title: 'Parte médico oficial de la lesión muscular del centrocampista alemán',
    excerpt: 'El informe revela una microrrotura fibrilar en el bíceps femoral. Se estiman dos semanas de inactividad.',
    keyword: 'lesion-muscular-alemania',
    slug: 'parte-medico-lesion-centrocampista-alemania',
  },
  {
    title: 'Previa táctica del choque decisivo entre Argentina y Francia',
    excerpt: 'Dos potencias frente a frente con esquemas de ataque vertical. Analizamos las claves del emparejamiento.',
    keyword: 'previa-argentina-francia',
    slug: 'previa-tactica-partido-argentina-francia',
  },
  {
    title: 'Métricas de velocidad y distancia recorrida de los laterales franceses',
    excerpt: 'Estudio de rendimiento físico que detalla la aceleración explosiva y el volumen de kilómetros en fase ofensiva.',
    keyword: 'metricas-laterales-francia',
    slug: 'metricas-velocidad-distancia-laterales-francia',
  },
  {
    title: 'Renovación generacional en el centro del campo de Brasil',
    excerpt: 'La incorporación de jóvenes talentos aporta dinamismo y recuperación rápida de balón en campo contrario.',
    keyword: 'renovacion-mediocampo-brasil',
    slug: 'renovacion-generacional-centro-campo-brasil',
  },
  {
    title: 'Evolución del esguince de tobillo del delantero estrella belga',
    excerpt: 'El cuerpo médico intensifica trabajos de fisioterapia para recuperar al atacante antes de la fase de eliminación.',
    keyword: 'esguince-delantero-belgica',
    slug: 'evolucion-esguince-delantero-estrella-belgica',
  },
  {
    title: 'Análisis del rendimiento de Inglaterra tras la fase de grupos',
    excerpt: 'Evaluación del porcentaje de posesión, tiros a puerta y solidez defensiva del conjunto de los tres leones.',
    keyword: 'rendimiento-inglaterra-grupos',
    slug: 'analisis-rendimiento-inglaterra-fase-grupos',
  },
  {
    title: 'Estadísticas de efectividad en portería del guardameta argentino',
    excerpt: 'Datos detallados sobre disparos atajados, porcentaje de paradas y efectividad en el juego aéreo del portero.',
    keyword: 'portero-argentina-estadisticas',
    slug: 'estadisticas-efectividad-porteria-guardameta-argentino',
  },
  {
    title: 'Esquema de juego de la selección italiana para el partido inaugural',
    excerpt: 'El seleccionador planea un repliegue ordenado y contragolpes letales explotando la velocidad por las bandas.',
    keyword: 'esquema-italia-inaugural',
    slug: 'esquema-juego-seleccion-italiana-inaugural',
  },
  {
    title: 'Informe de fatiga física acumulada en el plantel de Uruguay',
    excerpt: 'Reporte interno del cuerpo de preparación física sobre la carga de minutos de los futbolistas clave.',
    keyword: 'fatiga-plantel-uruguay',
    slug: 'informe-fatiga-fisica-acumulada-plantel-uruguay',
  },
  // 11-20
  {
    title: 'Análisis de juego de Países Bajos y sus transiciones rápidas',
    excerpt: 'El sistema de carrileros profundos y su influencia en la creación de ocasiones de gol en ataque organizado.',
    keyword: 'transiciones-paises-bajos',
    slug: 'analisis-juego-paises-bajos-transiciones-rapidas',
  },
  {
    title: 'Recuperación médica del defensa central y capitán de Portugal',
    excerpt: 'Tras sufrir una contractura, los fisioterapeutas confían en que llegue a punto para la ronda eliminatoria.',
    keyword: 'defensa-central-portugal',
    slug: 'recuperacion-medica-defensa-central-capitan-portugal',
  },
  {
    title: 'Historial de enfrentamientos directos entre Brasil e Italia',
    excerpt: 'Un repaso de los duelos legendarios en campeonatos internacionales y las estadísticas históricas de ambos.',
    keyword: 'duelo-brasil-italia',
    slug: 'historial-enfrentamientos-directos-brasil-italia',
  },
  {
    title: 'Porcentaje de acierto en pases del centro del campo español',
    excerpt: 'El análisis numérico revela una precisión superior al noventa por ciento en campo rival durante el torneo.',
    keyword: 'acierto-pases-espana',
    slug: 'porcentaje-acierto-pases-centro-campo-espanol',
  },
  {
    title: 'Plan táctico de Croacia para anular la ofensiva del rival',
    excerpt: 'El mediocampo croata se perfila como la clave para controlar el ritmo de juego y cortar líneas de pase.',
    keyword: 'plan-tactico-croacia',
    slug: 'plan-tactico-croacia-anular-ofensiva-rival',
  },
  {
    title: 'Lista de bajas y dudas en la selección de México para el fin de semana',
    excerpt: 'Repaso detallado de los jugadores con molestias musculares y su probabilidad de participar en el encuentro.',
    keyword: 'bajas-mexico-semana',
    slug: 'lista-bajas-dudas-seleccion-mexico-fin-semana',
  },
  {
    title: 'Resultado de la simulación táctica del encuentro de octavos de final',
    excerpt: 'Modelos predictivos analizan las probabilidades de victoria según los esquemas y estados de forma actuales.',
    keyword: 'simulacion-octavos-final',
    slug: 'resultado-simulacion-tactica-encuentro-octavos-final',
  },
  {
    title: 'Rendimiento goleador y efectividad de remates del atacante uruguayo',
    excerpt: 'Análisis estadístico de la conversión de ocasiones y mapas de calor en el área de penalti del delantero.',
    keyword: 'goleador-uruguay-remates',
    slug: 'rendimiento-goleador-efectividad-remates-atacante-uruguayo',
  },
  {
    title: 'Estilo de posesión y presión alta de la selección de EE. UU.',
    excerpt: 'Cómo el dinamismo físico en las bandas permite ahogar la salida del balón de los rivales en su propio campo.',
    keyword: 'presion-eeuu-posesion',
    slug: 'estilo-posesion-presion-alta-seleccion-eeuu',
  },
  {
    title: 'Parte de enfermería de Colombia ante el próximo encuentro continental',
    excerpt: 'Actualización del estado físico de los jugadores convocados que arrastran sobrecargas del último partido.',
    keyword: 'enfermeria-colombia-encuentro',
    slug: 'parte-enfermeria-colombia-proximo-encuentro-continental',
  },
  // 21-30
  {
    title: 'Historial de penaltis atajados del portero titular de Bélgica',
    excerpt: 'El análisis de su rendimiento en tandas decisivas y su efectividad ante cobradores diestros y zurdos.',
    keyword: 'penaltis-portero-belgica',
    slug: 'historial-penaltis-atajados-portero-titular-belgica',
  },
  {
    title: 'Estadísticas de recuperaciones del mediocentro defensivo de Senegal',
    excerpt: 'El pivote defensivo destaca como el jugador con más intercepciones y duelos individuales ganados en el torneo.',
    keyword: 'recuperaciones-senegal-pivote',
    slug: 'estadisticas-recuperaciones-mediocentro-defensivo-senegal',
  },
  {
    title: 'Planteamiento táctico de Japón para sorprender en velocidad',
    excerpt: 'El uso de extremos rápidos y repliegues cortos en transiciones ofensivas veloces para dañar defensas adelantadas.',
    keyword: 'tactica-japon-velocidad',
    slug: 'planteamiento-tactico-japon-sorprender-velocidad',
  },
  {
    title: 'Bajas confirmadas en el plantel de la selección chilena',
    excerpt: 'Dos jugadores clave quedan descartados para los compromisos internacionales debido a desgarros musculares.',
    keyword: 'bajas-chile-confirmadas',
    slug: 'bajas-confirmadas-plantel-seleccion-chilena',
  },
  {
    title: 'Resultado del último partido amistoso de la selección de Marruecos',
    excerpt: 'Crónica del encuentro preparatorio con énfasis en los ajustes tácticos de la línea defensiva del equipo.',
    keyword: 'amistoso-marruecos-defensa',
    slug: 'resultado-ultimo-partido-amistoso-seleccion-marruecos',
  },
  {
    title: 'Distancia recorrida e intensidad física del delantero de Alemania',
    excerpt: 'Datos del GPS que revelan el volumen de carreras de alta intensidad y desmarques al espacio del atacante.',
    keyword: 'intensidad-delantero-alemania',
    slug: 'distancia-recorrida-intensidad-fisica-delantero-alemania',
  },
  {
    title: 'Puntos fuertes del ataque posicional de la selección de Canadá',
    excerpt: 'El aprovechamiento de la amplitud del campo y superioridades numéricas en banda para centrar al área rival.',
    keyword: 'ataque-posicional-canada',
    slug: 'puntos-fuertes-ataque-posicional-seleccion-canada',
  },
  {
    title: 'Proceso de puesta a punto de la rodilla del carrilero de Brasil',
    excerpt: 'El lateral derecho entrena de forma diferenciada con miras a incorporarse al grupo para los octavos de final.',
    keyword: 'rodilla-lateral-brasil',
    slug: 'proceso-puesta-punto-rodilla-carrilero-brasil',
  },
  {
    title: 'Estadísticas de duelos aéreos ganados por la defensa de Suiza',
    excerpt: 'El gran porcentaje de acierto de los centrales helvéticos defendiendo saques de esquina y centros laterales.',
    keyword: 'duelos-aereos-suiza',
    slug: 'estadisticas-duelos-aereos-ganados-defensa-suiza',
  },
  {
    title: 'Asistencias y pases clave del enganche creativo de Países Bajos',
    excerpt: 'Mapa de asistencias y efectividad en la zona de tres cuartos para habilitar a los extremos del equipo.',
    keyword: 'asistencias-enganche-holanda',
    slug: 'asistencias-pases-clave-enganche-creativo-paises-bajos',
  },
  // 31-40
  {
    title: 'Esquema de contención y marcas personales de Ecuador',
    excerpt: 'Cómo la selección ecuatoriana asfixia al creador de juego rival mediante marcas zonales muy ordenadas.',
    keyword: 'contencion-ecuador-juego',
    slug: 'esquema-contencion-marcas-personales-ecuador',
  },
  {
    title: 'Molestias musculares del extremo izquierdo de la selección española',
    excerpt: 'Tras finalizar con dolor en los aductores, se le realizarán pruebas ecográficas preventivas en la concentración.',
    keyword: 'extremo-espana-molestias',
    slug: 'molestias-musculares-extremo-izquierdo-seleccion-espanola',
  },
  {
    title: 'Previa del clásico sudamericano entre Brasil y Argentina',
    excerpt: 'Analizamos las variantes del partido más esperado de las rondas clasificatorias con estadísticas recientes.',
    keyword: 'clasico-sudamericano-previa',
    slug: 'previa-clasico-sudamericano-brasil-argentina',
  },
  {
    title: 'Eficacia en robos de balón en campo propio de la selección de Dinamarca',
    excerpt: 'Análisis detallado de recuperaciones de posesión en zona de contención y su rapidez para iniciar contraataques.',
    keyword: 'robos-balon-dinamarca',
    slug: 'eficacia-robos-balon-campo-propio-seleccion-dinamarca',
  },
  {
    title: 'Sistema táctico de tres defensores centrales en Corea del Sur',
    excerpt: 'Ventajas del dibujo táctico para poblar el centro del campo y asegurar las coberturas ante extremos rápidos.',
    keyword: 'sistema-defensivo-corea',
    slug: 'sistema-tactico-tres-defensores-centrales-corea-sur',
  },
  {
    title: 'Parte médico por sobrecarga en el gemelo del defensa uruguayo',
    excerpt: 'El zaguero guardará reposo preventivo y se ejercitará en el gimnasio antes del partido decisivo del grupo.',
    keyword: 'sobrecarga-gemelo-uruguay',
    slug: 'parte-medico-sobrecarga-gemelo-defensa-uruguayo',
  },
  {
    title: 'Resultado de la jornada clasificatoria y tabla de posiciones de selecciones',
    excerpt: 'Actualización al instante de los marcadores en los distintos grupos de cara al campeonato internacional.',
    keyword: 'tabla-clasificatoria-posiciones',
    slug: 'resultado-jornada-clasificatoria-tabla-posiciones-selecciones',
  },
  {
    title: 'Pases completados bajo presión por el centro del campo de Croacia',
    excerpt: 'Cómo el temple y control técnico de los interiores croatas les permite eludir la presión en bloque alto.',
    keyword: 'pases-presion-croacia',
    slug: 'pases-completados-bajo-presion-centro-campo-croacia',
  },
  {
    title: 'Filosofía táctica de posesión defensiva del seleccionado de Portugal',
    excerpt: 'El control del balón como mecanismo de seguridad para desgastar físicamente al adversario y minimizar riesgos.',
    keyword: 'posesion-defensiva-portugal',
    slug: 'filosofia-tactica-posesion-defensiva-seleccionado-portugal',
  },
  {
    title: 'Recuperación física del centrocampista defensivo de Francia',
    excerpt: 'El pivote galo supera la fatiga del muslo y recibe el alta para integrarse a las sesiones de fútbol táctico.',
    keyword: 'recuperacion-pivote-francia',
    slug: 'recuperacion-fisica-centrocampista-defensivo-francia',
  },
  // 41-50
  {
    title: 'Resultado del enfrentamiento de cuartos entre Inglaterra y Alemania',
    excerpt: 'Análisis técnico de los goles y momentos clave que decidieron la llave clasificatoria para las semifinales.',
    keyword: 'cuartos-inglaterra-alemania',
    slug: 'resultado-enfrentamiento-cuartos-inglaterra-alemania',
  },
  {
    title: 'Estadísticas de efectividad de cara a gol de la selección de Marruecos',
    excerpt: 'Estudio de la tasa de acierto y disparos al arco en proporción a la posesión en el área rival.',
    keyword: 'goles-marruecos-efectividad',
    slug: 'estadisticas-efectividad-cara-gol-seleccion-marruecos',
  },
  {
    title: 'Esquema de contraataque directo de la selección de Japón',
    excerpt: 'Las transiciones ultra rápidas que conectan la zaga con los delanteros en menos de tres pases clave.',
    keyword: 'contraataque-directo-japon',
    slug: 'esquema-contraataque-directo-seleccion-japon',
  },
  {
    title: 'Lesión de ligamento colateral del lateral izquierdo de Senegal',
    excerpt: 'Confirmado el alcance del traumatismo de rodilla que le impedirá jugar lo que resta de la fase eliminatoria.',
    keyword: 'lesion-lateral-senegal',
    slug: 'lesion-ligamento-colateral-lateral-izquierdo-senegal',
  },
  {
    title: 'Previa de la gran final de la copa mundial de fútbol',
    excerpt: 'Analizamos las fortalezas de los dos finalistas y las posibles variantes tácticas que definirá el campeonato.',
    keyword: 'gran-final-previa',
    slug: 'previa-gran-final-copa-mundial-futbol',
  },
  {
    title: 'Estadísticas de atajadas del arquero titular de la selección de Suiza',
    excerpt: 'Porcentaje de efectividad en balones detenidos desde media distancia y disparos directos en el área chica.',
    keyword: 'arquero-suiza-atajadas',
    slug: 'estadisticas-atajadas-arquero-titular-seleccion-suiza',
  },
  {
    title: 'Análisis de la presión defensiva en tres cuartos de Ecuador',
    excerpt: 'Cómo la intensidad de su línea ofensiva fuerza pérdidas de balón en la salida de los defensores rivales.',
    keyword: 'presion-defensiva-ecuador',
    slug: 'analisis-presion-defensiva-tres-cuartos-ecuador',
  },
  {
    title: 'Parte médico por contusión ósea del pivote de la selección chilena',
    excerpt: 'El centrocampista defensivo evoluciona favorablemente de un golpe en la espinilla y entrena sin problemas.',
    keyword: 'contusion-pivote-chile',
    slug: 'parte-medico-contusion-osea-pivote-seleccion-chilena',
  },
  {
    title: 'Resultado de la final de consolación por el tercer puesto del mundial',
    excerpt: 'Crónica completa del choque por la medalla de bronce con un resumen de los goles y aspectos tácticos.',
    keyword: 'tercer-puesto-resultado',
    slug: 'resultado-final-consolacion-tercer-puesto-mundial',
  },
  {
    title: 'Goles y asistencias acumuladas de los centrocampistas creativos de España',
    excerpt: 'El volumen de producción ofensiva de la sala de máquinas del combinado español a lo largo del torneo.',
    keyword: 'produccion-mediocampistas-espana',
    slug: 'goles-asistencias-acumuladas-centrocampistas-creativos-espana',
  },
];

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

    // Create cron_logs table if it doesn't exist
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

    // 2. Check current article count
    const { rows } = await client.query('SELECT COUNT(*) FROM articles');
    const count = parseInt(rows[0].count, 10);

    // If the table doesn't have exactly 50 articles, recreate or seed to ensure exactly 50 articles
    if (count !== 50) {
      console.log(`Database contains ${count} articles. Seeding exactly 50 articles for editorial planning...`);

      // Clear any existing articles to ensure clean seed of 50
      await client.query('DELETE FROM articles');

      const categoriesList = ['selecciones', 'lesiones', 'resultados', 'estadisticas'];

      for (let i = 0; i < SEED_ARTICLES_DATA.length; i++) {
        const item = SEED_ARTICLES_DATA[i];
        
        // Alternating categories day-by-day to avoid consecutives
        const category = categoriesList[i % 4];

        // Format dates: Hoy, Ayer, Hace X días
        let dateLabel = '';
        if (i === 0) {
          dateLabel = 'Hoy';
        } else if (i === 1) {
          dateLabel = 'Ayer';
        } else {
          dateLabel = `Hace ${i} días`;
        }

        // Generate dynamic hours between 09:00 and 20:00:
        // Hour varies based on index: 9 + (i % 11) => between 9 and 19
        // Minute varies: (i * 7) % 60
        const hour = 9 + (i % 11);
        const minute = (i * 7) % 60;
        
        const pubDate = new Date();
        pubDate.setDate(pubDate.getDate() - i);
        pubDate.setHours(hour, minute, 0, 0);

        const readTimeVal = `${3 + (i % 5)} min de lectura`;
        const authorVal = i % 3 === 0 ? 'Mateo Valenzuela' : i % 3 === 1 ? 'Sofía Benítez' : 'Diego Rossi';
        
        // All articles start with exactly 0 words in the body as requested (empty string)
        const emptyContent = '';

        const metaTitle = `Noticias Mundial | ${item.title}`;
        const metaDescription = item.excerpt.substring(0, 160);

        // Assign mock image urls from unsplash according to category (just metadata URL)
        let imageUrl = '';
        if (category === 'selecciones') {
          imageUrl = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800';
        } else if (category === 'lesiones') {
          imageUrl = 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800';
        } else if (category === 'resultados') {
          imageUrl = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800';
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800';
        }

        const likesVal = 40 + ((i * 23) % 450);
        const trendingVal = i < 3; // mark first 3 as trending for front page hero selection

        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category, date, read_time, image_url, author, content, likes, trending, meta_title, meta_description, published_at, keyword
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          `,
          [
            String(i + 1),
            item.title,
            item.excerpt,
            category,
            dateLabel,
            readTimeVal,
            imageUrl,
            authorVal,
            emptyContent,
            likesVal,
            trendingVal,
            metaTitle,
            metaDescription,
            pubDate,
            item.keyword,
          ]
        );
      }
      console.log('Database pre-populated with exactly 50 World Cup articles successfully!');
    } else {
      console.log(`Database already contains exactly 50 articles. Skipping seeding.`);
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}
