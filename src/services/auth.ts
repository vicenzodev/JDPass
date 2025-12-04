import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

export const getUserSession = async () =>{
    const token = (await cookies()).get('session_token')?.value;

    if(!token) return null;

    const secret = process.env.JWT_SECRET;
    if(!secret) return null;

    try{
        const payload = jwt.verify(token, secret) as {id:number; email:string; cargo:number;};
        return payload;
    }catch(e:any){
        return null;
    }
}