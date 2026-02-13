import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Erreur de chargement', 
  message = 'Impossible de charger les données. Veuillez réessayer.',
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-md text-center">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </Button>
      )}
    </div>
  );
}
