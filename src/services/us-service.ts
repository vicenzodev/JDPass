'use client';

import { PrismaClient } from '@prisma/client';

interface IUs{
    id:number,
    user:string,
    email:string,
    password:string,
    cargo:number
}

const prisma = new PrismaClient();

export const createUs = async (data:IUs): Promise<IUs> =>{
    //TODO: validações para a adição de usuários de acesso
    const Us = await prisma.Us.create({data:data});
    return Us;
}

export const getAllUss = async (): Promise<IUs[]> =>{
    const Uss = await prisma.Us.findMany();
    return Uss;
}

export const getUsById = async (id:number): Promise<IUs[]> =>{
    const Us = await prisma.Us.findUnique({where:{id: id}});
    return Us;
}

export const deleteUs = async (id:number): Promise<IUs[]> =>{
    const UsToDelete = getUsById(id);
    return await prisma.Us.delete({where:{Us:UsToDelete}});
}