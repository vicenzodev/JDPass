import { IDashboardData } from "@/app/dashboard/type";
import { prisma } from "@/utils/prisma";

export const getDashboardData = async (userId: number, cargo: number): Promise<IDashboardData> => {
    const globalFilter = {
        uta: {
            cargo: { lte: cargo }
        }
    };

    const hoje = new Date();
    const proximaSemana = new Date(hoje);
    proximaSemana.setDate(hoje.getDate() + 7);
    const semanaPassada = new Date();
    semanaPassada.setDate(semanaPassada.getDate() - 6);

    const [
        totalSenhas,
        senhasVencidas,
        alertasSeguranca,
        senhasAVencer,
        logsRecentes,
        expiracoesFuturas,
        rawSenhasSemana, 
        dadosDistribuicao
    ] = await Promise.all([
        prisma.us.count({ where: globalFilter }),
        prisma.us.count({ where: { ...globalFilter, exp_date: { lt: hoje } } }),
        prisma.logs.count({ where: { ...globalFilter, OR: [{ status: 'ERROR' }, { status: 'ACCESS_DENIED' }] } }),
        prisma.us.count({ where: { ...globalFilter, exp_date: { gte: hoje, lte: proximaSemana } } }),
        
        prisma.logs.findMany({
            where: globalFilter,
            take: 3,
            orderBy: { date: 'desc' },
            include: { uta: { select: { usuario: true } } }
        }),

        prisma.us.findMany({
            where: { ...globalFilter, exp_date: { gt: hoje } },
            orderBy: { exp_date: 'asc' },
            take: 3,
            select: { sistema: true, usuario: true, exp_date: true }
        }),

        prisma.us.findMany({
            where: { ...globalFilter, last_change: { gte: semanaPassada } },
            select: { last_change: true }
        }),

        prisma.us.groupBy({
            by: ['sistema'],
            where: globalFilter,
            _count: { sistema: true },
            orderBy: { _count: { sistema: 'desc' } },
            take: 5
        })
    ]);

    const getBrazilDateKey = (date: Date) => {
        return date.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
    };

    const mapaSemanal = new Map<string, number>();

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = getBrazilDateKey(d); 
        mapaSemanal.set(key, 0);
    }

    rawSenhasSemana.forEach(item => {
        if (item.last_change) {
            const key = getBrazilDateKey(new Date(item.last_change));
            
            if (mapaSemanal.has(key)) {
                mapaSemanal.set(key, (mapaSemanal.get(key) || 0) + 1);
            }
        }
    });

    const graficoFormatado = Array.from(mapaSemanal).map(([dateString, count]) => ({
        date: dateString,
        count: count
    }));

    const distribuicaoFormatada = dadosDistribuicao.map(item => ({
        sistema: item.sistema,
        count: item._count.sistema
    }));

    return {
        kpis: {
            ativas: totalSenhas,
            aVencer: senhasAVencer,
            vencidas: senhasVencidas,
            alertas: alertasSeguranca
        },
        listas: {
            atividadesRecentes: logsRecentes,
            proximasExpiracoes: expiracoesFuturas
        },
        graficos: {
            semanal: graficoFormatado,
            distribuicao: distribuicaoFormatada
        }
    };
}