"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function PageTemplate({ routerBack, title, children }: { routerBack?: string, title: string, children: ReactNode}) {
    const router = useRouter();

    return (
        <div className="px-8 py-4 min-h-screen bg-background text-foreground transition-colors duration-300">
            
            <header className="flex gap-4 items-center justify-start mb-4">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => routerBack ? router.replace(routerBack) : router.back()}
                    className="py-2 px-3 bg-card border border-border rounded-xl shadow-sm cursor-pointer text-foreground hover:bg-background/80 transition-colors"
                >
                    <FaArrowLeft size={22} />
                </motion.button>
                
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            </header>
            
            {children}
        </div>
    )
}