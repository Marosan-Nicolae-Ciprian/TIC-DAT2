import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { CityAnalysis } from './pages/CityAnalysis';
import { Comparison } from './pages/Comparison';
import { Recommendations } from './pages/Recommendations';
import { Methodology } from './pages/Methodology';
import { City, Period } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCity, setSelectedCity] = useState<City>('Paris');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('12 derniers mois');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard selectedCity={selectedCity} onPageChange={setCurrentPage} />;
      case 'city':
        return <CityAnalysis selectedCity={selectedCity} />;
      case 'comparison':
        return <Comparison onPageChange={setCurrentPage} />;
      case 'recommendations':
        return <Recommendations selectedCity={selectedCity} />;
      case 'methodology':
        return <Methodology />;
      default:
        return <Dashboard selectedCity={selectedCity} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />
      <main>
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 text-center text-sm text-gray-600">
          <p className="mb-2">
            <strong>Lumen Prévention</strong> — Observatoire Accidents & Météo
          </p>
          <p className="text-xs text-gray-500">
            Projet étudiant • Données : data.gouv.fr + sources météo externes • 
            6 villes : Paris, Rennes, Toulouse, Lyon, Marseille, Lille
          </p>
        </div>
      </footer>
    </div>
  );
}
