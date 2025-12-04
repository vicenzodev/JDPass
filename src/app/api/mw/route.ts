import { getUserSession } from "@/services/auth";
import { NextResponse } from "next/server";

export const GET = async () =>{
    const user = await getUserSession();
    if(!user) return NextResponse.json({error:'Não autorizado'},{status:401});

    try{
        const data = {
            id:user.id,
            email:user.email,
            cargo:user.cargo
        };

        return NextResponse.json(data);
    }catch(e:any){
        return NextResponse.json({error:'Token inválido'},{status:401});
    }
}