import React from "react";

export const InputWrapper = ({
  label,
  icon,
  children,
  required,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
      {icon && (
        <span className="text-[var(--brand-color)]">
          {icon}
        </span>
      )}
      
      {label}
      
      {required && <span className="text-red-500 dark:text-red-400">*</span>}
    </label>
    
    {children}
  </div>
);