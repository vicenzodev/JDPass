import { NextRequest, NextResponse } from "next/server";
import { createUta, deleteUta, findUtaById, listUta, updateUta } from "@/services/uta-service";
import { getUserSession } from "@/services/auth";
import { createLog } from "@/services/logs-service";

export const POST = async (req:NextRequest) => {
    const cargoToCreateUta = 3;

    try{
        const id = await getUserSession();
        if(!id) throw new Error("Não autorizado");
        const user = await findUtaById(id.id)
        
        if(user.cargo < cargoToCreateUta) throw new Error("Não autorizado :(");

        const body = await req.json();
        const uta = await createUta({
            usuario: body.usuario,
            email: body.email,
            senha: body.senha,
            cargo: body.cargo
        });

        if(!uta) throw new Error("Não foi possível criar o usuário");

        createLog({
            event: "Usuário criado com sucesso!",
            status:"200",
            date:new Date(),
            utaId: id.id
        });

        return NextResponse.json({
            message:'Usuário criado com sucesso!'
        },{status:200});
    }catch(error){
        createLog({
            event: JSON.stringify(error),
            status:"500",
            date:new Date(),
            utaId: 0
        });

        return NextResponse.json({
            error
            },{status: 500});
    }
}

export const GET = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Faça login para continuar");

    const id = Number(req.nextUrl.searchParams.get("id"));

    if (id) {
      const uta = await findUtaById(id);
      if (!uta) throw new Error("Usuário não encontrado");

      createLog({
          event: "Usuário encontrado com sucesso",
          status:"200",
          date:new Date(),
          utaId: session.id
      });
      return NextResponse.json(uta, { status: 200 });
    }

    const utaList = await listUta();
    return NextResponse.json(utaList, { status: 200 });
  } catch (error) {
    createLog({
        event: JSON.stringify(error),
        status:"500",
        date:new Date(),
        utaId: 0
    });
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const cargoToUpdateUta = 3;

  try {
    const session = await getUserSession();
    if (!session) throw new Error("Não autorizado");

    const requester = await findUtaById(session.id);
    if (requester.cargo < cargoToUpdateUta)
      throw new Error("Não autorizado :(");

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
    createLog({
        event: JSON.stringify(error),
        status:"500",
        date:new Date(),
        utaId: 0
    });
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Faça login");

    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) throw new Error("ID é obrigatório");

    await deleteUta(id);

    createLog({
        event: "Removido com sucesso",
        status:"200",
        date:new Date(),
        utaId: session.id
    });
    return NextResponse.json({ message: "Removido com sucesso" });
  } catch (error: any) {
    createLog({
        event: JSON.stringify(error),
        status:"500",
        date:new Date(),
        utaId: 0
    });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};