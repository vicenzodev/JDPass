import { NextResponse, NextRequest } from "next/server";
import { allUsers, loginUta } from "@/services/uta-service";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

export const POST = async (req:NextRequest) => {
    const prisma = PrismaClient();
    try{
        // const body = await req.json();
        // const {token} = await loginUta({
        //     email: body.email,
        //     senha: body.senha
        // });

        // (await cookies()).set('session_token',token , {
        //     httpOnly: true,
        //     maxAge: 60*60*24,
        //     path: '/',
        //     sameSite: 'lax'
        // });
        

        return NextResponse.json({message:'Login bem sucedido'},{status:200});
    }catch(e: any){
        return NextResponse.json({
            error: e
            },{status: 500});
    }
}