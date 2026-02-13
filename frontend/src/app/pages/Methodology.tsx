import { Database, MapPin, Calendar, GitMerge, AlertTriangle, Users, Thermometer } from 'lucide-react';
import { Card, CardHeader, CardContent, Badge } from '../components/ui';
import { CITIES } from '../data/mockData';

export function Methodology() {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Méthodologie & Sources
        </h1>
        <p className="text-gray-600">
          Transparence et rigueur scientifique pour un observatoire fiable
        </p>
      </div>

      {/* Introduction */}
      <Card variant="elevated" className="bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Projet étudiant — Lumen Prévention</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Cet observatoire est un projet étudiant porté par l'association nationale <strong>Lumen Prévention</strong>, 
                dans le cadre d'une mission de sensibilisation à la sécurité routière. 
                Il s'adresse aux collectivités locales et vise à démocratiser l'accès aux données d'accidentologie 
                croisées avec la météorologie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data sources */}
      <Card variant="default">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Sources de données
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="pluie" className="mt-1">Accidents</Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">data.gouv.fr — Base BAAC</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Données officielles des accidents corporels de la circulation routière en France, 
                  issues des procès-verbaux des forces de l'ordre. Fichiers utilisés :
                </p>
                <ul className="mt-2 ml-4 text-sm text-gray-600 space-y-1">
                  <li>• <strong>Caractéristiques</strong> : date, heure, localisation, conditions</li>
                  <li>• <strong>Lieux</strong> : type de voie, infrastructure</li>
                  <li>• <strong>Véhicules</strong> : catégorie, manœuvre</li>
                  <li>• <strong>Usagers</strong> : gravité des blessures</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="gel" className="mt-1">Météo</Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">OpenWeather / Météo-France</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Observations météorologiques horaires provenant de stations au sol. 
                  Variables collectées : température (°C), précipitations (mm), vitesse du vent (km/h), 
                  visibilité, nébulosité.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scope */}
      <Card variant="default">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Périmètre strict
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6 villes françaises</h4>
            <div className="flex flex-wrap gap-2">
              {CITIES.map(city => (
                <Badge key={city} variant="default">{city}</Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Choix motivé par la disponibilité des données météo de qualité et 
              la représentativité géographique (Nord, Sud, Ouest, Centre-Est).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Période : 12 à 24 mois</h4>
              <p className="text-sm text-gray-600">
                Analyse portant sur les données de <strong>février 2024 à janvier 2026</strong> 
                (maximum 24 mois glissants). Cette période permet de capturer les variations saisonnières 
                tout en restant récente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card variant="default">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <GitMerge className="w-6 h-6 text-blue-600" />
            Jointure accidents ↔ météo
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Méthode de croisement</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Chaque accident est associé à l'observation météo la plus proche en temps et en espace :
            </p>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-900 min-w-[100px]">Temporel :</span>
                <span className="text-blue-800">
                  Nearest neighbor ±1 heure (ex: accident à 15h23 → obs météo 15h00)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-900 min-w-[100px]">Spatial :</span>
                <span className="text-blue-800">
                  Station météo la plus proche de la commune (rayon max 50 km)
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Gestion des données manquantes</h4>
            <p className="text-sm text-gray-600">
              Environ 5% des observations météo sont interpolées (linéaire) en cas d'indisponibilité. 
              Les accidents sans données météo fiables (&gt; 50 km de la station) sont exclus de l'analyse.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bins & definitions */}
      <Card variant="default">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Bins pluie & Définitions</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Pluie (mm)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="font-bold text-gray-900 mb-1">0</div>
                <div className="text-xs text-gray-600">Sec</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="font-bold text-blue-900 mb-1">0–1</div>
                <div className="text-xs text-blue-700">Pluie faible</div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-center">
                <div className="font-bold text-blue-900 mb-1">1–5</div>
                <div className="text-xs text-blue-700">Pluie modérée</div>
              </div>
              <div className="p-3 bg-blue-200 rounded-lg text-center">
                <div className="font-bold text-blue-900 mb-1">&gt;5</div>
                <div className="text-xs text-blue-700">Pluie forte</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Accident "grave"
              </h5>
              <p className="text-sm text-red-800">
                Accident ayant causé au moins un <strong>blessé hospitalisé</strong> ou un <strong>décès</strong>, 
                selon la nomenclature BAAC (gravité = 2 ou 1).
              </p>
            </div>

            <div className="p-4 bg-cyan-50 rounded-lg">
              <h5 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Gel matin
              </h5>
              <p className="text-sm text-cyan-800">
                Température <strong>&lt; 0°C</strong> observée entre <strong>6h et 10h</strong>, 
                période critique pour la formation de verglas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Limitations */}
      <Card variant="outlined" className="border-orange-200 bg-orange-50">
        <CardHeader>
          <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Limites & précautions d'interprétation
          </h2>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-orange-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-lg">•</span>
            <p>
              <strong>Corrélation ≠ causalité :</strong> Les liens statistiques observés ne prouvent pas 
              systématiquement une relation de cause à effet directe.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-lg">•</span>
            <p>
              <strong>Granularité spatiale :</strong> Les données météo sont issues de stations fixes 
              et peuvent ne pas refléter les micro-variations locales.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-lg">•</span>
            <p>
              <strong>Facteurs non capturés :</strong> Trafic, état de la chaussée, comportement des conducteurs, 
              etc., ne sont pas pris en compte dans cette analyse simplifiée.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-lg">•</span>
            <p>
              <strong>Non généralisable :</strong> Les résultats concernent strictement les 6 villes étudiées 
              et ne peuvent être extrapolés à d'autres territoires sans précaution.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card variant="elevated">
        <CardContent className="text-center py-6">
          <h3 className="font-semibold text-gray-900 mb-2">Contact & Mentions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Projet étudiant réalisé par <strong>Lumen Prévention</strong> — Association nationale de prévention routière
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-900">
            <Database className="w-4 h-4" />
            Données ouvertes • Méthodologie transparente • À vocation pédagogique
          </div>
        </CardContent>
      </Card>
    </div>
  );
}