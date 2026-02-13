import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button, Select } from './ui';
import { CITIES, PERIODS, City, Period } from '../data/mockData';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  selectedCity: City;
  onCityChange: (city: City) => void;
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export function Header({ 
  currentPage, 
  onPageChange, 
  selectedCity, 
  onCityChange,
  selectedPeriod,
  onPeriodChange 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'city', label: 'Ville' },
    { id: 'comparison', label: 'Comparaison' },
    { id: 'recommendations', label: 'Recommandations' },
    { id: 'methodology', label: 'Méthodo' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-blue-600">Lumen Prévention</h1>
              <p className="text-sm text-gray-600">Observatoire Accidents & Météo</p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value as City)}
                className="w-48"
              >
                <option value="" disabled>Sélectionner une ville</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </Select>
              <Select
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value as Period)}
                className="w-48"
              >
                {PERIODS.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </Select>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-blue-600">Lumen Prévention</h1>
              <p className="text-xs text-gray-600">Observatoire Accidents & Météo</p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <Select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value as City)}
              className="flex-1 text-xs"
            >
              <option value="" disabled>Ville</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>
            <Select
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value as Period)}
              className="flex-1 text-xs"
            >
              {PERIODS.map(period => (
                <option key={period} value={period}>{period === '12 derniers mois' ? '12 mois' : period === '24 derniers mois' ? '24 mois' : period}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="py-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm font-medium ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}