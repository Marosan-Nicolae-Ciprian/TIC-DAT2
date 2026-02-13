import { useState } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { ChartContainer } from '../components/ChartContainer';
import { Card, CardContent, Button, Badge } from '../components/ui';
import { CITIES, generateComparisonData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ComparisonProps {
  onPageChange: (page: string) => void;
}

export function Comparison({ onPageChange }: ComparisonProps) {
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set(CITIES));
  const [metric, setMetric] = useState<'totalAccidents' | 'seriousRatio' | 'accidentsInRain' | 'freezeEffect'>('totalAccidents');

  const comparisonData = generateComparisonData().filter(d => selectedCities.has(d.city));

  const toggleCity = (city: string) => {
    const newSet = new Set(selectedCities);
    if (newSet.has(city)) {
      if (newSet.size > 1) newSet.delete(city);
    } else {
      newSet.add(city);
    }
    setSelectedCities(newSet);
  };

  const metricLabels = {
    totalAccidents: 'Accidents totaux',
    seriousRatio: 'Ratio graves (%)',
    accidentsInRain: 'Accidents sous pluie',
    freezeEffect: 'Effet gel (%)',
  };

  const getMetricValue = (item: typeof comparisonData[0]) => {
    switch (metric) {
      case 'totalAccidents': return item.totalAccidents;
      case 'seriousRatio': return item.seriousRatio;
      case 'accidentsInRain': return item.accidentsInRain;
      case 'freezeEffect': return item.freezeEffect;
    }
  };

  const sortedForRanking = [...comparisonData].sort((a, b) => getMetricValue(b) - getMetricValue(a));
  const top3 = sortedForRanking.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Comparaison inter-villes
        </h1>
        <p className="text-gray-600">
          Comparez les 6 villes selon différentes métriques d'accidentologie et météo
        </p>
      </div>

      {/* Controls */}
      <Card variant="elevated">
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sélectionner les villes à comparer
            </label>
            <div className="flex flex-wrap gap-2">
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => toggleCity(city)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCities.has(city)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Choix de la métrique
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {(Object.keys(metricLabels) as Array<keyof typeof metricLabels>).map(m => (
                <Button
                  key={m}
                  variant={metric === m ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMetric(m)}
                  className="w-full"
                >
                  {metricLabels[m]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart 1: Comparative bar chart */}
      <ChartContainer
        title={`Comparaison : ${metricLabels[metric]}`}
        subtitle="Classement des villes selon la métrique sélectionnée"
      >
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="city" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey={metric} fill="#3b82f6" name={metricLabels[metric]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Ranking cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Top 3 villes — {metricLabels[metric]}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((city, idx) => (
            <Card key={city.city} variant="elevated">
              <CardContent className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                  idx === 0 ? 'bg-yellow-100' :
                  idx === 1 ? 'bg-gray-100' :
                  'bg-orange-100'
                }`}>
                  <span className={`text-2xl font-bold ${
                    idx === 0 ? 'text-yellow-600' :
                    idx === 1 ? 'text-gray-600' :
                    'text-orange-600'
                  }`}>
                    {idx + 1}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{city.city}</h4>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {getMetricValue(city).toLocaleString('fr-FR')}
                  {metric === 'seriousRatio' || metric === 'freezeEffect' ? '%' : ''}
                </div>
                <p className="text-sm text-gray-600">{metricLabels[metric]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart 2: Extreme weather days */}
      <ChartContainer
        title="Top 10 jours météo extrême vs pics d'accidents"
        subtitle="Corrélation entre événements météo extrêmes et pics d'accidents"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Ville</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Condition</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Accidents</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Écart moyenne</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.slice(0, 6).map((city, idx) => {
                const conditions = ['Pluie intense (>10mm)', 'Gel sévère (-5°C)', 'Vent fort (>60km/h)'];
                const condition = conditions[idx % 3];
                const accidents = Math.floor(Math.random() * 30 + 40);
                const deviation = Math.floor(Math.random() * 50 + 100);
                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{city.city}</td>
                    <td className="px-4 py-3 text-gray-700">2024-12-{15 + idx}</td>
                    <td className="px-4 py-3">
                      <Badge variant={condition.includes('Pluie') ? 'pluie' : condition.includes('Gel') ? 'gel' : 'vent'}>
                        {condition}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{accidents}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        +{deviation}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartContainer>

      {/* Conclusion */}
      <Card variant="outlined">
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">À retenir</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <p>
                <strong>Paris</strong> et <strong>Lyon</strong> concentrent le plus d'accidents en volume, 
                en raison d'une densité de circulation plus élevée.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <p>
                <strong>Lille</strong> et <strong>Rennes</strong> affichent les taux les plus élevés d'accidents 
                sous pluie (&gt;30% des accidents totaux), liés à une pluviométrie importante.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">•</span>
              <p>
                L'effet gel est particulièrement marqué à <strong>Lille</strong>, <strong>Rennes</strong> et 
                <strong>Lyon</strong>, avec un risque accru de +50% entre 6h et 10h.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Button onClick={() => onPageChange('recommendations')}>
              Voir les recommandations de prévention
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}