import { NextResponse, NextRequest } from "next/server";
import * as jose from 'jose';

export const middleware = async (req:NextRequest) =>{
    const publicRoutes = [
        '/api/login'
    ];

    const path = req.nextUrl.pathname;
    if(publicRoutes.includes(path))
        return NextResponse.next();

    const authHeader = req.headers.get('authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return new NextResponse(
            JSON.stringify({message:'Acesso negado. Token não fornecido ou mal formatado.'}),
            {status:401,headers:{'Content-Type':'application/json'}}
        );
    }

    const token = authHeader.split(' ')[1];

    const secret = process.env.JWT_SECRET;
    if(!secret){
        console.error("JWT_SECRET não está configurada no .env");
        return new NextResponse(
            JSON.stringify({message:'Erro interdo do servidos.'}),
            {status:500,headers:{'Content-Type':'application/json'}}
        );
    }

    try{
        const secretKey = new TextEncoder().encode(secret);
        const {payload} = await jose.jwtVerify(token, secretKey);
        const headers = new Headers(req.headers);
        headers.set('x-user-id',payload.id as string);
        headers.set('x-user-email',payload.email as string);
    
        return NextResponse.next({request:{headers:headers}});
    }catch(error){
        return new NextResponse(
            JSON.stringify({message:'Token inválido ou expirado.'}),
            {status:401,headers:{'Content-Type':'application/json'}}
        );
    }
}

export const config = {
    matcher: '/api/:path*'
};