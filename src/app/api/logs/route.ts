import { getAllLogs, getLogById } from "@/services/logs-service";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const log = await getAllLogs();

        return NextResponse.json(log, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao buscar logs' }, { status: 500 });
    }
}