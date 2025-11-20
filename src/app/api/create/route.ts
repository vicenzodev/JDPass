import { NextRequest, NextResponse } from "next/server";
import { createUta } from "@/services/uta-service";

export const POST = async (req:NextRequest) => {
    
    try{
        const body = await req.json();
        const uta = await createUta({
            usuario: body.usuario,
            email: body.email,
            senha: body.senha,
            cargo: body.cargo
        });

        if(!uta) throw new Error("Não foi possível criar o usuário");

        return NextResponse.json({
            message:'Usuário criado com sucesso!'
        },{status:200});
    }catch(e: any){
        return NextResponse.json({
            error: e
            },{status: 500});
    }
}