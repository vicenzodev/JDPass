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

        (await cookies()).set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
            sameSite: 'lax'
        });

        const session = await getUserSession();
        if(!session) throw new Error("Não foi possível criar a sessão do usuário");

        await createLog({
            event:"Usuário acessado com sucesso",
            status:"200",
            date:new Date(),
            utaId: session.id
        });

        return NextResponse.json(
            {message:'Login bem sucedido'},
            {status:200}
        );
    }catch(error){
        const message = error instanceof Error ? error.message : 'Erro inesperado';
        const status = message === 'Credenciais inválidas' ? 401 : 500;

        console.error('Falha no login:', message);

        return NextResponse.json(
            {error: status === 401 ? 'Credenciais inválidas' : 'Erro interno ao realizar login'},
            {status}
        );
    }
}