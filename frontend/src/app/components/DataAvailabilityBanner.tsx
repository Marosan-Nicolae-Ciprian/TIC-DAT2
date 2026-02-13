import { Info } from 'lucide-react';

interface DataAvailabilityBannerProps {
  accidents: number;
  observations: number;
}

export function DataAvailabilityBanner({ accidents, observations }: DataAvailabilityBannerProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start gap-3">
      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-900">
        <strong>Données disponibles :</strong> {accidents.toLocaleString('fr-FR')} accidents, {observations.toLocaleString('fr-FR')} obs météo
      </div>
    </div>
  );
}
