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
    goals: number;
    assists: number;
    passingAccuracy: string;
    speedMax: string;
    distanceRan: string;
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
    homeTeam: { name: 'Estados Unidos', flag: 'USA', short: 'USA' },
    awayTeam: { name: 'Portugal', flag: 'POR', short: 'POR' },
    homeScore: 1,
    awayScore: 2,
    status: 'LIVE',
    minute: 75,
    competition: 'Mundial de Fútbol 2026 - Grupo A',
  },
  {
    id: 'm2',
    homeTeam: { name: 'España', flag: 'ESP', short: 'ESP' },
    awayTeam: { name: 'Japón', flag: 'JPN', short: 'JPN' },
    homeScore: 2,
    awayScore: 0,
    status: 'LIVE',
    minute: 22,
    competition: 'Mundial de Fútbol 2026 - Grupo C',
  },
  {
    id: 'm3',
    homeTeam: { name: 'Argentina', flag: 'ARG', short: 'ARG' },
    awayTeam: { name: 'Camerún', flag: 'CMR', short: 'CMR' },
    homeScore: 3,
    awayScore: 1,
    status: 'FINISHED',
    competition: 'Mundial de Fútbol 2026 - Grupo D',
  },
  {
    id: 'm4',
    homeTeam: { name: 'México', flag: 'MEX', short: 'MEX' },
    awayTeam: { name: 'Polonia', flag: 'POL', short: 'POL' },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    date: 'Hoy, 21:00',
    competition: 'Mundial de Fútbol 2026 - Grupo A',
  },
];

// Top 10 real players of World Cup 2026 with fully realistic stats
export const mockPlayerStats: PlayerStat[] = [
  {
    id: 'p1',
    name: 'Kylian Mbappé',
    team: 'Francia',
    flag: 'FRA',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 5,
      assists: 2,
      passingAccuracy: '84.2%',
      speedMax: '36.8 km/h',
      distanceRan: '48.2 km',
    },
  },
  {
    id: 'p2',
    name: 'Lamine Yamal',
    team: 'España',
    flag: 'ESP',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 3,
      assists: 4,
      passingAccuracy: '88.1%',
      speedMax: '34.9 km/h',
      distanceRan: '51.3 km',
    },
  },
  {
    id: 'p3',
    name: 'Lionel Messi',
    team: 'Argentina',
    flag: 'ARG',
    photo: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 4,
      assists: 5,
      passingAccuracy: '89.4%',
      speedMax: '32.1 km/h',
      distanceRan: '41.5 km',
    },
  },
  {
    id: 'p4',
    name: 'Jude Bellingham',
    team: 'Inglaterra',
    flag: 'ENG',
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 3,
      assists: 3,
      passingAccuracy: '91.2%',
      speedMax: '33.5 km/h',
      distanceRan: '54.8 km',
    },
  },
  {
    id: 'p5',
    name: 'Vinícius Júnior',
    team: 'Brasil',
    flag: 'BRA',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 4,
      assists: 2,
      passingAccuracy: '83.5%',
      speedMax: '36.2 km/h',
      distanceRan: '45.6 km',
    },
  },
  {
    id: 'p6',
    name: 'Harry Kane',
    team: 'Inglaterra',
    flag: 'ENG',
    photo: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 5,
      assists: 1,
      passingAccuracy: '81.9%',
      speedMax: '31.8 km/h',
      distanceRan: '47.1 km',
    },
  },
  {
    id: 'p7',
    name: 'Jamal Musiala',
    team: 'Alemania',
    flag: 'GER',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 2,
      assists: 4,
      passingAccuracy: '90.7%',
      speedMax: '34.2 km/h',
      distanceRan: '52.0 km',
    },
  },
  {
    id: 'p8',
    name: 'Cristiano Ronaldo',
    team: 'Portugal',
    flag: 'POR',
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 3,
      assists: 1,
      passingAccuracy: '86.3%',
      speedMax: '32.9 km/h',
      distanceRan: '42.8 km',
    },
  },
  {
    id: 'p9',
    name: 'Kevin De Bruyne',
    team: 'Bélgica',
    flag: 'BEL',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 1,
      assists: 6,
      passingAccuracy: '92.1%',
      speedMax: '33.0 km/h',
      distanceRan: '52.7 km',
    },
  },
  {
    id: 'p10',
    name: 'Federico Valverde',
    team: 'Uruguay',
    flag: 'URU',
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 2,
      assists: 2,
      passingAccuracy: '88.5%',
      speedMax: '35.1 km/h',
      distanceRan: '55.2 km',
    },
  },
];
