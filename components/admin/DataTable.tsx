"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-gray-500 text-sm">Loading data...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((column, index) => (
                    <td key={index} className={`px-6 py-4 text-sm text-gray-900 ${column.className || ""}`}>
                      {typeof column.accessor === "function"
                        ? column.accessor(item)
                        : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden">
        {loading ? (
          <div className="px-6 py-12 text-center border-b border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-gray-500 text-sm">Loading data...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500 text-sm border-b border-gray-100">
            {emptyMessage}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.map((item) => (
              <div key={item.id} className="p-4 space-y-4 hover:bg-gray-50/50 transition-colors">
                {columns.map((column, index) => {
                  const content = typeof column.accessor === "function"
                    ? column.accessor(item)
                    : (item[column.accessor] as React.ReactNode);

                  // If it's the first column, treat it as a header
                  if (index === 0) {
                    return (
                      <div key={index} className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">{content}</div>
                      </div>
                    );
                  }

                  // If it's the last column (Actions), show it as a footer within the card
                  if (index === columns.length - 1 && column.header.toLowerCase() === "actions") {
                    return (
                      <div key={index} className="pt-2 flex justify-end border-t border-gray-50">
                        {content}
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                        {column.header}
                      </span>
                      <div className="text-sm text-gray-900">{content}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>


      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4 bg-gray-50/30">
          <p className="text-sm text-gray-500">
            Page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
            <span className="font-medium text-gray-900">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="h-8 px-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="h-8 px-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
