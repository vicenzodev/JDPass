import { prisma } from "@/utils/prisma";

interface Ilogs{
    event:string,
    status:string,
    date: Date,
    utaId:number
}

export const createLog = async (data:Ilogs): Promise<Ilogs> =>{
    const logs = await prisma.logs.create({data:data});
    return logs;
}

export const getAllLogs = async (): Promise<Ilogs[]> =>{
    const logs = await prisma.logs.findMany();
    return logs;
}

export const getLogById = async (id:number) =>{
    const log = await prisma.logs.findUnique({where:{id: id}});
    return log;
}