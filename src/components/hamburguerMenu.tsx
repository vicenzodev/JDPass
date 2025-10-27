"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { MdDarkMode } from "react-icons/md";
import { AiFillSound } from "react-icons/ai";

export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3 flex flex-col items-end space-y-3"
          >
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.05 }}
              className="flex gap-2 items-center"
            >
              <span className="bg-white text-green-600 px-4 py-2 rounded shadow-md hover:bg-green-50 transition">
                Modo Noturno
              </span>
              <button
                onClick={() => alert("Modo Noturno ativado")}
                className="bg-white text-green-600 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-green-50 transition cursor-pointer mr-[5px]"
              >
                <MdDarkMode size={22} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2 items-center"
            >
              <span className="bg-white text-green-600 px-4 py-2 rounded shadow-md hover:bg-green-50 transition">
                TalkBack
              </span>
              <button
                onClick={() => alert("Talk Through ativado")}
                className="bg-white text-green-600 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-green-50 transition cursor-pointer mr-[5px]"
              >
                <AiFillSound size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-white text-green-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition cursor-pointer"
      >
        {menuOpen ? <HiOutlineX size={25} /> : <HiOutlineMenu size={25} />}
      </motion.button>
    </div>
  );
}
