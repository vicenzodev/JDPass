import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/services/auth";
import { createUs, deleteUs, getUs, getUsById, getUsSenha, updateUs } from "@/services/us-service";

export const POST = async (req:NextRequest) => {

    try{
        const id = await getUserSession();
        if(!id) throw new Error("Não autorizado");

        const body = await req.json();
        const last_change = new Date();
        const us = await createUs({
            sistema:body.sistema,
            usuario:body.usuario,
            senhas:body.senhas,
            last_senha:'',
            last_change:last_change,
            exp_date:body.exp_date,
            ambiente:body.ambiente,
            obs:body.obs,
            utaId:id.id
        });

        if(!us) throw new Error("Não foi possível criar o usuário");

        return NextResponse.json({
            message:'Usuário criado com sucesso!'
        },{status:200});
    }catch(error){
        return NextResponse.json({
            error
        },{status: 500});
    }
}

export const GET = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { error: "Faça login para continuar" },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const idParam = searchParams.get("id");

    if (idParam) {
      const usId = Number(idParam);

      if (isNaN(usId)) {
        return NextResponse.json(
          { error: "ID inválido" },
          { status: 400 }
        );
      }

      const us = await getUsById(usId, session.id);

      if (!us) {
        return NextResponse.json(
          { error: "Registro não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(us, { status: 200 });
    }

    const usList = await getUs(session.id);
    return NextResponse.json(usList, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Faça login para continuar");

    const searchParams = req.nextUrl.searchParams;
    const usId = Number(searchParams.get("id"));

    if (!usId) {
      return NextResponse.json(
        { error: "ID do registro é obrigatório" },
        { status: 400 }
      );
    }

    const existing = await getUsSenha(session.id, usId);

    const body = await req.json();

    const last_change = new Date();

    const lastSenha = existing;

    const us = await updateUs(usId, {
        sistema: body.sistema,
        usuario: body.usuario,
        senhas: body.senhas,
        last_senha: lastSenha,
        last_change: last_change,
        exp_date: body.exp_date,
        ambiente: body.ambiente,
        obs: body.obs,
        utaId: session.id,
    });

    if (!us) {
      return NextResponse.json(
        { error: "Não foi possível atualizar o registro" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        { error: "Faça login para continuar" },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "ID do registro é obrigatório" },
        { status: 400 }
      );
    }

    const usId = Number(idParam);

    if (isNaN(usId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const existing = await getUsById(usId, session.id);
    if (!existing) {
      return NextResponse.json(
        { error: "Registro não encontrado ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    const deleted = await deleteUs(usId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Não foi possível excluir o registro" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Excluído com sucesso!" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

