"use client";

import { useState, useMemo, ReactNode } from "react";
import {
  FaSearch,
  FaSyncAlt,
  FaPlus,
  FaTable,
  FaThLarge,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ColumnProps, FilterOption } from "@/utils/table";
import ConfirmDialog from "./confirmDialog";

interface ConfirmationConfig {
  title: string;
  description: string;
  variant?: 'danger' | 'primary' | 'success' | 'neutral';
  icon?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ActionButton {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "outlined";
  confirmation?: ConfirmationConfig;
}

interface DataTableProps {
  data: Record<string, any>[];
  columns: ColumnProps[];
  filterable?: boolean;
  filterPlaceholder?: string;
  filterOptions?: FilterOption[];
  loading?: boolean;
  onRefresh?: () => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
  extraButtons?: ActionButton[];
  manualPagination?: boolean;
  totalRecords?: number;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  onPerRowsChange?: (newPerPage: number) => void;
}

export default function Table({
  data,
  columns,
  filterable = true,
  filterPlaceholder = "Digite para filtrar...",
  filterOptions,
  loading = false,
  onRefresh,
  showAddButton = false,
  extraButtons = [],
}: DataTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filterField, setFilterField] = useState<string>(
    filterOptions?.[0]?.value ?? columns[0].value
  );
  const [filterValue, setFilterValue] = useState("");

  const [cardMode, setCardMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!filterValue) return data;

    return data.filter((item) => {
      const fieldValue = String(item[filterField] ?? "").toLowerCase();
      return fieldValue.includes(filterValue.toLowerCase());
    });
  }, [data, filterField, filterValue]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <div className="w-full bg-card/80 backdrop-blur-lg rounded-2xl shadow-md p-6 border border-border transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {filterable && filterOptions && (
            <div className="flex items-center rounded-lg overflow-hidden border border-border">
              <select
                className="px-3 h-12 bg-select text-foreground focus:outline-none border-r border-border"
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
              >
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {filterOptions.find(f => f.value === filterField)?.type === "select" ? (
                <select
                  className="pl-4 pr-4 h-12 w-60 md:w-64 bg-card text-foreground focus:outline-none"
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Todos</option>
                  {filterOptions
                    .find(f => f.value === filterField)?.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
              ) : (
                <div className="relative flex-1 bg-card">
                  <FaSearch className="absolute left-3 top-3.5 text-foreground/40" />
                  <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => {
                      setFilterValue(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={filterPlaceholder}
                    className="pl-10 pr-4 h-12 w-60 md:w-64 bg-card text-foreground focus:outline-none placeholder:text-foreground/30"
                  />
                </div>
              )}
            </div>
          )}

          {onRefresh && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRefresh}
              className="p-4 btn-secondary"
              title="Recarregar tabela"
            >
              <FaSyncAlt size={18} />
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCardMode((prev) => !prev)}
            className="p-4 btn-secondary"
            title="Alterar modo"
          >
            {cardMode ? (
              <FaTable size={18} />
            ) : (
              <FaThLarge size={18} />
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          {extraButtons.map((btn, i) => {
            const ButtonContent = (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={btn.confirmation ? undefined : btn.onClick}
                className={btn.variant === "outlined" ? "btn-outline" : "btn-primary"}
              >
                {btn.icon}
                {btn.label}
              </motion.button>
            );

            if (btn.confirmation) {
              return (
                <ConfirmDialog
                  key={i}
                  trigger={ButtonContent}
                  title={btn.confirmation.title}
                  description={btn.confirmation.description}
                  onConfirm={btn.onClick}
                  variant={btn.confirmation.variant || 'primary'}
                  icon={btn.confirmation.icon}
                  confirmLabel={btn.confirmation.confirmLabel}
                  cancelLabel={btn.confirmation.cancelLabel}
                />
              );
            }

            return <div key={i}>{ButtonContent}</div>;
          })}

          {showAddButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`${pathname}/form`)}
              className="btn-primary"
            >
              <FaPlus /> Adicionar
            </motion.button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-foreground/50 animate-pulse">
          Carregando dados...
        </div>
      ) : cardMode ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, i) => (
              <div
                key={row.id || i}
                className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md hover:border-green-500/30 transition-all"
              >
                {columns.map((col) => (
                  <div key={col.value} className="mb-2">
                    <p className="text-xs text-foreground/50">{col.heading}</p>
                    <p className="text-sm text-foreground font-medium text-left">
                      {row[col.value]}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-foreground/50 py-6">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-t-lg border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="table-header-row">
                  {columns.map((col) => (
                    <th
                      key={col.value}
                      className={`py-4 px-4 text-${col.align ?? "left"}`}
                    >
                      {col.heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-background/50 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={`${i}-${col.value}`}
                          className={`py-4 px-4 text-foreground ${
                            col.align === "center" ? "text-center"
                            : col.align === "right" ? "text-right": "text-left"
                          }`}
                        >
                          {row[col.value]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center text-foreground/50 py-6"
                    >
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-foreground/70">
            <div>
              <span className="text-sm">{`Mostrando ${startItem} - ${endItem} de ${filteredData.length} registros`}</span>
            </div>
            <div className="flex items-center justify-end gap-4">
              <select
                className="input-base h-10 px-2 rounded-md bg-card text-foreground"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 15, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <button
                  className="btn-secondary h-10 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <FaChevronLeft />
                </button>
                <span className="text-foreground font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="btn-secondary h-10 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}