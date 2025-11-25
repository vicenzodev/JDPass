import { criptografarSenha, descriptografarSenha } from "@/utils/crypto";
import { prisma } from "@/utils/prisma"
interface IUs{
    sistema:string,
    usuario:string,
    senhas:string,
    last_senha:string,
    last_change:Date,
    exp_date:Date,
    ambiente:string,
    obs:string,
    utaId:number
}


export const createUs = async (data:IUs): Promise<Omit<IUs,'senhas'>> =>{
    if(!data.senhas) throw new Error("O campo SENHA é obrigatório**");

    const cSenha = await criptografarSenha(data.senhas);
    const us = await prisma.us.create({
        data:{
            ...data,
            senhas:cSenha
        }
    });

    const {senhas, ...result} = us;
    
    return result;
}

export const getUs = async (utaId:number) =>{
    const us = await prisma.us.findMany({where:{utaId:utaId}});
    if(!us) throw new Error("Nenhum usuário de sistema encontrado :(");
    let usNoPassword = [];
    for(const data of us){
        const {senhas, ...result} = data;
        usNoPassword.push(result);
    }
    return usNoPassword;
}

export const getUsSenha = async (utaId:number,usId:number)=>{
    const us = await prisma.us.findFirst({where:{id:usId,utaId:utaId}});
    if(!us) return '';
    const senha = await descriptografarSenha(us.senhas);
    return senha;
}

export const updateUsSenha = async (utaId:number,usId:number,senha:string,lastSenha:string) =>{
    const us = await prisma.us.update({
        where:{
            id:usId,
            utaId:utaId
        },
        data:{
            senhas: criptografarSenha(senha),
            last_senha: criptografarSenha(lastSenha)
        }
    });
    return us;
}

export const verifyExpDate = async () =>{
    const us = prisma.us.findMany({
        where:{
            exp_date:{lt:new Date()}
        }
    });
    if(!us) throw new Error("Nenhum usuário de sistema encontrado :(");
    return us;
}