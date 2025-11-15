import { NextResponse, NextRequest } from "next/server";
import { loginUta, createUta } from "@/services/uta-service";

export const POST = async (req:NextRequest) => {
    
    try{
        const body = await req.json();

        const token = await loginUta({
            email: body.email,
            senha: body.senha
        });
        
        return NextResponse.json({
            message:'Login realizado com sucesso!',
            token
        },{status:200});
    }catch(e: any){
        return NextResponse.json({
            error: e
            },{status: 500});
    }
}