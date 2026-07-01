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
  keyword?: string;
  slug?: string;
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
    title: 'Previa de alta tensión: Canadá y Suiza definen el liderato del Grupo B en Vancouver',
    excerpt: 'El BC Place será testigo del duelo decisivo de hoy entre canadienses y helvéticos. Ambos con 4 puntos, buscan evitar cruces complicados en la ronda de 32.',
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
    title: '¡Alarma en Brasil! Vinícius Júnior es duda de última hora para enfrentar a Escocia en Miami',
    excerpt: 'El cuerpo médico de la Seleção reporta una fatiga muscular en el muslo derecho tras el entrenamiento en el Hard Rock Stadium. Podría ser preservado para los dieciseisavos.',
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
    title: 'Francia golea 3-0 a Irak tras el histórico retraso por tormenta eléctrica en Filadelfia',
    excerpt: 'Kylian Mbappé anotó por duplicado y Ousmane Dembélé cerró la cuenta en un partido marcado por una interrupción de dos horas por temporal en el Lincoln Financial Field.',
    category: 'resultados',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    date: 'Ayer',
    readTime: '5 min de lectura',
    author: 'Diego Rossi',
    likes: 189,
  },
  {
    id: '4',
    title: 'Erling Haaland mete a Noruega en dieciseisavos de final tras vencer 3-2 a Senegal',
    excerpt: 'El atacante del Manchester City brilló con un doblete y Marcus Pedersen abrió la cuenta en el MetLife Stadium. Descontó Ismaïla Sarr también por duplicado para los africanos.',
    category: 'resultados',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    date: 'Ayer',
    readTime: '7 min de lectura',
    author: 'Adriana Silva',
    likes: 275,
  },
  {
    id: '5',
    title: 'Análisis de Datos: El bloque defensivo de México que lo clasifica como líder invicto del Grupo A',
    excerpt: 'La selección de Javier Aguirre no ha encajado goles en sus partidos previos en el Estadio Azteca. Analizamos la solidez táctica de cara al duelo contra Chequia.',
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
    homeTeam: { name: 'Canadá', flag: 'CAN', short: 'CAN' },
    awayTeam: { name: 'Suiza', flag: 'SUI', short: 'SUI' },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    date: 'Hoy, 15:00 ET',
    competition: 'Grupo B - BC Place, Vancouver',
  },
  {
    id: 'm2',
    homeTeam: { name: 'Brasil', flag: 'BRA', short: 'BRA' },
    awayTeam: { name: 'Escocia', flag: 'SCO', short: 'SCO' },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    date: 'Hoy, 15:00 ET',
    competition: 'Grupo C - Hard Rock Stadium, Miami',
  },
  {
    id: 'm3',
    homeTeam: { name: 'México', flag: 'MEX', short: 'MEX' },
    awayTeam: { name: 'Chequia', flag: 'CZE', short: 'CZE' },
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    date: 'Hoy, 20:00 local',
    competition: 'Grupo A - Estadio Azteca, CDMX',
  },
  {
    id: 'm4',
    homeTeam: { name: 'Inglaterra', flag: 'ENG', short: 'ENG' },
    awayTeam: { name: 'Ghana', flag: 'GER', short: 'GHA' }, // Germ is placeholder flag in FlagIcon, we will use ENG/GER or default
    homeScore: 2,
    awayScore: 0,
    status: 'FINISHED',
    competition: 'Grupo L - Finalizado Ayer',
  },
  {
    id: 'm5',
    homeTeam: { name: 'Portugal', flag: 'POR', short: 'POR' },
    awayTeam: { name: 'Uzbekistán', flag: 'UZB', short: 'UZB' },
    homeScore: 3,
    awayScore: 0,
    status: 'FINISHED',
    competition: 'Grupo K - Finalizado Ayer',
  },
];

// Top 10 real players of World Cup 2026 with fully realistic stats as of June 24, 2026
export const mockPlayerStats: PlayerStat[] = [
  {
    id: 'p1',
    name: 'Erling Haaland',
    team: 'Noruega',
    flag: 'NOR',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 4,
      assists: 0,
      passingAccuracy: '76.2%',
      speedMax: '35.8 km/h',
      distanceRan: '17.8 km',
    },
  },
  {
    id: 'p2',
    name: 'Kylian Mbappé',
    team: 'Francia',
    flag: 'FRA',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 4,
      assists: 1,
      passingAccuracy: '85.4%',
      speedMax: '37.2 km/h',
      distanceRan: '18.4 km',
    },
  },
  {
    id: 'p3',
    name: 'Deniz Undav',
    team: 'Alemania',
    flag: 'GER',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 3,
      assists: 2,
      passingAccuracy: '81.4%',
      speedMax: '32.4 km/h',
      distanceRan: '19.8 km',
    },
  },
  {
    id: 'p4',
    name: 'Jonathan David',
    team: 'Canadá',
    flag: 'CAN',
    photo: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 3,
      assists: 1,
      passingAccuracy: '79.2%',
      speedMax: '34.2 km/h',
      distanceRan: '20.4 km',
    },
  },
  {
    id: 'p5',
    name: 'Michael Olise',
    team: 'Francia',
    flag: 'FRA',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 1,
      assists: 3,
      passingAccuracy: '86.5%',
      speedMax: '33.1 km/h',
      distanceRan: '21.2 km',
    },
  },
  {
    id: 'p6',
    name: 'Alexander Isak',
    team: 'Suecia',
    flag: 'SWE',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 2,
      assists: 3,
      passingAccuracy: '80.1%',
      speedMax: '34.9 km/h',
      distanceRan: '19.5 km',
    },
  },
  {
    id: 'p7',
    name: 'Lionel Messi',
    team: 'Argentina',
    flag: 'ARG',
    photo: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=150',
    position: 'DEL',
    metrics: {
      goals: 5,
      assists: 1,
      passingAccuracy: '91.2%',
      speedMax: '31.8 km/h',
      distanceRan: '16.5 km',
    },
  },
  {
    id: 'p8',
    name: 'Martin Ødegaard',
    team: 'Noruega',
    flag: 'NOR',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 1,
      assists: 2,
      passingAccuracy: '88.3%',
      speedMax: '31.5 km/h',
      distanceRan: '22.8 km',
    },
  },
  {
    id: 'p9',
    name: 'Joshua Kimmich',
    team: 'Alemania',
    flag: 'GER',
    photo: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 0,
      assists: 2,
      passingAccuracy: '89.1%',
      speedMax: '30.8 km/h',
      distanceRan: '23.5 km',
    },
  },
  {
    id: 'p10',
    name: 'Brahim Díaz',
    team: 'Marruecos',
    flag: 'MAR',
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=150',
    position: 'MED',
    metrics: {
      goals: 1,
      assists: 2,
      passingAccuracy: '85.4%',
      speedMax: '33.5 km/h',
      distanceRan: '20.1 km',
    },
  },
];
