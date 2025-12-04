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

export const getUs = async (utaCargo: number) => {
    const us = await prisma.us.findMany({
        where: {
            uta: {
                cargo: {
                    lte: utaCargo
                }
            }
        }
    });

    if (!us || us.length === 0) {
        throw new Error("Nenhum usuário de sistema encontrado :(");
    }

    const usNoPassword = us.map((data) => {
        const { senhas, ...result } = data;
        return result;
    });

    return usNoPassword;
};

export const getUsById = async (id: number) => {
    const us = await prisma.us.findFirst({
        where: { id }
    });

    if (!us) return null;

    const senha = us.senhas ? await descriptografarSenha(us.senhas) : "";

    const lastSenha = us.last_senha ? await descriptografarSenha(us.last_senha) : "";

    return {
        ...us,
        senhas: senha,
        last_senha: lastSenha,
    };
};

export const getUsSenha = async (utaId:number,usId:number)=>{
    const us = await prisma.us.findFirst({where:{id:usId,utaId:utaId}});
    if(!us) return '';
    const senha = await descriptografarSenha(us.senhas);
    return senha;
}

export const updateUs = async (usId: number, data:IUs) => {
    const cSenha = await criptografarSenha(data.senhas);
    const lSenha = await criptografarSenha(data.last_senha);
    const us = await prisma.us.update({
        where: {
            id: usId,
        },
        data: {
            ...data,
            senhas: cSenha,
            last_senha: lSenha,
        }
    })
    return us;
}

export const updateUsSenha = async (utaId:number,usId:number,senha:string,lastSenha:string) =>{
    let newExpDate = new Date();
    newExpDate.setMonth(newExpDate.getMonth()+1);
    const us = await prisma.us.update({
        where:{
            id:usId,
            utaId:utaId
        },
        data:{
            senhas: criptografarSenha(senha),
            last_senha: criptografarSenha(lastSenha),
            exp_date: newExpDate,
            last_change: new Date()
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

export const deleteUs = async (id: number) => {
    const us = prisma.us.delete({ where: { id } });

    return us;
}