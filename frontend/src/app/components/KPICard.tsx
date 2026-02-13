import { Card, CardContent } from './ui';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({ icon: Icon, label, value, subtitle, trend }: KPICardProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="flex items-start gap-4">
        <div className="rounded-lg bg-blue-50 p-3">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}