import { getAllLogs, getLogById } from "@/services/logs-service";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req:NextRequest) =>{
    const body = await req.json();
    try{
        let log;
        if(body.id != null) log = getLogById(body.id);
        else log = getAllLogs();
        return NextResponse.json({logs:log},{status:200});
    }catch(error){
        return NextResponse.json({error},{status:500});
    }
}