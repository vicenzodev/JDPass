import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUta{
    usuario:string,
    email:string,
    senha:string,
    cargo:number
}

interface ILogin{
    email:string,
    senha:string
}

export const createUta = async (data:IUta): Promise<Omit<IUta, 'senha'>> =>{
    if(!data.senha) throw new Error("O campo SENHA é obrigatório**");

    const saltRounds = 2;
    const cSenha = await bcrypt.hash(data.senha,saltRounds);
    const uta = await prisma.uta.create({
        data:{
            ...data,
            senha:cSenha
        }
    });

    const {senha, ...result} = uta;
    
    return result;
}

export const loginUta = async (data:ILogin) =>{
    const uta = await prisma.uta.findFirst({
        where: {email: data.email},
    });
    
    if(!uta) throw new Error("Credenciais inválidas");

    const isPasswordValid = await bcrypt.compare(data.senha,uta.senha);
    if(!isPasswordValid) throw new Error("Credenciais inválidas");

    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("A chave secreta JWT_SECRET não está configurada no .env");
    
    const payload = {
        id: uta.id,
        email: uta.email,
        cargo: uta.cargo,
    }

    const token = jwt.sign(
        payload,
        secret,
        {expiresIn:'1h'}
    );

    return {token};
}

export const listUta = async (currentUserId: number) => {
    const uta = await prisma.uta.findMany({
        where: {
            id: {
                not: currentUserId
            }
        }
    });
    
    if(!uta) throw new Error("Nenhum usuário de sistema encontrado");

    const result = uta.map(({ senha, ...rest }) => rest);
    return result;
}

export const findUtaById = async (id:number) =>{
    const uta = await prisma.uta.findFirst({where:{id:id}});
    if(!uta) throw new Error("Usuário não encontrado");

    const {senha, ...result} = uta;
    return result;
}

export const updateUta = async (id: number, data: Partial<IUta>) => {
    const uta = await prisma.uta.findFirst({ where: { id } });
    if (!uta) throw new Error("Usuário não encontrado");

    let newData = { ...data };

    if (data.senha) {
        const saltRounds = 2;
        const cSenha = await bcrypt.hash(data.senha, saltRounds);
        newData.senha = cSenha;
    } else {
        delete newData.senha;
    }

    const updated = await prisma.uta.update({
        where: { id },
        data: newData,
    });
    const { senha, ...result } = updated;
    return result;
};


export const deleteUta = async (id:number): Promise<IUta> =>{
    const uta = await prisma.uta.delete({where:{id:id}});
    return uta;
}