import { AlertTriangle, CloudRain, Thermometer, Wind } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { ChartContainer } from '../components/ChartContainer';
import { DataAvailabilityBanner } from '../components/DataAvailabilityBanner';
import { Card, CardContent, Button, Badge } from '../components/ui';
import { City, cityKPIs, generateHourlyData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  selectedCity: City;
  onPageChange: (page: string) => void;
}

export function Dashboard({ selectedCity, onPageChange }: DashboardProps) {
  const kpis = cityKPIs[selectedCity];
  const hourlyData = generateHourlyData(selectedCity);

  // Format data for hourly chart
  const hourlyChartData = hourlyData.map(d => ({
    hour: `${d.hour}h`,
    accidents: d.accidents,
    pluie: d.rain_mm > 0 ? 'Pluie' : 'Sec',
    rain_mm: d.rain_mm,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center lg:text-left space-y-3 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Comprendre l'impact de la météo sur les accidents
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0">
          Analyse des accidents corporels croisée avec température, pluie et vent.
        </p>
      </div>

      {/* Data Availability */}
      <DataAvailabilityBanner accidents={kpis.totalAccidents} observations={8760} />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={AlertTriangle}
          label="Total accidents"
          value={kpis.totalAccidents.toLocaleString('fr-FR')}
          subtitle="sur période sélectionnée"
        />
        <KPICard
          icon={AlertTriangle}
          label="Accidents graves"
          value={kpis.seriousAccidents}
          subtitle={`${((kpis.seriousAccidents / kpis.totalAccidents) * 100).toFixed(1)}% du total`}
        />
        <KPICard
          icon={CloudRain}
          label="Accidents sous pluie"
          value={kpis.accidentsInRain}
          subtitle={`${((kpis.accidentsInRain / kpis.totalAccidents) * 100).toFixed(1)}% du total`}
        />
        <KPICard
          icon={Thermometer}
          label="Jours à risque"
          value={kpis.highRiskDays}
          subtitle="pluie/gel intense"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Hourly accidents */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="Accidents par heure & pluie"
            subtitle="Distribution horaire des accidents selon les conditions météo"
            legend={
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="pluie">Pluie (mm)</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600">Bins:</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">0</span>
                  <span className="px-2 py-0.5 bg-blue-100 rounded text-xs">0–1</span>
                  <span className="px-2 py-0.5 bg-blue-200 rounded text-xs">1–5</span>
                  <span className="px-2 py-0.5 bg-blue-300 rounded text-xs">&gt;5</span>
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="accidents" fill="#3b82f6" name="Accidents" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Reading guide */}
        <Card variant="elevated">
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📊 Lecture du graphique</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Les heures de pointe (8-9h et 17-19h) concentrent le plus d'accidents, 
                indépendamment des conditions météo.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">Constat principal</h5>
              <p className="text-sm text-gray-600">
                La pluie augmente le nombre d'accidents de <strong>+30%</strong> en moyenne, 
                particulièrement entre 17h et 20h.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart 2: Severity vs weather */}
      <ChartContainer
        title="Gravité vs météo"
        subtitle="Évolution de la gravité des accidents selon les conditions météorologiques"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">Pluie</Button>
            <Button variant="secondary" size="sm">Température</Button>
            <Button variant="secondary" size="sm">Vent</Button>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hourlyChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accidents" stroke="#3b82f6" name="Accidents" strokeWidth={2} />
            <Line type="monotone" dataKey="rain_mm" stroke="#06b6d4" name="Pluie (mm)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Message principal :</strong> Quand la pluie augmente au-delà de 5mm, 
            le nombre d'accidents graves augmente de 45% en moyenne.
          </p>
        </div>
      </ChartContainer>

      {/* Quick Conclusions */}
      <Card variant="outlined">
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Conclusions rapides — {selectedCity}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CloudRain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Impact pluie</p>
                <p className="text-sm text-gray-600">
                  +30% d'accidents lorsque pluie &gt; 1mm
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Effet gel</p>
                <p className="text-sm text-gray-600">
                  Risque × 1.5 entre 6h–10h si temp &lt; 0°C
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Wind className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Heures critiques</p>
                <p className="text-sm text-gray-600">
                  17h–20h : pic d'accidents par mauvais temps
                </p>
              </div>
            </div>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => onPageChange('city')} className="flex-1 sm:flex-initial">
              Voir l'analyse détaillée de {selectedCity}
            </Button>
            <Button variant="secondary" onClick={() => onPageChange('comparison')} className="flex-1 sm:flex-initial">
              Comparer les villes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}