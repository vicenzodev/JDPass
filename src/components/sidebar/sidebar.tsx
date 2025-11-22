'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { navItems } from './options';
import Link from 'next/link';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useLayout } from '../layout/layoutContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { sidebarOpen: open, toggleSidebar } = useLayout();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const parent = navItems.find((item) => {
      if (!item.children) return false;
      const matchChild = item.children.some((child) => child.href === pathname);
      const matchPrefix = pathname.startsWith(item.prefix || '');
      return matchChild || matchPrefix;
    });

    if (parent) {
      setActiveMenu(parent.label);
    } else {
      setActiveMenu(null);
    }
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 300 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen flex flex-col bg-green-900 border-r border-white/10 shadow-[0_0_30px_rgba(0,255,0,0.05)] text-white z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {open && (
          <div className="flex items-center gap-2">
            <motion.img
              src="/logo-john-deere.png"
              alt="John Deere"
              className="w-8 h-8"
              whileHover={{ rotate: 10 }}
            />
            <span className="font-bold text-lg text-white tracking-wide hover:text-green-400 transition">
              John Deere Pass
            </span>
          </div>
        )}

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
          <div key={item.label} className="mb-2">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center w-full text-left text-md font-medium 
                    px-3 py-2 rounded-lg hover:bg-white/10 hover:text-green-300 transition cursor-pointer
                    ${activeMenu === item.label ? 'bg-white/10' : ''}`}
                  title={item.label}
                >
                  <item.icon size={22} className="text-green-400 min-w-[22px]" />
                  {open && <span className="ml-3">{item.label}</span>}
                  <FaChevronRight
                    className={`ml-auto w-4 h-4 text-gray-300 transition-transform ${
                      activeMenu === item.label ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex items-center text-md text-gray-200
                            px-3 py-3 mt-2 rounded-lg hover:bg-white/10 hover:text-green-300 transition
                            ${open ? 'gap-3' : ''} ${
                              pathname === child.href ? 'bg-white/10 text-green-300' : ''
                            }`}
                          title={child.label}
                        >
                          <child.icon size={22} className="text-green-400 min-w-[22px]" />
                          {open && <span>{child.label}</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href ?? '#'}
                className={`flex items-center gap-3 text-base font-medium 
                px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-green-300 transition
                ${pathname === item.href ? 'bg-white/20 text-green-300' : ''}`}
                title={item.label}
              >
                <item.icon size={22} className="text-green-400 min-w-[22px]" />
                {open && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
        <hr className="my-4 text-gray-400" />
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-medium 
          px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-green-300 transition"
        >
          <RiLogoutBoxRLine size={22} className="text-green-400" />
          {open && <span>Log out</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 text-xs text-gray-400">
        {open ? '© 2025 John Deere. Todos os direitos reservados' : '© JD'}
      </div>
    </motion.aside>
  );
}
