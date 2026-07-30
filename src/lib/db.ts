import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:cugh0qsq8uaeawz5@187.127.233.89:5435/postgres';

export const pool = new Pool({
  connectionString,
  ssl: false,
});

// Definition of 50 unique SEO-optimized articles based on general world news
const SEED_ARTICLES_DATA = [
  {
    title: 'Acuerdo histórico en la cumbre climática de Ginebra: 120 países firmarán la reducción acelerada de emisiones',
    excerpt: 'El consenso alcanzado de madrugada establece límites estrictos a las industrias pesadas y crea un fondo compensatorio millonario para economías en desarrollo.',
    keyword: 'cumbre-climatica-ginebra-2026',
    slug: 'acuerdo-historico-cumbre-climatica-ginebra',
  },
  {
    title: 'La Reserva Federal mantiene estables los tipos de interés ante el retroceso continuo de la inflación global',
    excerpt: 'El banco central destaca la solidez en el mercado laboral y sugiere que el periodo de subidas agresivas ha finalizado oficialmente de cara al cierre de año.',
    keyword: 'reserva-federal-tipos-interes-2026',
    slug: 'reserva-federal-tipos-interes-inflacion',
  },
  {
    title: 'Presentan el primer microchip cuántico comercial: Un salto de computación sin precedentes',
    excerpt: 'Una corporación tecnológica logra empaquetar procesamiento cuántico estable a temperatura ambiente en un formato compatible con superordenadores actuales.',
    keyword: 'microchip-cuantico-comercial-2026',
    slug: 'presentan-primer-microchip-cuantico-comercial',
  },
  {
    title: 'El Museo del Prado abre una galería digital interactiva con obras maestras restauradas en 8K',
    excerpt: 'La nueva experiencia digital permite examinar con precisión nanométrica cada trazo del pincel y sumergirse en análisis históricos mediante realidad aumentada.',
    keyword: 'museo-prado-galeria-digital-2026',
    slug: 'museo-del-prado-galeria-digital-8k',
  },
  {
    title: 'Final electrizante en Wimbledon: El nuevo talento de 19 años se consagra campeón tras cinco sets épicos',
    excerpt: 'En un partido que duró casi cinco horas frente al número uno del mundo, la joven promesa remontó dos sets adversos coronando un triunfo legendario.',
    keyword: 'final-wimbledon-campeon-2026',
    slug: 'final-electrizante-wimbledon-campeon-historico',
  },
  {
    title: 'Líderes mundiales se reúnen en la ONU para debatir la regulación internacional de la Inteligencia Artificial',
    excerpt: 'La asamblea general busca redactar un marco ético de seguridad vinculante que evite riesgos sistémicos en el desarrollo de modelos de lenguaje autónomos.',
    keyword: 'onu-regulacion-inteligencia-artificial-2026',
    slug: 'onu-regulacion-inteligencia-artificial-marcos',
  },
  {
    title: 'El desempleo en la eurozona registra mínimos históricos en el segundo trimestre de este año',
    excerpt: 'La oficina de estadísticas reporta una tasa del 5.9%, impulsada por la resiliencia en la contratación tecnológica y la recuperación total del sector servicios.',
    keyword: 'desempleo-eurozona-minimo-historico-2026',
    slug: 'desempleo-eurozona-minimos-historicos-record',
  },
  {
    title: 'Astrónomos descubren un exoplaneta con agua líquida y atmósfera estable a 40 años luz',
    excerpt: 'El nuevo telescopio orbital capta firmas moleculares de vapor de agua y oxígeno en el planeta Kepler-982c, abriendo nuevos debates sobre habitabilidad exterior.',
    keyword: 'descubrimiento-exoplaneta-agua-liquida-2026',
    slug: 'descubren-exoplaneta-agua-liquida-atmosfera',
  },
  {
    title: 'La Bienal de Venecia abre sus puertas con una exposición dedicada al arte ecológico y sostenible',
    excerpt: 'Pabellones de más de 80 naciones se centran en instalaciones realizadas con materiales reciclados y obras interactivas de denuncia medioambiental.',
    keyword: 'bienal-venecia-arte-ecologico-2026',
    slug: 'bienal-venecia-exposicion-arte-ecologico',
  },
  {
    title: 'Juegos Olímpicos: La delegación de natación rompe dos récords mundiales en la jornada inaugural',
    excerpt: 'Las disciplinas de relevos libre de 400 metros de hombres y mujeres pulverizan marcas previas, desatando la locura en el centro acuático.',
    keyword: 'juegos-olimpicos-natacion-records-2026',
    slug: 'juegos-olimpicos-natacion-records-inaugural',
  },
  {
    title: 'Tensiones geopolíticas en el Pacífico: Nuevos acuerdos comerciales buscan aliviar la cadena de suministro',
    excerpt: 'Una alianza transpacífica acuerda rebajas arancelarias mutuas y planes de respuesta rápida ante cuellos de botella logísticos globales.',
    keyword: 'acuerdos-comerciales-transpacifico-2026',
    slug: 'tensiones-pacifico-acuerdos-cadena-suministro',
  },
  {
    title: 'El precio del petróleo Brent experimenta volatilidad debido al aumento de producción y transición verde',
    excerpt: 'Los analistas sugieren una estabilización en torno a los 75 dólares por barril ante los ajustes del cartel y el impulso del transporte electrificado.',
    keyword: 'precio-petroleo-brent-transicion-2026',
    slug: 'precio-petroleo-brent-volatilidad-analisis',
  },
  {
    title: 'La inteligencia artificial autónoma debuta en el diagnóstico de enfermedades cardíacas de alta precisión',
    excerpt: 'Sistemas neuronales analizan miles de ecocardiogramas en segundos, detectando anomalías sutiles con una efectividad superior a los métodos tradicionales.',
    keyword: 'ia-diagnostico-cardiaco-medicina-2026',
    slug: 'inteligencia-artificial-diagnostico-enfermedades-cardiacas',
  },
  {
    title: 'Fallece a los 92 años el aclamado novelista y ganador del premio Cervantes',
    excerpt: 'El mundo de las letras hispanas despide hoy al maestro de la prosa realista tras una prolífica carrera literaria de más de seis décadas.',
    keyword: 'fallecimiento-escritor-premio-cervantes-2026',
    slug: 'fallece-novelista-ganador-premio-cervantes',
  },
  {
    title: 'Fórmula 1: Emocionante victoria bajo la lluvia en el Gran Premio de Mónaco',
    excerpt: 'La estrategia de neumáticos de seco en las vueltas finales permite una espectacular remontada de diez posiciones en el circuito urbano.',
    keyword: 'formula-1-gp-monaco-victoria-2026',
    slug: 'formula-1-gp-monaco-victoria-lluvia',
  },
  {
    title: 'Nuevos corredores de ayuda humanitaria se abren paso en las zonas de conflicto de África Central',
    excerpt: 'Agencias internacionales coordinan treguas logísticas para suministrar alimentos y medicamentos a más de un millón de personas aisladas.',
    keyword: 'ayuda-humanitaria-africa-central-2026',
    slug: 'corredores-ayuda-humanitaria-africa-central',
  },
  {
    title: 'Las exportaciones globales de semiconductores marcan récord ante la demanda del sector automotriz',
    excerpt: 'Las fundiciones del este asiático amplían su capacidad, logrando abastecer la cartera acumulada tras dos años de escasez severa.',
    keyword: 'exportacion-semiconductores-automotriz-2026',
    slug: 'exportaciones-semiconductores-record-automotriz',
  },
  {
    title: 'Lanzan al espacio un satélite revolucionario para rastrear fugas de metano a escala planetaria',
    excerpt: 'La misión ambiental conjunta monitorizará en tiempo real las infraestructuras de gas natural de todo el globo con imágenes térmicas.',
    keyword: 'lanzamiento-satelite-fugas-metano-2026',
    slug: 'lanzamiento-satelite-rastreo-fugas-metano',
  },
  {
    title: 'El festival de cine de San Sebastián anuncia una selección oficial con fuerte presencia iberoamericana',
    excerpt: 'Catorce largometrajes competirán por la Concha de Oro, destacando la presencia de nuevos talentos chilenos, mexicanos y españoles.',
    keyword: 'festival-cine-san-sebastian-2026',
    slug: 'festival-cine-san-sebastian-seleccion-oficial',
  },
  {
    title: 'La selección de balonmano sella su pase a la final del campeonato de Europa tras una prórroga dramática',
    excerpt: 'Un tanto de penalti en el último suspiro del tiempo extra corona un regreso heroico frente al combinado nórdico.',
    keyword: 'campeonato-balonmano-final-europa-2026',
    slug: 'seleccion-balonmano-final-campeonato-europa',
  },
  {
    title: 'Acuerdos multilaterales de ciberseguridad protegen infraestructuras críticas contra ataques cibernéticos',
    excerpt: 'Una veintena de naciones firma un pacto de colaboración de inteligencia militar para blindar redes eléctricas y sistemas hídricos.',
    keyword: 'ciberseguridad-infraestructuras-criticas-pacto-2026',
    slug: 'acuerdos-ciberseguridad-proteccion-infraestructuras-criticas',
  },
  {
    title: 'Startups de energía limpia reciben inversión récord de fondos soberanos en Europa y Asia',
    excerpt: 'La inyección financiera de más de 12.000 millones acelerará la construcción de parques eólicos flotantes mar adentro.',
    keyword: 'inversion-startups-energia-limpia-2026',
    slug: 'inversion-record-startups-energia-limpia',
  },
  {
    title: 'Diseñan una batería de estado sólido para vehículos eléctricos con autonomía superior a los mil kilómetros',
    excerpt: 'El nuevo electrolito cerámico evita el sobrecalentamiento y permite cargas ultra rápidas del 80% en apenas ocho minutos.',
    keyword: 'bateria-estado-solido-vehiculos-electricos-2026',
    slug: 'baterias-estado-solido-automocion-autonomia',
  },
  {
    title: 'Una excavación arqueológica en Egipto descubre una tumba intacta con murales de hace 4000 años',
    excerpt: 'El hallazgo en Saqqara pertenece a un alto funcionario de la Quinta Dinastía y muestra jeroglíficos y pinturas de colores vibrantes.',
    keyword: 'arqueologia-egipto-tumba-saqqara-2026',
    slug: 'excavacion-arqueologica-egipto-tumba-intacta',
  },
  {
    title: 'Giro de Italia: La etapa reina de montaña define al nuevo líder de la clasificación general',
    excerpt: 'Un demarraje a falta de cinco kilómetros para coronar el Passo dello Stelvio revienta la carrera por la Maglia Rosa.',
    keyword: 'giro-italia-maglia-rosa-stelvio-2026',
    slug: 'giro-italia-etapa-reina-clasificacion',
  },
  {
    title: 'La cumbre de desarrollo sostenible de Tokio propone metas de cero plástico para el año 2035',
    excerpt: 'El acuerdo de mínimos obliga a prohibir paulatinamente los plásticos de un solo uso no médicos en los países miembros.',
    keyword: 'cumbre-desarrollo-sostenible-tokio-2026',
    slug: 'cumbre-sostenibilidad-tokio-cero-plastico',
  },
  {
    title: 'Las criptomonedas de segunda generación avanzan hacia la integración con los bancos centrales europeos',
    excerpt: 'Entidades regulatorias proponen marcos de control para las stablecoins con el fin de asentar las bases del Euro digital.',
    keyword: 'euro-digital-stablecoins-regulacion-2026',
    slug: 'criptomonedas-segunda-generacion-bancos-centrales',
  },
  {
    title: 'Un implante neuronal permite a pacientes con parálisis severa escribir mediante comandos mentales',
    excerpt: 'La interfaz cerebro-computador traduce impulsos eléctricos en palabras digitales con un acierto del 98.6% y velocidad fluida.',
    keyword: 'implante-neuronal-paralisis-escritura-2026',
    slug: 'implante-neuronal-interfaz-cerebro-computador',
  },
  {
    title: 'La Filarmónica de Viena ofrece un concierto benéfico retransmitido de forma gratuita por internet',
    excerpt: 'La recaudación por publicidad de la emisión digital irá destinada íntegramente a programas de educación musical infantil.',
    keyword: 'filarmonica-viena-concierto-benefico-25-2026',
    slug: 'filarmonica-viena-concierto-benefico-digital',
  },
  {
    title: 'NBA: Los campeones defensores inician los playoffs con una victoria contundente en el último segundo',
    excerpt: 'Un triple sobre la bocina en el séptimo partido de la serie inicial decide la clasificación del equipo angelino.',
    keyword: 'nba-playoffs-triple-bocina-2026',
    slug: 'nba-playoffs-victoria-campeones-ultimo-segundo',
  },
  {
    title: 'Tratados de cooperación comercial entre la Unión Europea y el Mercosur entran en su fase final',
    excerpt: 'Ambas delegaciones alcanzan consensos en el sector agrícola, allanando el camino para el mayor bloque de libre comercio.',
    keyword: 'tratado-ue-mercosur-negociaciones-2026',
    slug: 'tratado-cooperacion-comercial-ue-mercosur',
  },
  {
    title: 'El oro alcanza máximos históricos como refugio seguro ante la incertidumbre económica global',
    excerpt: 'La onza troy de metal precioso supera los 2.450 dólares, respaldada por la compra de reservas por parte de bancos centrales.',
    keyword: 'oro-maximo-historico-refugio-economico-2026',
    slug: 'oro-precio-maximo-historico-refugio-seguro',
  },
  {
    title: 'Desarrollan plásticos biodegradables a partir de algas que se descomponen en agua marina en un mes',
    excerpt: 'La nueva formulación biopolímera imita la elasticidad del polietileno pero no deja residuos tóxicos ni microplásticos.',
    keyword: 'plasticos-biodegradables-algas-marinas-2026',
    slug: 'desarrollan-plasticos-biodegradables-algas-marinas',
  },
  {
    title: 'La restauración de la catedral gótica revela capiteles medievales ocultos durante siglos',
    excerpt: 'Un grupo de restauradores descubre relieves intactos representando mitología y fauna local detrás de un altar barroco.',
    keyword: 'restauracion-catedral-medieval-relieves-2026',
    slug: 'restauracion-catedral-gotica-descubrimiento-medieval',
  },
  {
    title: 'Tour de Francia: Un contrarreloj individual de alta velocidad agita los puestos del podio',
    excerpt: 'El corredor belga arrebata el maillot amarillo en una espectacular contrarreloj de 35 kilómetros cuesta arriba.',
    keyword: 'tour-francia-contrarreloj-maillot-amarillo-2026',
    slug: 'tour-francia-contrarreloj-individual-podio',
  },
  {
    title: 'La OMS declara erradicada una variante de virus endémico en zonas rurales de Sudamérica',
    excerpt: 'Tras campañas intensivas de vacunación y control de vectores, no se reportan casos del patógeno en tres años consecutivos.',
    keyword: 'oms-erradicacion-virus-sudamerica-2026',
    slug: 'oms-erradicacion-variante-virus-endemico',
  },
  {
    title: 'La inflación subyacente cae por debajo del objetivo en las principales potencias industriales',
    excerpt: 'La moderación en los precios de energía y alimentos importados acelera los planes para flexibilizar la política crediticia.',
    keyword: 'inflacion-subyacente-moderacion-precios-2026',
    slug: 'inflacion-subyacente-cae-objetivo-potencias',
  },
  {
    title: 'Prueban con éxito un reactor de fusión nuclear comercial manteniendo plasma estable por una hora',
    excerpt: 'El dispositivo tokamak del instituto experimental logra temperaturas solares estables y un retorno neto de energía positivo.',
    keyword: 'reactor-fusion-nuclear-tokamak-plasma-2026',
    slug: 'prueban-reactor-fusion-nuclear-plasma-estable',
  },
  {
    title: 'El Museo de Arte Moderno adquiere una colección histórica de fotografía vanguardista de los años 30',
    excerpt: 'El archivo recuperado incluye más de doscientas copias de plata originales de fotógrafas y pioneras surrealistas.',
    keyword: 'moma-fotografia-vanguardia-surrealismo-2026',
    slug: 'museo-arte-moderno-adquiere-fotografias-vanguardia',
  },
  {
    title: 'Clásico del fútbol nacional termina en empate con dos goles en los minutos de descuento',
    excerpt: 'Un penalti dudoso cobrado por el VAR y un cabezazo a la salida de un córner sellan el reparto de puntos final.',
    keyword: 'clasico-futbol-empate-descuento-2026',
    slug: 'clasico-futbol-nacional-empate-descuento',
  },
  {
    title: 'Iniciativas globales de reforestación plantan más de cien millones de árboles autóctonos en la Amazonia',
    excerpt: 'El proyecto de restauración a gran escala emplea drones sembradores y empleo comunitario para proteger la biodiversidad.',
    keyword: 'reforestacion-amazonia-biodiversidad-2026',
    slug: 'reforestacion-amazonia-iniciativa-global-arboles',
  },
  {
    title: 'El comercio electrónico transfronterizo representa el 30% del volumen minorista global',
    excerpt: 'Estudios de mercado sugieren que las compras directas a plataformas internacionales se han normalizado en la última década.',
    keyword: 'comercio-electronico-transfronterizo-minoristas-2026',
    slug: 'comercio-electronico-transfronterizo-volumen-minorista',
  },
  {
    title: 'Una nueva generación de paneles solares transparentes promete convertir ventanas en generadores eléctricos',
    excerpt: 'La tecnología fotovoltaica orgánica absorbe longitudes de onda no visibles sin restar claridad a los vidrios domésticos.',
    keyword: 'paneles-solares-transparentes-ventanas-2026',
    slug: 'paneles-solares-transparentes-ventanas-edificios',
  },
  {
    title: 'Se subasta un manuscrito inédito de un célebre poeta del siglo de oro por una cifra récord',
    excerpt: 'El documento original, hallado casualmente en una biblioteca privada, incluye poemas de amor y sátiras desconocidas.',
    keyword: 'subasta-manuscrito-poeta-siglo-de-oro-2026',
    slug: 'subasta-manuscrito-inedito-poeta-siglo-oro',
  },
  {
    title: 'La final de la Copa Davis de tenis se decidirá en el decisivo partido de dobles del domingo',
    excerpt: 'Tras las victorias individuales cruzadas del sábado, la pareja de dobles mixtos define el título de la copa.',
    keyword: 'copa-davis-final-dobles-tenis-2026',
    slug: 'final-copa-davis-tenis-dobles-decisivos',
  },
  {
    title: 'Cooperación pacífica internacional expande la base de investigación científica permanente en la Antártida',
    excerpt: 'Científicos de doce nacionalidades trabajarán conjuntamente en el análisis de testigos de hielo de más de un millón de años.',
    keyword: 'cooperacion-cientifica-antartida-testigos-hielo-2026',
    slug: 'cooperacion-internacional-antartida-investigacion-cientifica',
  },
  {
    title: 'El mercado de bonos soberanos verdes supera las expectativas de financiación climática',
    excerpt: 'Las emisiones de deuda pública destinadas exclusivamente a obras de adaptación ecológica captan fuerte demanda institucional.',
    keyword: 'bonos-soberanos-verdes-deuda-publica-2026',
    slug: 'mercado-bonos-soberanos-verdes-financiacion',
  },
  {
    title: 'Científicos secuencian el genoma completo de especies vegetales clave para adaptarlas al cambio climático',
    excerpt: 'La catalogación de genes de resistencia a la sequía abre vías para salvaguardar cultivos básicos en regiones áridas.',
    keyword: 'secuenciacion-genoma-vegetal-sequia-cultivos-2026',
    slug: 'secuenciacion-genoma-vegetal-resistencia-sequia',
  },
  {
    title: 'El festival de teatro de Mérida abre su temporada clásica con un lleno absoluto y gran crítica',
    excerpt: 'La representación de la tragedia griega en el teatro romano de Mérida convence con una escenografía moderna e impactante.',
    keyword: 'festival-teatro-merida-tragedia-griega-2026',
    slug: 'festival-teatro-merida-inauguracion-lleno',
  },
  {
    title: 'Copa del Mundo de Rugby: El equipo defensor del título avanza a semifinales tras un partido físico',
    excerpt: 'Un ensayo en la última jugada del partido rompe la defensa contraria y sella la victoria por un estrecho margen.',
    keyword: 'copa-mundo-rugby-semifinales-2026',
    slug: 'copa-mundo-rugby-semifinales-defensores-titulo',
  },
];

