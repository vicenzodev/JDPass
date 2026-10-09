import { getAllLogs } from "@/services/logs-service";
import { getUserSession } from "@/services/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            );
        }

        const logs = await getAllLogs();

        return NextResponse.json(logs, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar logs:', error);

        return NextResponse.json(
            { error: 'Erro ao buscar logs' },
            { status: 500 }
        );
    }
}