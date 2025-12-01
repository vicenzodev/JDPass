import { NextRequest, NextResponse } from "next/server";
import { createUta, findUtaById, listUta } from "@/services/uta-service";
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

export const GET = async () =>{
    try{
        const id = await getUserSession();
        if(!id) throw new Error("Faça login para continuar");

        const uta = await listUta();

        createLog({
            event: "Usuário criado com sucesso!",
            status:"200",
            date:new Date(),
            utaId: id.id
        });

        return NextResponse.json(uta,{status:200});
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