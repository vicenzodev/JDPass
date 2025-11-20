import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

export const GET = async () =>{
    const token = (await cookies()).get('session_token')?.value;

    if(!token) return NextResponse.json({error: 'Não autorizado'},{status:401});

    const secret = process.env.JWT_SECRET;
    if(!secret) return NextResponse.json({error: 'Chave secreta não configurada'},{status:500});

    try{
        const payload = jwt.verify(token, secret) as {id:string; email:string;};
        return NextResponse.json({id:payload.id, email:payload.email});
    }catch(e:any){
        return NextResponse.json({error:'Token inválido'},{status:401});
    }
}