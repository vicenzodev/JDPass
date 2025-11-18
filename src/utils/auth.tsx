'use client';
import {useState} from 'react';

export const AuthProvider = () =>{
    const [user,setUser] = useState(null);
    const [isLoading,setLoading] = useState(true);

    const fetchUser = async () =>{
        const token = localStorage.getItem('session_token');
        if(!token){
            setUser(null);
            setLoading(false);
            return;
        }

        try{
            const response = await fetch('api/mw',{
                headers: {'Autorization': `Bearer ${token}`}
            });
            if(!response.ok) throw new Error('Falha ao autenticar');
            
            const userData = await response.json();
            setUser(userData);
        }catch(e:any){
            console.error(e);
        }
    }
}