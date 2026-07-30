export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'internacional' | 'economia' | 'tecnologia' | 'cultura' | 'deportes';
  imageUrl: string;
  date: string;
  readTime: string;
  trending?: boolean;
  author: string;
  likes: number;
  keyword?: string;
  slug?: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Acuerdo histórico en la cumbre climática de Ginebra: 120 países firmarán la reducción acelerada de emisiones',
    excerpt: 'El consenso alcanzado de madrugada establece límites estrictos a las industrias pesadas y crea un fondo compensatorio millonario para economías en desarrollo.',
    category: 'internacional',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 15 min',
    readTime: '4 min de lectura',
    trending: true,
    author: 'Mateo Valenzuela',
    likes: 342,
    slug: 'acuerdo-historico-cumbre-climatica-ginebra',
    keyword: 'cumbre-climatica-ginebra'
  },
  {
    id: '2',
    title: 'La Reserva Federal mantiene estables los tipos de interés ante el retroceso continuo de la inflación global',
    excerpt: 'El banco central destaca la solidez en el mercado laboral y sugiere que el periodo de subidas agresivas ha finalizado oficialmente de cara al cierre de año.',
    category: 'economia',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 1 hora',
    readTime: '3 min de lectura',
    trending: true,
    author: 'Sofía Benítez',
    likes: 512,
    slug: 'reserva-federal-tipos-interes-inflacion',
    keyword: 'reserva-federal-tipos-interes'
  },
  {
    id: '3',
    title: 'Presentan el primer microchip cuántico comercial: Un salto de computación sin precedentes',
    excerpt: 'Una corporación tecnológica logra empaquetar procesamiento cuántico estable a temperatura ambiente en un formato compatible con superordenadores actuales.',
    category: 'tecnologia',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    date: 'Ayer',
    readTime: '5 min de lectura',
    author: 'Diego Rossi',
    likes: 189,
    slug: 'presentan-primer-microchip-cuantico-comercial',
    keyword: 'chip-cuantico-comercial'
  },
  {
    id: '4',
    title: 'El Museo del Prado abre una galería digital interactiva con obras maestras restauradas en 8K',
    excerpt: 'La nueva experiencia digital permite examinar con precisión nanométrica cada trazo del pincel y sumergirse en realidad aumentada.',
    category: 'cultura',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800',
    date: 'Ayer',
    readTime: '7 min de lectura',
    author: 'Adriana Silva',
    likes: 275,
    slug: 'museo-del-prado-galeria-digital-8k',
    keyword: 'museo-prado-galeria-digital'
  },
  {
    id: '5',
    title: 'Final electrizante en Wimbledon: El nuevo talento de 19 años se consagra campeón tras cinco sets épicos',
    excerpt: 'En un partido que duró casi cinco horas frente al número uno del mundo, la joven promesa remontó dos sets adversos coronando un triunfo legendario.',
    category: 'deportes',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 2 días',
    readTime: '6 min de lectura',
    author: 'Lucas Castro',
    likes: 120,
    slug: 'final-electrizante-wimbledon-campeon-historico',
    keyword: 'campeon-wimbledon-cinco-sets'
  }
];
