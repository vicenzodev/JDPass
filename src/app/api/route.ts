import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers';

export const GET = async () => {
    
    try{
        
        const userId = (await headers()).get('x-user-id');
        const userEmail = (await headers()).get('x-user-email');
        
        if(!userId || !userEmail) throw new Error('Não autorizado pelo middleware');

        return NextResponse.json({
            message:'Autorizado com sucesso'
        },{status:200});
    }catch(e: any){
        return NextResponse.json({
            error: e
            },{status: 500});
    }
}

export const POST = async () => {
    try{

    }catch(e: any){

    }
}