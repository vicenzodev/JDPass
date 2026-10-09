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

export const getAllLogs = async () =>{
    return prisma.logs.findMany({
        orderBy: {
            date: 'desc'
        },
        include: {
            uta: {
                select: {
                    id: true,
                    usuario: true,
                    email: true,
                    cargo: true
                }
            },
        },
    });
}

export const getLogById = async (id:number) =>{
    return prisma.logs.findUnique({
        where:{id: id},
        include: {
            uta: {
                select: {
                    id: true,
                    usuario: true,
                    email: true,
                    cargo: true
                }
            }
        }
    });
}