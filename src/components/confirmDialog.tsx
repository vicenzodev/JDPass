"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

type ButtonVariant = 'danger' | 'primary' | 'success' | 'neutral';

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  variant?: ButtonVariant;
  icon?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  variant = 'danger',
  icon,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}: ConfirmDialogProps) {
  
  const buttonStyles: Record<ButtonVariant, string> = {
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600",
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500",
    success: "bg-[var(--brand-color)] hover:opacity-90 text-white focus:ring-green-500",
    neutral: "bg-zinc-600 hover:bg-zinc-700 text-white focus:ring-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-600",
  };

  const iconColorStyles: Record<ButtonVariant, string> = {
    danger: "text-red-600 dark:text-red-400",
    primary: "text-blue-600 dark:text-blue-400",
    success: "text-[var(--brand-color)] dark:text-green-400",
    neutral: "text-zinc-600 dark:text-zinc-400",
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-overlayShow" />
        
        <AlertDialog.Content className="fixed z-50 left-1/2 top-1/2 w-[90vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card border border-border p-6 shadow-2xl focus:outline-none data-[state=open]:animate-contentShow">
          
          <AlertDialog.Title className="text-lg font-bold text-card-foreground flex items-center gap-3">
            {icon && (
              <span className={`${iconColorStyles[variant]} flex items-center justify-center`}>
                {icon}
              </span>
            )}
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-3 mb-6 text-sm text-foreground/70 leading-relaxed ml-0">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-sm font-medium rounded-md border border-border text-foreground hover:bg-background/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                {cancelLabel}
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md shadow-sm 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card
                  ${buttonStyles[variant]}
                `}
              >
                {confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
