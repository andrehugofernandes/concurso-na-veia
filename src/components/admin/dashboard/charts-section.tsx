'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedBorderCard } from '@/components/ui/animated-border-card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme as useCombinedTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { getDownloadsByCategoryAction, getTimelineAction } from '@/lib/actions/dashboard';

// Dados mockados para Visitas (implementar tracking depois)
const visitsDataByPeriod = {
  day: [
    { name: '00:00', value: 12 },
    { name: '04:00', value: 5 },
    { name: '08:00', value: 25 },
    { name: '12:00', value: 45 },
    { name: '16:00', value: 35 },
    { name: '20:00', value: 28 },
  ],
  week: [
    { name: 'Segunda', value: 65 },
    { name: 'Terça', value: 78 },
    { name: 'Quarta', value: 90 },
    { name: 'Quinta', value: 61 },
    { name: 'Sexta', value: 85 },
    { name: 'Sábado', value: 40 },
    { name: 'Domingo', value: 35 },
  ],
  month: [
    { name: 'Sem 1', value: 320 },
    { name: 'Sem 2', value: 450 },
    { name: 'Sem 3', value: 380 },
    { name: 'Sem 4', value: 520 },
  ],
  year: [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1400 },
    { name: 'Mar', value: 1100 },
    { name: 'Abr', value: 1600 },
    { name: 'Mai', value: 1350 },
    { name: 'Jun', value: 1800 },
    { name: 'Jul', value: 1750 },
    { name: 'Ago', value: 1900 },
    { name: 'Set', value: 1650 },
    { name: 'Out', value: 2100 },
    { name: 'Nov', value: 1950 },
    { name: 'Dez', value: 2200 },
  ]
};

interface CategoryDownload {
  label: string;
  downloads: number;
  percentage: number;
}

