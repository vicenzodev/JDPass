'use client';

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode
} from 'react';
import {useRouter} from 'next/navigation';
import { Loading } from '../components/loading';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) =>{
    const [user,setUser] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const router = useRouter();

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
            setUser(null);
            localStorage.removeItem('session_token');
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchUser();
        if(!isLoading && !user)
            router.push('/');
    },[user,isLoading,router]);

    const login = async (token:string) =>{
        localStorage.setItem('session_token', token);
        await fetchUser();
    }

    const logout = () =>{
        localStorage.removeItem('session_token');
        setUser(null);
    }
    if(isLoading)
        return <Loading/>
    else{
        return (
            <AuthContext.Provider value={{user,isLoading,login,logout}}>
                {children}
            </AuthContext.Provider>
        );
    }
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}