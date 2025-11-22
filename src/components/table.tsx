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

interface ActionButton {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "outlined";
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
    <div className="w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {filterable && filterOptions && (
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <select
                className="px-3 h-12 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800"
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
                  className="pl-4 pr-4 h-12 w-60 md:w-64 border-l border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Todos</option>
                  {filterOptions
                    .find(f => f.value === filterField)?.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              ) : (
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => {
                      setFilterValue(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={filterPlaceholder}
                    className="pl-10 pr-4 h-12 w-60 md:w-64 border-l border-gray-300 bg-white focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {onRefresh && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRefresh}
              className="p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 transition"
              title="Recarregar tabela"
            >
              <FaSyncAlt size={18} className="text-gray-900" />
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCardMode((prev) => !prev)}
            className="p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 transition"
            title="Alterar modo"
          >
            {cardMode ? (
              <FaTable size={18} className="text-gray-900" />
            ) : (
              <FaThLarge size={18} className="text-gray-900" />
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          {extraButtons.map((btn, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={btn.onClick}
              className={`flex items-center gap-2 px-6 h-12 rounded-md transition text-sm font-medium ${
                btn.variant === "outlined"
                  ? "border border-green-800 text-green-800 hover:bg-green-100"
                  : "bg-green-800 text-white hover:bg-green-900"
              }`}
            >
              {btn.icon}
              {btn.label}
            </motion.button>
          ))}

          {showAddButton && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`${pathname}/form`)}
              className="flex items-center gap-2 px-6 h-12 bg-green-800 text-white rounded-md hover:bg-green-900 transition text-base font-medium"
            >
              <FaPlus /> Adicionar
            </motion.button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600 animate-pulse">
          Carregando dados...
        </div>
      ) : cardMode ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
              >
                {columns.map((col) => (
                  <div key={col.value} className="mb-2">
                    <p className="text-xs text-gray-500">{col.heading}</p>
                    <p
                      className={'text-sm text-gray-800 font-medium text-left'}
                    >
                      {row[col.value]}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-t-lg">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-green-800 text-white">
                  {columns.map((col) => (
                    <th
                      key={col.value}
                      className={`py-4 px-4 text-${
                        col.align ?? "left"
                      }`}
                    >
                      {col.heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      {columns.map((col) => (
                        <td
                          key={`${i}-${col.value}`}
                          className={`py-4 px-4 ${
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
                      className="text-center text-gray-500 py-6"
                    >
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        

          <div className="flex items-center justify-between gap-4 mt-6">
            <div>
              <span>{`Mostrando ${startItem} - ${endItem} de ${filteredData.length} registros`}</span>
            </div>
            <div className="flex items-center justify-end gap-4">
              <select
                className="border border-gray-300 rounded-md px-2 h-10"
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
                  className="px-3 h-10 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <FaChevronLeft />
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="px-3 h-10 border rounded-md hover:bg-gray-200 disabled:opacity-50"
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
