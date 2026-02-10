import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

/**
 * GET /api/dashboard/downloads-timeline
 * Retorna timeline de downloads por período (day, week, month, year)
 */
export async function GET(req: Request) {
  try {
    // Verificar autenticação
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    // Obter período da query string
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'week';

    let data: Array<{ name: string; value: number }> = [];

    switch (period) {
      case 'day': {
        // Últimas 24 horas, agrupado por intervalos de 4h
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const downloads = await prisma.$queryRaw<Array<{ hour: number; downloadCount: bigint }>>`
          SELECT 
            HOUR(createdAt) as hour,
            COUNT(*) as downloadCount
          FROM Download
          WHERE createdAt >= ${twentyFourHoursAgo}
          GROUP BY HOUR(createdAt)
          ORDER BY hour
        `;

        // Criar array com intervalos de 4h
        const intervals = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
        const hourlyData = intervals.map((time) => ({
          name: time,
          value: 0
        }));

        // Agrupar downloads por intervalo de 4h
        downloads.forEach(d => {
          const intervalIndex = Math.floor(Number(d.hour) / 4);
          if (intervalIndex < hourlyData.length) {
            hourlyData[intervalIndex].value += Number(d.downloadCount);
          }
        });

        data = hourlyData;
        break;
      }

      case 'week': {
        // Últimos 7 dias
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const downloads = await prisma.$queryRaw<Array<{ dayOfWeek: number; downloadCount: bigint }>>`
          SELECT 
            DAYOFWEEK(createdAt) as dayOfWeek,
            COUNT(*) as downloadCount
          FROM Download
          WHERE createdAt >= ${sevenDaysAgo}
          GROUP BY DAYOFWEEK(createdAt)
          ORDER BY DAYOFWEEK(createdAt)
        `;

        // MySQL DAYOFWEEK: 1=Domingo, 2=Segunda, ..., 7=Sábado
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const weeklyData = daysOfWeek.map(day => ({ name: day, value: 0 }));

        downloads.forEach(d => {
          const index = Number(d.dayOfWeek) - 1; // Ajustar para índice 0-based
          if (index >= 0 && index < 7) {
            weeklyData[index].value = Number(d.downloadCount);
          }
        });

        data = weeklyData;
        break;
      }

      case 'month': {
        // Últimas 4 semanas
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

        const downloads = await prisma.$queryRaw<Array<{ weekNum: number; downloadCount: bigint }>>`
          SELECT 
            FLOOR(DATEDIFF(NOW(), createdAt) / 7) as weekNum,
            COUNT(*) as downloadCount
          FROM Download
          WHERE createdAt >= ${fourWeeksAgo}
          GROUP BY weekNum
          ORDER BY weekNum DESC
        `;

        const monthlyData = [
          { name: 'Sem 1', value: 0 },
          { name: 'Sem 2', value: 0 },
          { name: 'Sem 3', value: 0 },
          { name: 'Sem 4', value: 0 }
        ];

        downloads.forEach((d, idx) => {
          if (idx < 4) {
            monthlyData[3 - idx].value = Number(d.downloadCount);
          }
        });

        data = monthlyData;
        break;
      }

      case 'year': {
        // Últimos 12 meses
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        const downloads = await prisma.$queryRaw<Array<{ month: number; downloadCount: bigint }>>`
          SELECT 
            MONTH(createdAt) as month,
            COUNT(*) as downloadCount
          FROM Download
          WHERE createdAt >= ${twelveMonthsAgo}
          GROUP BY MONTH(createdAt)
          ORDER BY month
        `;

        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const yearlyData = monthNames.map(month => ({ name: month, value: 0 }));

        downloads.forEach(d => {
          const monthNum = Number(d.month);
          if (monthNum >= 1 && monthNum <= 12) {
            yearlyData[monthNum - 1].value = Number(d.downloadCount);
          }
        });

        data = yearlyData;
        break;
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[API Downloads Timeline] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar timeline de downloads' },
      { status: 500 }
    );
  }
}
