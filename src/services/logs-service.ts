import { PrismaClient } from '../generated/prisma/client';

interface ILogs{
    id:number,
    Logser:string,
    email:string,
    password:string,
    cargo:number
}

const prisma = new PrismaClient();

export const createLogs = async (data:ILogs): Promise<ILogs> =>{
    //TODO: validações para a adição de Logsuários de acesso
    const Logs = await prisma.Logs.create({data:data});
    return Logs;
}

export const getAllLogss = async (): Promise<ILogs[]> =>{
    const Logs = await prisma.Logs.findMany();
    return Logs;
}

export const getLogsById = async (id:number): Promise<ILogs[]> =>{
    const Logs = await prisma.Logs.findUnique({where:{id: id}});
    return Logs;
}

export const deleteLogs = async (id:number): Promise<ILogs[]> =>{
    const LogsToDelete = getLogsById(id);
    return await prisma.Logs.delete({where:{Logs:LogsToDelete}});
}