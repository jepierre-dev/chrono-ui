import * as React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Card, CardContent, CardHeader, CardTitle } from '../card/card.js';
import { Badge } from '../badge/badge.js';
import { Skeleton } from '../skeleton/skeleton.js';
import { useIsLoading } from '../../context/loading-context.js';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number; // e.g. +14.2 o -3.1
  changePeriod?: string; // e.g. "vs el mes pasado"
  icon?: React.ReactNode;
  sparklineData?: number[]; // [10, 25, 40, 20, 60, 80, 95]
  highlight?: boolean;
  loadingId?: string | string[];
}

export function StatCard({
  title,
  value,
  change,
  changePeriod = 'vs mes anterior',
  icon,
  sparklineData,
  highlight = false,
  loadingId,
  className,
  ...props
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const isLoading = useIsLoading(loadingId);

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200 hover:shadow-lg',
        highlight &&
          'border-chrono-primary/40 bg-gradient-to-b from-sky-500/[0.03] to-transparent dark:from-sky-500/[0.06] dark:to-transparent',
        className
      )}
      {...props}
    >
      {highlight && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-chrono-primary to-transparent" />
      )}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </CardTitle>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-chrono-primary/10 text-chrono-primary shadow-xs">
            {icon}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="space-y-2 py-1">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-extrabold tracking-tight text-chrono-fg">
              {value}
            </div>

            {/* Change Indicator */}
            {change !== undefined && (
              <div className="flex items-center gap-2 text-xs">
                <Badge
                  variant={isPositive ? 'success' : 'destructive'}
                  className="gap-0.5 px-1.5 py-0 font-semibold"
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 stroke-[3]" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 stroke-[3]" />
                  )}
                  {isPositive ? `+${change}%` : `${change}%`}
                </Badge>
                <span className="text-slate-500 dark:text-slate-400">{changePeriod}</span>
              </div>
            )}

            {/* Mini Sparkline Bar Chart Visual */}
            {sparklineData && sparklineData.length > 0 && (
              <div className="flex items-end gap-1.5 pt-2 h-9">
                {sparklineData.map((val, idx) => {
                  const max = Math.max(...sparklineData, 1);
                  const heightPercent = Math.max(15, Math.round((val / max) * 100));
                  return (
                    <div
                      key={idx}
                      title={`${val}`}
                      style={{ height: `${heightPercent}%` }}
                      className="w-full rounded-sm bg-chrono-primary/20 hover:bg-chrono-primary transition-colors duration-150"
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

