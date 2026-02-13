import { useState } from 'react';
import { Lightbulb, ArrowRight, Calendar, Target } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '../components/ui';
import { City, CITIES, recommendations, Recommendation } from '../data/mockData';

interface RecommendationsProps {
  selectedCity: City;
}

export function Recommendations({ selectedCity }: RecommendationsProps) {
  const [weatherFilter, setWeatherFilter] = useState<'all' | 'pluie' | 'gel' | 'vent'>('all');
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);

  const filteredRecs = recommendations.filter(rec => {
    const cityMatch = rec.applicableCities.includes(selectedCity);
    const weatherMatch = weatherFilter === 'all' || rec.weatherType === weatherFilter;
    return cityMatch && weatherMatch;
  });

  const effortColors = {
    Faible: 'faible' as const,
    Moyen: 'moyen' as const,
    Élevé: 'élevé' as const,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-yellow-600" />
          Recommandations actionnables
        </h1>
        <p className="text-gray-600">
          Actions de prévention pour les collectivités locales — {selectedCity}
        </p>
      </div>

      {/* Filters */}
      <Card variant="elevated">
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrer par type météo
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={weatherFilter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWeatherFilter('all')}
              >
                Toutes
              </Button>
              <Button
                variant={weatherFilter === 'pluie' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWeatherFilter('pluie')}
              >
                Pluie
              </Button>
              <Button
                variant={weatherFilter === 'gel' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWeatherFilter('gel')}
              >
                Gel
              </Button>
              <Button
                variant={weatherFilter === 'vent' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWeatherFilter('vent')}
              >
                Vent
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 self-end">
            <strong>{filteredRecs.length}</strong> recommandations disponibles
          </div>
        </CardContent>
      </Card>

      {/* Recommendations cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecs.map(rec => (
          <Card key={rec.id} variant="default" className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={rec.weatherType}>{rec.weatherType}</Badge>
                    <Badge variant={effortColors[rec.effort]}>{rec.effort}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Condition :</p>
                <p className="text-sm text-gray-600">{rec.condition}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Target className="w-4 h-4 text-green-600" />
                  Impact attendu :
                </p>
                <p className="text-sm text-gray-600">{rec.impact}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRec(rec)}
                className="w-full mt-2"
              >
                Voir données associées
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action plan */}
      <Card variant="outlined">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Plan d'action 30 jours — {selectedCity}
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold mb-1">
                  S1
                </div>
                <p className="text-xs text-gray-600">Semaine 1</p>
              </div>
              <div className="flex-1 pt-2">
                <h4 className="font-semibold text-gray-900 mb-1">Audit des zones à risque</h4>
                <p className="text-sm text-gray-600">
                  Identifier les 10 zones les plus accidentogènes sous pluie/gel. 
                  Mobiliser équipes terrain + données SIG.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold mb-1">
                  S2
                </div>
                <p className="text-xs text-gray-600">Semaine 2</p>
              </div>
              <div className="flex-1 pt-2">
                <h4 className="font-semibold text-gray-900 mb-1">Priorisation & budgétisation</h4>
                <p className="text-sm text-gray-600">
                  Sélectionner 3-5 actions à effort faible/moyen. 
                  Estimer coûts et délais de mise en œuvre.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold mb-1">
                  S3
                </div>
                <p className="text-xs text-gray-600">Semaine 3</p>
              </div>
              <div className="flex-1 pt-2">
                <h4 className="font-semibold text-gray-900 mb-1">Déploiement pilote</h4>
                <p className="text-sm text-gray-600">
                  Lancer 1-2 actions rapides (signalisation, campagne communication). 
                  Définir indicateurs de suivi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold mb-1">
                  S4
                </div>
                <p className="text-xs text-gray-600">Semaine 4</p>
              </div>
              <div className="flex-1 pt-2">
                <h4 className="font-semibold text-gray-900 mb-1">Évaluation & ajustement</h4>
                <p className="text-sm text-gray-600">
                  Mesurer l'impact initial (nb accidents, feedback terrain). 
                  Ajuster la stratégie pour mois suivants.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal for recommendation details */}
      {selectedRec && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedRec(null)}
        >
          <Card
            variant="elevated"
            className="max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedRec.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={selectedRec.weatherType}>{selectedRec.weatherType}</Badge>
                    <Badge variant={effortColors[selectedRec.effort]}>{selectedRec.effort}</Badge>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRec(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Condition déclencheuse</h4>
                <p className="text-gray-700">{selectedRec.condition}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Impact attendu</h4>
                <p className="text-gray-700">{selectedRec.impact}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Villes concernées</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRec.applicableCities.map(city => (
                    <Badge key={city} variant="default">{city}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Données associées (exemple)</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accidents concernés :</span>
                    <span className="font-semibold text-gray-900">
                      {Math.floor(Math.random() * 200 + 50)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Réduction estimée :</span>
                    <span className="font-semibold text-green-600">
                      -{Math.floor(Math.random() * 30 + 10)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget estimé :</span>
                    <span className="font-semibold text-gray-900">
                      {Math.floor(Math.random() * 50 + 10)}k€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Délai de mise en œuvre :</span>
                    <span className="font-semibold text-gray-900">
                      {selectedRec.effort === 'Faible' ? '2-4' : selectedRec.effort === 'Moyen' ? '4-8' : '8-12'} semaines
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <Button onClick={() => setSelectedRec(null)} className="w-full">
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}