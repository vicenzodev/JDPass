'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { navItems } from './options';
import Link from 'next/link';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useLayout } from '../layout/layoutContext';
import { useState } from 'react';

export default function Sidebar() {
  const { sidebarOpen: open, toggleSidebar } = useLayout();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 300 : 60 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen flex flex-col bg-green-900 backdrop-blur-lg border-r border-white/10 shadow-[0_0_30px_rgba(0,255,0,0.05)] text-white"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          {open && (
            <>
              <motion.img
                src="/logo-john-deere.png"
                alt="John Deere"
                className="w-8 h-8"
                whileHover={{ rotate: 10 }}
              />
              <span className="font-bold text-lg text-white tracking-wide hover:text-green-400 transition">
                John Deere Pass
              </span>
            </>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-green-400 transition cursor-pointer"
        >
          <FaChevronRight
            className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-5">
        {navItems.map((item) => (
          <div key={item.label} className="mb-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full text-left text-md font-medium
                  px-3 py-2 rounded-lg hover:bg-white/10 hover:text-green-300 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {<item.icon size={22} className="text-green-400" />}
                    {open && <span>{item.label}</span>}
                  </div>
                  {open && (
                    <FaChevronRight
                      className={`w-4 h-4 text-gray-300 transition-transform ${
                        activeMenu === item.label ? 'rotate-90' : 'rotate-0'
                      }`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeMenu === item.label && open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-10 mt-1 space-y-1"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-md text-gray-300 hover:text-green-300 hover:bg-white/10 px-2 py-1 rounded-md transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href ?? '#'}
                className="flex items-center gap-3 text-md font-medium 
                px-3 py-2 rounded-lg hover:bg-white/10 hover:text-green-300 transition"
              >
                {<item.icon size={22} className="text-green-400" />}
                {open && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
        <hr className="my-3 text-gray-400" />
        <Link
          href={'/'}
          className="flex items-center gap-3 text-md font-medium 
          px-3 py-2 rounded-lg hover:bg-white/10 hover:text-green-300 transition"
        >
          {<RiLogoutBoxRLine size={22} className="text-green-400" />}
          {open && <span>Log out</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 text-xs text-gray-400">
        {open ? '© 2025 John Deere. Todos os direitos reservados' : '© JD'}
      </div>
    </motion.aside>
  );
}
