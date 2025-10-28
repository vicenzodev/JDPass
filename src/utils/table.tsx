import { ReactNode } from "react";

export interface ColumnProps {
  heading: ReactNode;
  value: string;
  align?: 'left' | 'right' | 'center'
  sortValue?: string; 
}

export interface FilterOption {
  label: string;
  value: string;
  type?: "text" | "select";
  options?: string[];
}