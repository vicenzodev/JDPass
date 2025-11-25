import { prisma } from "@/utils/prisma"
import bcrypt from 'bcrypt';

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

    const saltRounds = 2;
    const cSenha = await bcrypt.hash(data.senhas,saltRounds);
    const us = await prisma.us.create({
        data:{
            ...data,
            senhas:cSenha
        }
    });

    const {senhas, ...result} = us;
    
    return result;
}

export const getUs = async (utaId:number): Promise<IUs[]> =>{
    const us = await prisma.us.findMany({where:{utaId:utaId}});
    if(!us) throw new Error("Nenhum usuário de sistema encontrado");
    return us;
}