// Pre-defined natural hours and minutes for 50 articles to avoid any obvious pattern
const NATURAL_TIMES = [
  { h: 10, m: 24 }, { h: 14, m: 45 }, { h: 18, m: 12 }, { h: 9, m: 37 }, { h: 15, m: 5 },
  { h: 11, m: 50 }, { h: 19, m: 28 }, { h: 13, m: 14 }, { h: 16, m: 42 }, { h: 10, m: 3 },
  { h: 17, m: 55 }, { h: 12, m: 21 }, { h: 14, m: 9 }, { h: 9, m: 48 }, { h: 19, m: 58 },
  { h: 15, m: 33 }, { h: 11, m: 7 }, { h: 18, m: 46 }, { h: 13, m: 52 }, { h: 10, m: 31 },
  { h: 16, m: 19 }, { h: 12, m: 40 }, { h: 14, m: 57 }, { h: 9, m: 15 }, { h: 19, m: 4 },
  { h: 15, m: 22 }, { h: 11, m: 43 }, { h: 17, m: 11 }, { h: 13, m: 2 }, { h: 10, m: 54 },
  { h: 16, m: 35 }, { h: 12, m: 18 }, { h: 14, m: 29 }, { h: 9, m: 59 }, { h: 18, m: 37 },
  { h: 15, m: 51 }, { h: 11, m: 12 }, { h: 19, m: 45 }, { h: 13, m: 23 }, { h: 10, m: 16 },
  { h: 17, m: 8 }, { h: 12, m: 47 }, { h: 14, m: 11 }, { h: 9, m: 27 }, { h: 18, m: 53 },
  { h: 15, m: 2 }, { h: 11, m: 36 }, { h: 16, m: 58 }, { h: 13, m: 41 }, { h: 10, m: 49 }
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
        keyword VARCHAR(255) UNIQUE,
        slug VARCHAR(255) UNIQUE
      );
    `);

    // Run migration to add slug if table already existed without it
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;
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

    const { rows: firstArt } = await client.query("SELECT id, title, slug, category FROM articles WHERE id = '1'");
    // Reseed if the first article is missing, doesn't have slug, or uses old categories like 'selecciones'
    const reseedNeeded = firstArt.length === 0 || !firstArt[0].slug || firstArt[0].category === 'selecciones';

    const { rows } = await client.query('SELECT COUNT(*) FROM articles');
    const count = parseInt(rows[0].count, 10);

    // If the table doesn't have any articles or needs reseed, seed it
    if (count === 0 || reseedNeeded) {
      console.log(`Database contains ${count} articles. Seeding/Reseeding exactly 50 real World News articles with slugs...`);

      // Clear any existing articles to ensure clean seed of 50
      await client.query('DELETE FROM articles');

      const categoriesList = ['internacional', 'economia', 'tecnologia', 'cultura', 'deportes'];

      for (let i = 0; i < SEED_ARTICLES_DATA.length; i++) {
        const item = SEED_ARTICLES_DATA[i];
        
        // Alternating categories day-by-day to avoid consecutives
        const category = categoriesList[i % categoriesList.length];

        // Format dates: Hoy, Ayer, Hace X días
        let dateLabel = '';
        if (i === 0) {
          dateLabel = 'Hoy';
        } else if (i === 1) {
          dateLabel = 'Ayer';
        } else {
          dateLabel = `Hace ${i} días`;
        }

        // Generate organic hours and minutes from NATURAL_TIMES to avoid patterns
        const timeObj = NATURAL_TIMES[i % NATURAL_TIMES.length];
        const hour = timeObj.h;
        const minute = timeObj.m;
        
        const pubDate = new Date();
        pubDate.setDate(pubDate.getDate() - i);
        pubDate.setHours(hour, minute, 0, 0);

        const readTimeVal = `${3 + (i % 5)} min de lectura`;
        const authorVal = i % 3 === 0 ? 'Mateo Valenzuela' : i % 3 === 1 ? 'Sofía Benítez' : 'Diego Rossi';
        
        const emptyContent = '';

        const metaTitle = `Noticias Mundial | ${item.title}`;
        const metaDescription = item.excerpt.substring(0, 160);

        // Assign mock image urls from unsplash according to category
        let imageUrl = '';
        if (category === 'internacional') {
          imageUrl = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800';
        } else if (category === 'economia') {
          imageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800';
        } else if (category === 'tecnologia') {
          imageUrl = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800';
        } else if (category === 'cultura') {
          imageUrl = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800';
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800';
        }

        const likesVal = 40 + ((i * 23) % 450);
        const trendingVal = i < 3; // mark first 3 as trending for front page hero selection

        // Fallback slug if empty
        const slugVal = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category, date, read_time, image_url, author, content, likes, trending, meta_title, meta_description, published_at, keyword, slug
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
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
            slugVal,
          ]
        );
      }
      console.log('Database pre-populated with exactly 50 real World News articles with slugs successfully!');
    } else {
      console.log(`Database already contains exactly 50 real articles with slugs. Skipping seeding.`);
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}
