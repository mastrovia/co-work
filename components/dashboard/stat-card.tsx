import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

export function StatCard({ title, value, change, trend }: StatCardProps) {
  const isPositive = trend === 'up';

  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">{title}</p>
        <div className="mt-2 flex items-end justify-between">
          <h3 className="text-3xl font-semibold text-gray-900">{value}</h3>
          {change && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
