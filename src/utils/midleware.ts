import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";

export const middleware = (req:NextRequest) =>{
    const router = useRouter();
    const token = req.cookies.get('session_token')?.value;

    const {pathname} = req.nextUrl;

    //Verificação de rotas públicas
    const publicRoutes = ['/api/login'];
    const isProtectedRoute = !publicRoutes.some(route=>pathname.startsWith(route));

    //Redirecionamentos
    if(isProtectedRoute && !token) router.replace('/');
    if(pathname === '/' && token) router.replace('/dashboard');

    return NextResponse.next();
}

export const config = {
    matcher:[
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}