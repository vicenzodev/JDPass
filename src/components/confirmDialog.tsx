"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg data-[state=open]:animate-contentShow">
          
          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-3 mb-6 text-sm text-neutral-600">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 rounded bg-neutral-200 hover:bg-neutral-300">
                Cancelar
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar
              </button>
            </AlertDialog.Action>
          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