export function ChartsSection() {
  type PeriodKey = 'day' | 'week' | 'month' | 'year';
  type TimelinePoint = { name: string; value: number };
  type TimelineData = Record<PeriodKey, TimelinePoint[]>;

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('week');
  const [selectedMetric, setSelectedMetric] = useState<'visits' | 'downloads'>('visits');
  const [categoryData, setCategoryData] = useState<CategoryDownload[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [downloadsData, setDownloadsData] = useState<TimelineData>({
    day: [],
    week: [],
    month: [],
    year: []
  });
  const [visitsData, setVisitsData] = useState<TimelineData>({
    day: [],
    week: [],
    month: [],
    year: []
  });
  const themeCtx = useCombinedTheme();
  const themeColors = themeCtx.themeColors;
  const isDark = themeCtx.theme === 'dark' || themeCtx.resolvedTheme === 'dark';

  // Cor da linha derivada de CSS variable --primary para obedecer ao skin
  const [lineColor, setLineColor] = useState<string>('#0037C1');

  // Buscar dados de downloads por categoria
  useEffect(() => {
    const fetchCategoryDownloads = async () => {
      try {
        const result = await getDownloadsByCategoryAction();
        if (result.status === 'success') {
          setCategoryData(result.data.categories || []);
        }
      } catch (error) {
        console.error('Erro ao buscar downloads por categoria:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoryDownloads();
  }, []);

  // Buscar dados de downloads por período
  useEffect(() => {
    const fetchDownloadsData = async () => {
      const periods: Array<PeriodKey> = ['day', 'week', 'month', 'year'];

      for (const period of periods) {
        try {
          const result = await getTimelineAction('downloads', period);
          if (result.status === 'success') {
            setDownloadsData((prev: TimelineData) => ({
              ...prev,
              [period]: result.data.data || []
            }));
          }
        } catch (error) {
          console.error(`Erro ao buscar downloads (${period}):`, error);
        }
      }
    };

    fetchDownloadsData();
  }, []);

  // Buscar dados de visitas por período
  useEffect(() => {
    const fetchVisitsData = async () => {
      const periods: Array<PeriodKey> = ['day', 'week', 'month', 'year'];

      for (const period of periods) {
        try {
          const result = await getTimelineAction('visits', period);
          if (result.status === 'success') {
            setVisitsData((prev: TimelineData) => ({
              ...prev,
              [period]: result.data.data || []
            }));
          }
        } catch (error) {
          console.error(`Erro ao buscar visitas (${period}):`, error);
        }
      }
    };

    fetchVisitsData();
  }, []);

  useEffect(() => {
    const updateLineColor = () => {
      if (typeof window !== 'undefined') {
        try {
          const root = document.documentElement;
          const cssVar = getComputedStyle(root).getPropertyValue('--primary').trim();
          if (cssVar) {
            setLineColor(cssVar);
          } else if (themeColors?.primary) {
            setLineColor(themeColors.primary);
          }
        } catch {
          if (themeColors?.primary) {
            setLineColor(themeColors.primary);
          }
        }
      }
    };

    // Atualizar imediatamente
    updateLineColor();

    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      updateLineColor();
    });

    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return () => observer.disconnect();
  }, [themeCtx.currentTheme, themeColors?.primary]);

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' }
  ] as Array<{ key: PeriodKey; label: string }>;

  const lineColorOpacity = selectedMetric === 'downloads' ? 0.85 : 1;
  const gridColor = isDark ? '#374151' : '#E5E7EB';
  const textColor = isDark ? '#FFFFFF' : '#374151';

  // Usar dados reais para downloads e visitas; visitas com fallback para mocks
  const currentData = selectedMetric === 'downloads'
    ? (downloadsData[selectedPeriod] || [])
    : ((visitsData[selectedPeriod] && visitsData[selectedPeriod].length > 0)
      ? visitsData[selectedPeriod]
      : visitsDataByPeriod[selectedPeriod]);
  const totalCount = currentData.reduce((sum: number, item: { value: number }) => sum + item.value, 0);

  const getBtnClass = (active: boolean) =>
    active
      ? 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]'
      : 'bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]';

  const PROGRESS_WIDTH_CLASSES: Record<number, string> = {
    0: 'w-0', 5: 'w-[5%]', 10: 'w-[10%]', 15: 'w-[15%]', 20: 'w-[20%]', 25: 'w-[25%]', 30: 'w-[30%]', 35: 'w-[35%]', 40: 'w-[40%]', 45: 'w-[45%]', 50: 'w-[50%]', 55: 'w-[55%]', 60: 'w-[60%]', 65: 'w-[65%]', 70: 'w-[70%]', 75: 'w-[75%]', 80: 'w-[80%]', 85: 'w-[85%]', 90: 'w-[90%]', 95: 'w-[95%]', 100: 'w-[100%]'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Line Chart */}
      <AnimatedBorderCard className="lg:col-span-8">
        <Card className="animate-fade-in-up shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-900 dark:text-white">
                {selectedMetric === 'visits' ? 'Visitas' : 'Downloads'} por {periods.find(p => p.key === selectedPeriod)?.label}
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({totalCount.toLocaleString()} total)</span>
              </CardTitle>
              <div className="flex space-x-2">
                {periods.map((period) => (
                  <Button
                    key={period.key}
                    variant={selectedPeriod === period.key ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.key)}
                    className={getBtnClass(selectedPeriod === period.key)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: textColor, fontSize: 12 }}
                  angle={selectedPeriod === 'week' ? -45 : 0}
                  textAnchor={selectedPeriod === 'week' ? 'end' : 'middle'}
                  height={selectedPeriod === 'week' ? 60 : 30}
                />
                <YAxis tick={{ fill: textColor }} />
                <Tooltip content={(props: any) => {
                  const { active, payload, label } = props;
                  if (active && payload && payload.length) {
                    const val = payload[0]?.value;
                    return (
                      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-md">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{typeof val === 'number' || typeof val === 'string' ? val : 0}</div>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  strokeOpacity={lineColorOpacity}
                  dot={{ fill: lineColor, fillOpacity: lineColorOpacity, stroke: lineColor, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: lineColor, fillOpacity: lineColorOpacity, stroke: lineColor, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Metric Toggle Buttons */}
            <div className="flex justify-center space-x-2 mt-4">
              <Button
                variant={selectedMetric === 'visits' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('visits')}
                className={getBtnClass(selectedMetric === 'visits')}
              >
                Visitas
              </Button>
              <Button
                variant={selectedMetric === 'downloads' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('downloads')}
                className={getBtnClass(selectedMetric === 'downloads') + ' opacity-90'}
              >
                Downloads
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedBorderCard>

      {/* Progress Bars */}
      <AnimatedBorderCard className="lg:col-span-4">
        <Card className="animate-fade-in-up shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Downloads por Categoria</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">Categorias mais acessadas este mês</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingCategories ? (
              <div className="text-center text-gray-500 dark:text-gray-400">Carregando...</div>
            ) : categoryData.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">Nenhum download registrado</div>
            ) : (
              categoryData.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                    <span className="text-gray-900 dark:text-white">{item.percentage}%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    {(() => {
                      const normalized = Math.min(100, Math.max(0, Math.round(item.percentage / 5) * 5));
                      const widthClass = PROGRESS_WIDTH_CLASSES[normalized] ?? PROGRESS_WIDTH_CLASSES[100];
                      return (
                        <div
                          className={cn('h-full transition-all duration-300 ease-out rounded-full bg-[var(--primary)]', widthClass)}
                          aria-hidden
                        />
                      );
                    })()}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </AnimatedBorderCard>
    </div>
  );
}
