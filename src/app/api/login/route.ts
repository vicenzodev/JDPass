import { NextResponse, NextRequest } from "next/server";
import { loginUta } from "@/services/uta-service";
import { cookies } from "next/headers";
import { createLog } from "@/services/logs-service";
import { getUserSession } from "@/services/auth";

export const POST = async (req:NextRequest) => {
    try{
        const body = await req.json();
        const {token} = await loginUta({
            email: body.email,
            senha: body.senha
        });

        (await cookies()).set('session_token',token , {
            httpOnly: true,
            maxAge: 60*60*24,
            path: '/',
            sameSite: 'lax'
        });
        
        const utaId = await getUserSession();
        if(!utaId) throw new Error("Não foi reconhecido o usuário");
        createLog({
            event:"Usuário acessado com sucesso",
            status:"200",
            date:new Date(),
            utaId: utaId.id
        });
        return NextResponse.json({message:'Login bem sucedido'},{status:200});
    }catch(error){
        createLog({
            event:JSON.stringify(error),
            status:"500",
            date:new Date(),
            utaId: 0
        });
        return NextResponse.json({
            error: error
            },{status: 500});
    }
}