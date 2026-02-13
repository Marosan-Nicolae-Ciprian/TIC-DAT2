export const CITIES = ['Paris', 'Rennes', 'Toulouse', 'Lyon', 'Marseille', 'Lille'] as const;
export type City = typeof CITIES[number];

export const PERIODS = ['12 derniers mois', '24 derniers mois', 'Personnalisée'] as const;
export type Period = typeof PERIODS[number];

export interface AccidentData {
  date: string;
  hour: number;
  rain_mm: number;
  temp: number;
  wind_kmh: number;
  accidents: number;
  serious: number;
}

export interface KPIData {
  totalAccidents: number;
  seriousAccidents: number;
  accidentsInRain: number;
  highRiskDays: number;
}

// Mock KPI data per city
export const cityKPIs: Record<City, KPIData> = {
  Paris: { totalAccidents: 3842, seriousAccidents: 421, accidentsInRain: 892, highRiskDays: 47 },
  Rennes: { totalAccidents: 1256, seriousAccidents: 142, accidentsInRain: 378, highRiskDays: 52 },
  Toulouse: { totalAccidents: 1834, seriousAccidents: 198, accidentsInRain: 412, highRiskDays: 38 },
  Lyon: { totalAccidents: 2567, seriousAccidents: 289, accidentsInRain: 623, highRiskDays: 43 },
  Marseille: { totalAccidents: 2198, seriousAccidents: 267, accidentsInRain: 334, highRiskDays: 28 },
  Lille: { totalAccidents: 1678, seriousAccidents: 187, accidentsInRain: 521, highRiskDays: 56 },
};

// Mock hourly data
export const generateHourlyData = (city: City): AccidentData[] => {
  const data: AccidentData[] = [];
  for (let hour = 0; hour < 24; hour++) {
    // Peak hours: 8-9h and 17-19h
    const isPeak = (hour >= 8 && hour <= 9) || (hour >= 17 && hour <= 19);
    const baseAccidents = isPeak ? 15 : 5;
    
    data.push({
      date: '2025-01-15',
      hour,
      rain_mm: Math.random() > 0.7 ? Math.random() * 8 : 0,
      temp: 5 + Math.random() * 15,
      wind_kmh: 10 + Math.random() * 20,
      accidents: Math.floor(baseAccidents + Math.random() * 10),
      serious: Math.floor(Math.random() * 3),
    });
  }
  return data;
};

// Mock daily data for detailed analysis
export const generateDailyData = (city: City, days: number = 365): AccidentData[] => {
  const data: AccidentData[] = [];
  const startDate = new Date('2024-02-01');
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const rainChance = Math.random();
    const rain_mm = rainChance > 0.7 ? Math.random() * 15 : 0;
    const temp = -5 + Math.random() * 30;
    const isFreezing = temp < 0;
    const isRaining = rain_mm > 0;
    
    const baseAccidents = 8;
    const rainMultiplier = isRaining ? 1.3 : 1;
    const freezeMultiplier = isFreezing ? 1.5 : 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      hour: 12, // midday average
      rain_mm: parseFloat(rain_mm.toFixed(1)),
      temp: parseFloat(temp.toFixed(1)),
      wind_kmh: parseFloat((10 + Math.random() * 40).toFixed(1)),
      accidents: Math.floor(baseAccidents * rainMultiplier * freezeMultiplier + Math.random() * 5),
      serious: Math.floor(Math.random() * 4),
    });
  }
  
  return data;
};

// City comparison data
export interface CityComparison {
  city: City;
  totalAccidents: number;
  seriousRatio: number;
  accidentsInRain: number;
  freezeEffect: number;
}

export const generateComparisonData = (): CityComparison[] => {
  return CITIES.map(city => ({
    city,
    totalAccidents: cityKPIs[city].totalAccidents,
    seriousRatio: parseFloat((cityKPIs[city].seriousAccidents / cityKPIs[city].totalAccidents * 100).toFixed(1)),
    accidentsInRain: cityKPIs[city].accidentsInRain,
    freezeEffect: parseFloat((Math.random() * 40 + 10).toFixed(1)),
  }));
};

// Recommendations data
export interface Recommendation {
  id: string;
  title: string;
  condition: string;
  impact: string;
  effort: 'Faible' | 'Moyen' | 'Élevé';
  weatherType: 'pluie' | 'gel' | 'vent';
  applicableCities: City[];
}

export const recommendations: Recommendation[] = [
  {
    id: 'rec1',
    title: 'Renforcer la signalisation zone glissante',
    condition: 'Pluie > 5mm + 17–20h',
    impact: 'Réduction des collisions latérales',
    effort: 'Faible',
    weatherType: 'pluie',
    applicableCities: ['Paris', 'Lyon', 'Lille'],
  },
  {
    id: 'rec2',
    title: 'Campagne de sensibilisation gel matinal',
    condition: 'Temp < 0°C entre 6h–10h',
    impact: 'Réduction des accidents matinaux de 15%',
    effort: 'Moyen',
    weatherType: 'gel',
    applicableCities: ['Rennes', 'Lille', 'Lyon'],
  },
  {
    id: 'rec3',
    title: 'Déployer le salage préventif nocturne',
    condition: 'Prévision gel < -2°C',
    impact: 'Diminution forte des chutes et glissades',
    effort: 'Élevé',
    weatherType: 'gel',
    applicableCities: CITIES as unknown as City[],
  },
  {
    id: 'rec4',
    title: 'Adapter les feux tricolores (durée orange)',
    condition: 'Pluie > 1mm',
    impact: 'Réduction collisions arrière',
    effort: 'Moyen',
    weatherType: 'pluie',
    applicableCities: ['Paris', 'Toulouse', 'Marseille'],
  },
  {
    id: 'rec5',
    title: 'Renforcer patrouilles de sécurité routière',
    condition: 'Vent > 50 km/h',
    impact: 'Prévention accidents poids lourds',
    effort: 'Moyen',
    weatherType: 'vent',
    applicableCities: ['Marseille', 'Toulouse'],
  },
  {
    id: 'rec6',
    title: 'Installation panneaux à messages variables',
    condition: 'Conditions météo dégradées',
    impact: 'Information temps réel des usagers',
    effort: 'Élevé',
    weatherType: 'pluie',
    applicableCities: CITIES as unknown as City[],
  },
  {
    id: 'rec7',
    title: 'Améliorer drainage zones accidentogènes',
    condition: 'Pluie > 3mm sur zones identifiées',
    impact: 'Réduction aquaplaning',
    effort: 'Élevé',
    weatherType: 'pluie',
    applicableCities: ['Paris', 'Lyon', 'Rennes'],
  },
  {
    id: 'rec8',
    title: 'Campagne "Distances de sécurité pluie"',
    condition: 'Pluie > 1mm',
    impact: 'Sensibilisation usagers',
    effort: 'Faible',
    weatherType: 'pluie',
    applicableCities: CITIES as unknown as City[],
  },
  {
    id: 'rec9',
    title: 'Contrôles techniques renforcés (pneus)',
    condition: 'Période hivernale',
    impact: 'Meilleure adhérence par temps froid',
    effort: 'Moyen',
    weatherType: 'gel',
    applicableCities: CITIES as unknown as City[],
  },
  {
    id: 'rec10',
    title: 'Zones 30 temporaires par mauvais temps',
    condition: 'Visibilité < 50m ou gel',
    impact: 'Réduction gravité accidents',
    effort: 'Faible',
    weatherType: 'pluie',
    applicableCities: ['Lille', 'Rennes'],
  },
];
