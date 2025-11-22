'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar/sidebar';
import { ReactNode } from 'react';
import { LayoutProvider, useLayout } from './layoutContext';
import { motion } from 'framer-motion';

function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  const { sidebarOpen } = useLayout();

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}

      <motion.main
        initial={false}
        animate={{ marginLeft: !isLoginPage ? (sidebarOpen ? 300 : 80) : 0 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 min-h-screen flex flex-col transition-all ${!isLoginPage ? (sidebarOpen ? "ml-[300px]" : "ml-[80px]") : ""}`}
      >
        {children}
      </motion.main>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <LayoutContent>{children}</LayoutContent>
    </LayoutProvider>
  );
}
