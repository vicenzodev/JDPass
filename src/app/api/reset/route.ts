import { getUs, getUsSenha, updateUsSenha, verifyExpDate } from '@/services/us-service';
import { findUtaById } from '@/services/uta-service';
import pass from 'generate-password';
import { getUserSession } from "@/services/auth";
import { NextResponse, NextRequest } from "next/server";
import { createLog } from '@/services/logs-service';

//GET para resetar todas as senhas expiradas
export const GET = async (req:NextRequest) =>{
    const cargoToResetPasswords = 3;
    
    try{
        const id = await getUserSession();
        if (!id) throw new Error("Não autorizado");
        const userCargo = await findUtaById(id.id);
        
        if (userCargo.cargo < cargoToResetPasswords) {
            createLog({
                event: JSON.stringify("Tentativa de reset de senha negado"),
                status:"401",
                date:new Date(),
                utaId: 0
            });

            return NextResponse.json({error: "Você não possui autorização para isso."},{status: 500});
        }

        const usersToReset = await verifyExpDate();
        for(const user of usersToReset){
            const novaSenha = pass.generate({
                length: 16,
                numbers: true,
                symbols: true,
                uppercase: true,
                excludeSimilarCharacters: true,
                strict: true
            });
            const lastSenha = await getUsSenha(id.id,user.id);
            updateUsSenha(id.id,user.id,novaSenha,lastSenha);
        }

        createLog({
            event:"Senhas expiradas alteradas com sucesso",
            status:"200",
            date:new Date(),
            utaId: id.id
        });

        return NextResponse.json({message:'Senhas expiradas alteradas com sucesso'},{status:200});
    }catch(error){
        createLog({
            event: JSON.stringify(error),
            status:"500",
            date:new Date(),
            utaId: 0
        });

        return NextResponse.json({error});
    }
}

//POST para enviar a senha a ser resetada e resetá-la independentemente da data
export const POST = async (req:NextRequest) =>{
    try{
        const id = await getUserSession();
        if(!id) throw new Error("Não autorizado");
        const body = await req.json();
        const usSenha = await getUsSenha(body.id,id.id);
        const novaSenha = pass.generate({
            length: 16,
            numbers: true,
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true,
            strict: true
        });
        updateUsSenha(id.id,body.id,novaSenha,usSenha);

        createLog({
            event:"Senha alterada com sucesso",
            status:"200",
            date:new Date(),
            utaId: id.id
        });

        return NextResponse.json({message:'Senha alterada com sucesso!'},{status:200});
    }catch(error){
        createLog({
            event: JSON.stringify(error),
            status:"500",
            date:new Date(),
            utaId: 0
        });

        return NextResponse.json({error},{status:500});
    }
}
