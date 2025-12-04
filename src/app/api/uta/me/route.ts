import { NextRequest, NextResponse } from "next/server";
import { findUtaById, listUta, updateUta } from "@/services/uta-service";
import { getUserSession } from "@/services/auth";
import { createLog } from "@/services/logs-service";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Faça login para continuar");

    const id = Number(session.id);

    if (id) {
      const uta = await findUtaById(id);
      if (!uta) throw new Error("Usuário não encontrado");

      return NextResponse.json(uta, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Não autorizado");

    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) throw new Error("ID não informado");

    const body = await req.json();

    const updated = await updateUta(id, {
      usuario: body.usuario,
      email: body.email,
      senha: body.senha,
      cargo: body.cargo
    });

    if (!updated) throw new Error("Não foi possível atualizar o usuário");

    createLog({
        event: "Usuário atualizado com sucesso!",
        status:"200",
        date:new Date(),
        utaId: session.id
    });
    return NextResponse.json(
      { message: "Usuário atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    const logId = (await getUserSession())?.id || 0;

    createLog({
        event: JSON.stringify(error),
        status:"500",
        date:new Date(),
        utaId: logId,
    });
    return NextResponse.json({ error }, { status: 500 });
  }
};