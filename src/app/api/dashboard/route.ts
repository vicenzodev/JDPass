import { NextResponse, NextRequest } from "next/server";
import { getDashboardData } from "@/services/dashboard-service";
import { getUserSession } from "@/services/auth";

export const GET = async (req: NextRequest) => {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const userId = session.id;
        const userCargo = session.cargo ?? 0; 

        const dashboardData = await getDashboardData(userId, userCargo);

        return NextResponse.json(dashboardData, { status: 200 });

    } catch (error) {
        console.error("Erro no dashboard:", error);
        return NextResponse.json({ error: 'Erro ao carregar dados do dashboard' }, { status: 500 });
    }
}