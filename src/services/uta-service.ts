import { PrismaClient } from '@prisma/client';

interface IUta{
    id:number,
    user:string,
    email:string,
    password:string,
    cargo:number
}

const prisma = new PrismaClient();

export const createUta = async (data:IUta): Promise<IUta> =>{
    //TODO: validações para a adição de usuários de acesso
    const uta = await prisma.uta.create({data:data});
    return uta;
}

export const getAllUtas = async (): Promise<IUta[]> =>{
    const utas = await prisma.uta.findMany();
    return utas;
}

export const getUtaById = async (id:number): Promise<IUta[]> =>{
    const uta = await prisma.uta.findUnique({where:{id: id}});
    return uta;
}

export const deleteUta = async (id:number): Promise<IUta[]> =>{
    const utaToDelete = getUtaById(id);
    return await prisma.uta.delete({where:{uta:utaToDelete}});
}