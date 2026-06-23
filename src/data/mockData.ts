export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'selecciones' | 'lesiones' | 'resultados' | 'estadisticas';
  imageUrl: string;
  date: string;
  readTime: string;
  trending?: boolean;
  author: string;
  likes: number;
}

export interface LiveMatch {
  id: string;
  homeTeam: { name: string; flag: string; short: string };
  awayTeam: { name: string; flag: string; short: string };
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  minute?: number;
  competition: string;
  date?: string;
}

export interface PlayerStat {
  id: string;
  name: string;
  team: string;
  flag: string;
  photo: string;
  position: 'DEL' | 'MED' | 'DEF' | 'POR';
  metrics: {
    goals?: number;
    assists?: number;
    passingAccuracy?: string;
    speedMax?: string;
    distanceRan?: string;
    saves?: number;
  };
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'El resurgir de la Selección: táctica y juventud para la Copa del Mundo',
    excerpt: 'Analizamos cómo el nuevo esquema 4-3-3 implantado por el seleccionador está potenciando la velocidad de las bandas y la solidez en el medio campo.',
    category: 'selecciones',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 15 min',
    readTime: '4 min de lectura',
    trending: true,
    author: 'Mateo Valenzuela',
    likes: 342,
  },
  {
    id: '2',
    title: '¡Alarma roja! La estrella del mediocampo se lesiona a un mes del debut',
    excerpt: 'El parte oficial confirma un esguince de tobillo de grado II. Los médicos estiman de 3 a 4 semanas de recuperación. ¿Quién asumirá la batuta del equipo?',
    category: 'lesiones',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 1 hora',
    readTime: '3 min de lectura',
    trending: true,
    author: 'Sofía Benítez',
    likes: 512,
  },
  {
    id: '3',
    title: 'Lista de convocados definitiva: Sorpresas en la zaga y dos debutantes',
    excerpt: 'Se revela la nómina de 26 guerreros que viajarán a la cita mundialista. La veteranía en el arco contrasta con la savia nueva convocada para la defensa.',
    category: 'lesiones',
    imageUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 3 horas',
    readTime: '5 min de lectura',
    author: 'Diego Rossi',
    likes: 189,
  },
  {
    id: '4',
    title: 'Análisis táctico: Cómo la pizarra de los finalistas revolucionó el fútbol moderno',
    excerpt: 'Transiciones rápidas, presión tras pérdida asfixiante y laterales reconvertidos en carrileros interiores. El análisis de los patrones tácticos.',
    category: 'selecciones',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    date: 'Ayer',
    readTime: '7 min de lectura',
    author: 'Adriana Silva',
    likes: 275,
  },
  {
    id: '5',
    title: 'Efectividad al límite: El impacto del VAR en las estadísticas de penaltis',
    excerpt: 'Los datos muestran un incremento del 18% en los penaltis cobrados desde la llegada de la tecnología, cambiando las estrategias de los guardametas.',
    category: 'estadisticas',
    imageUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800',
    date: 'Hace 2 días',
    readTime: '6 min de lectura',
    author: 'Lucas Castro',
    likes: 120,
  },
];

export const mockMatches: LiveMatch[] = [
  {
    id: 'm1',
    homeTeam: { name: 'España', flag: '🇪🇸', short: 'ESP' },
    awayTeam: { name: 'Alemania', flag: '🇩🇪', short: 'GER' },
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
    minute: 78,
    competition: 'Mundial de Fútbol - Cuartos',
  },
  {
    id: 'm2',
    homeTeam: { name: 'Argentina', flag: '🇦🇷', short: 'ARG' },
    awayTeam: { name: 'Francia', flag: '🇫🇷', short: 'FRA' },
    homeScore: 0,
    awayScore: 0,
    status: 'LIVE',
    minute: 12,
    competition: 'Mundial de Fútbol - Semifinal',
  },
  {
    id: 'm3',
    homeTeam: { name: 'Brasil', flag: '🇧🇷', short: 'BRA' },
    awayTeam: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', short: 'ENG' },
    homeScore: 3,
    awayScore: 2,
    status: 'FINISHED',
    competition: 'Mundial de Fútbol - Octavos',
  },
  {
    id: 'm4',
    homeTeam: { name: 'Uruguay', flag: '🇺🇾', short: 'URU' },
    awayTeam: { name: 'Italia', flag: '🇮🇹', short: 'ITA' },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    date: 'Hoy, 21:00',
    competition: 'Amistoso Internacional',
  },
];

export const mockPlayerStats: PlayerStat[] = [
  {
    id: 'p1',
    name: 'Kylian Mbappé',
    team: 'Francia',
    flag: '🇫🇷',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 6,
      assists: 3,
      speedMax: '36.8 km/h',
      distanceRan: '48.2 km',
    },
  },
  {
    id: 'p2',
    name: 'Lionel Messi',
    team: 'Argentina',
    flag: '🇦🇷',
    photo: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 4,
      assists: 5,
      passingAccuracy: '89.4%',
      distanceRan: '41.5 km',
    },
  },
  {
    id: 'p3',
    name: 'Kevin De Bruyne',
    team: 'Bélgica',
    flag: '🇧🇪',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 2,
      assists: 6,
      passingAccuracy: '92.1%',
      distanceRan: '52.7 km',
    },
  },
  {
    id: 'p4',
    name: 'Emiliano Martínez',
    team: 'Argentina',
    flag: '🇦🇷',
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=150',
    position: 'POR',
    metrics: {
      saves: 18,
      passingAccuracy: '74.8%',
      distanceRan: '22.3 km',
    },
  },
];
