import { ReactNode } from 'react';
import { Card, CardHeader, CardContent } from './ui';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  legend?: ReactNode;
  actions?: ReactNode;
}

export function ChartContainer({ title, subtitle, children, legend, actions }: ChartContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="ml-4">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
          {legend && (
            <div className="pt-4 border-t border-gray-100">
              {legend}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}