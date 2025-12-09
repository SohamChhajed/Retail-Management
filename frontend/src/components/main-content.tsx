"use client";

import SummaryMetrics from "./summary-metrics";
import FilterBar from "./filter-bar";
import DataTable from "./data-table";
import { Search } from "lucide-react";
import {
  TransactionsResponse,
  TransactionQuery,
  SortBy,
} from "../services/api";

interface MainContentProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Omit<TransactionQuery, "q" | "page">;
  onFilterChange: (filters: Partial<TransactionQuery>) => void;
  sortBy: SortBy;
  sortDir: "asc" | "desc";
  onSortChange: (sortBy: SortBy, sortDir: "asc" | "desc") => void;
  page: number;
  onPageChange: (page: number) => void;
  data: TransactionsResponse | null;
  loading: boolean;
  error: string | null;
}

export default function MainContent({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  sortDir,
  onSortChange,
  page,
  onPageChange,
  data,
  loading,
  error,
}: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Sales Management System
          </h1>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-80">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Name, Phone no."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none flex-1"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <FilterBar
          filters={filters}
          sortBy={sortBy}
          sortDir={sortDir}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
        />

        <SummaryMetrics data={data} loading={loading} />

        <DataTable
          data={data}
          loading={loading}
          error={error}
          page={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
