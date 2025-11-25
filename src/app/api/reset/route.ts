import { getUsSenha, updateUsSenha, verifyExpDate } from '@/services/us-service';
import pass from 'generate-password';
import { getUserSession } from "@/services/auth";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req:NextRequest) =>{
    
    try{
        const id = await getUserSession();
        if(!id) throw new Error("Não autorizado");

        const usersToReset = await verifyExpDate();
        for(const user of usersToReset){
            const senha = pass.generate({
                length: 16,
                numbers: true,
                symbols: true,
                uppercase: true,
                excludeSimilarCharacters: true,
                strict: true
            });
            const lastSenha = await getUsSenha(id.id,user.id);
            updateUsSenha(id.id,user.id,senha,lastSenha);
        }
        return NextResponse.json({message:'Senhas expiradas alteradas com sucesso'},{status:200});
    }catch(error){
        
    }
}