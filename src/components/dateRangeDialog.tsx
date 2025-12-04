"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface DateRangeDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  description?: string;
  onConfirm: (start: string, end: string) => void;
}

export function DateRangeDialog({ open, onOpenChange, description, onConfirm }: DateRangeDialogProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleConfirm = () => {
    if (!startDate || !endDate) return alert("Preencha todas as datas!");
    onConfirm(startDate, endDate);
    onOpenChange(false);
    setStartDate("");
    setEndDate("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2
                     bg-card border border-border rounded-xl shadow-2xl p-6 focus:outline-none"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <Dialog.Title className="text-xl font-bold text-card-foreground">
                Selecionar Período
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-foreground/60 mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <button className="text-foreground/40 hover:text-foreground transition-colors p-1">
                <FaTimes />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-foreground/70 mb-1 block">Data Inicial</label>
              <input
                type="date"
                className="input-base w-full rounded-md px-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70 mb-1 block">Data Final</label>
              <input
                type="date"
                className="input-base w-full rounded-md px-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="btn-secondary px-4 py-2 h-10 text-sm">
                Cancelar
              </button>
            </Dialog.Close>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              className="btn-primary px-6 py-2 h-10 text-sm"
            >
              Gerar Relatório
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}