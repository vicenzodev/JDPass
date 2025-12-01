import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/services/auth";
import { createUs, getUs, getUsSenha } from "@/services/us-service";
import { createLog } from "@/services/logs-service";

export const POST = async (req:NextRequest) => {

    try{
        const id = await getUserSession();
        if(!id) throw new Error("Não autorizado");

        const body = await req.json();
        let last_change = new Date();
        last_change.setMonth(last_change.getMonth()+1)
        let exp_date = last_change;
        const us = await createUs({
            sistema:body.sistema,
            usuario:body.usuario,
            senhas:body.senhas,
            last_senha:'',
            last_change:last_change,
            exp_date:exp_date,
            ambiente:body.ambiente,
            obs:body.obs,
            utaId:id.id
        });

        if(!us) throw new Error("Não foi possível criar o usuário");

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

export const GET = async (req:NextRequest) =>{
    try{
        const id = await getUserSession();
        if(!id) throw new Error("Faça login para continuar");
        const body = await req.json();

        const us = await getUs(id.id);
        const senha = await getUsSenha(id.id,body.id);
        return NextResponse.json({us:us,senha:senha},{status:200});
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