import { useState } from 'react';
import { AlertCircle, Calendar, Database, CloudRain, Thermometer } from 'lucide-react';
import { ChartContainer } from '../components/ChartContainer';
import { DataAvailabilityBanner } from '../components/DataAvailabilityBanner';
import { Card, CardHeader, CardContent, Badge } from '../components/ui';
import { City, cityKPIs, generateDailyData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CityAnalysisProps {
  selectedCity: City;
}

export function CityAnalysis({ selectedCity }: CityAnalysisProps) {
  const kpis = cityKPIs[selectedCity];
  const dailyData = generateDailyData(selectedCity, 90); // Last 90 days
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Prepare hourly data with rain bins
  const hourlyRainData = Array.from({ length: 24 }, (_, hour) => {
    const accidents = Math.floor(Math.random() * 20 + 5);
    const rainBin = Math.random();
    return {
      hour: `${hour}h`,
      '0mm': rainBin < 0.3 ? accidents : 0,
      '0-1mm': rainBin >= 0.3 && rainBin < 0.5 ? accidents * 1.1 : 0,
      '1-5mm': rainBin >= 0.5 && rainBin < 0.8 ? accidents * 1.3 : 0,
      '>5mm': rainBin >= 0.8 ? accidents * 1.5 : 0,
    };
  });

  // Freeze effect data (6-10h)
  const freezeData = [
    { condition: 'Gel (< 0°C)', accidents: 42, color: '#06b6d4' },
    { condition: 'Pas de gel', accidents: 28, color: '#10b981' },
  ];

  // Paginate table data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dailyData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dailyData.length / itemsPerPage);

  const getRainBin = (rain: number) => {
    if (rain === 0) return '0';
    if (rain <= 1) return '0-1';
    if (rain <= 5) return '1-5';
    return '>5';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Analyse détaillée — {selectedCity}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">
            <Calendar className="w-3 h-3 mr-1" />
            12 derniers mois
          </Badge>
          <Badge variant="default">
            {kpis.totalAccidents} accidents
          </Badge>
          <Badge variant="pluie">
            <Database className="w-3 h-3 mr-1" />
            data.gouv.fr
          </Badge>
          <Badge variant="gel">
            Source météo externe
          </Badge>
        </div>
      </div>

      <DataAvailabilityBanner accidents={kpis.totalAccidents} observations={8760} />

      {/* Section 1: Hourly accidents vs rain */}
      <ChartContainer
        title="Accidents / heure vs pluie"
        subtitle="Distribution horaire des accidents selon l'intensité de pluie"
        legend={
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-300 rounded"></span>
              <span>Pluie 0mm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-200 rounded"></span>
              <span>0–1mm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-400 rounded"></span>
              <span>1–5mm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-600 rounded"></span>
              <span>&gt;5mm</span>
            </div>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyRainData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="0mm" stackId="a" fill="#d1d5db" name="0mm" />
            <Bar dataKey="0-1mm" stackId="a" fill="#93c5fd" name="0-1mm" />
            <Bar dataKey="1-5mm" stackId="a" fill="#60a5fa" name="1-5mm" />
            <Bar dataKey=">5mm" stackId="a" fill="#2563eb" name=">5mm" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Constat :</strong> Les accidents augmentent de 40% lorsque la pluie dépasse 5mm, 
            particulièrement pendant les heures de pointe du soir (17h–19h).
          </p>
        </div>
      </ChartContainer>

      {/* Section 2: Serious accidents vs weather */}
      <ChartContainer
        title="Accidents graves vs météo"
        subtitle="Corrélation entre conditions météo et gravité des accidents"
      >
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="text-gray-900">Définition "grave" :</strong>
                <span className="text-gray-600 ml-1">
                  Accident ayant entraîné au moins un blessé hospitalisé ou un décès (données BAAC).
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <CloudRain className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{kpis.seriousAccidents}</p>
              <p className="text-sm text-gray-600">Accidents graves totaux</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">+45%</div>
              <p className="text-sm text-gray-600">Sous pluie &gt; 5mm</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600">×1.8</div>
              <p className="text-sm text-gray-600">En période de gel</p>
            </div>
          </div>
        </div>
      </ChartContainer>

      {/* Section 3: Freeze effect */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-cyan-600" />
              <h3 className="font-semibold text-gray-900">Effet gel matin</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Gel matin : temp &lt; 0°C entre 6h et 10h
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={freezeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="condition" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="accidents" name="Accidents">
                  {freezeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-sm text-cyan-900">
              Le gel matinal augmente le risque d'accidents de <strong>+50%</strong> entre 6h et 10h.
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Interprétation & limites</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>
                <strong>Données manquantes :</strong> Environ 5% des observations météo sont interpolées 
                en cas d'indisponibilité temporaire.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>
                <strong>Précision géoloc :</strong> Jointure accidents/météo effectuée sur la commune, 
                avec station météo la plus proche (rayon max 50km).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>
                <strong>Corrélation ≠ causalité :</strong> Les analyses montrent des associations, 
                pas nécessairement des liens de cause à effet directs.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>
                <strong>Périmètre :</strong> Uniquement 6 villes françaises sur 12-24 mois. 
                Non généralisable à l'ensemble du territoire.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 4: Data table */}
      <Card variant="default">
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Tableau synthèse — Données quotidiennes</h3>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Pluie (bin)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Temp (°C)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Vent (km/h)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Accidents</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Graves</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{row.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant="pluie">{getRainBin(row.rain_mm)} mm</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.temp}°C</td>
                    <td className="px-4 py-3 text-gray-700">{row.wind_kmh}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.accidents}</td>
                    <td className="px-4 py-3">
                      {row.serious > 0 && <Badge variant="grave">{row.serious}</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {paginatedData.map((row, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{row.date}</span>
                  <Badge variant="pluie">{getRainBin(row.rain_mm)} mm</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Temp:</span>
                    <span className="ml-1 text-gray-900">{row.temp}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Vent:</span>
                    <span className="ml-1 text-gray-900">{row.wind_kmh} km/h</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Accidents:</span>
                    <span className="ml-1 font-medium text-gray-900">{row.accidents}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Graves:</span>
                    {row.serious > 0 ? (
                      <Badge variant="grave" className="ml-1">{row.serious}</Badge>
                    ) : (
                      <span className="ml-1 text-gray-400">0</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages} ({dailyData.length} résultats)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}