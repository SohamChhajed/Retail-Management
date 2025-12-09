"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import {
  TransactionQuery,
  TransactionsResponse,
  SortBy,
  fetchTransactions,
} from "../services/api";

type FilterState = Omit<TransactionQuery, "q" | "page">;

const initialFilters: FilterState = {
  region: [],
  gender: [],
  ageMin: undefined,
  ageMax: undefined,
  category: [],
  tags: [],
  paymentMethod: [],
  dateFrom: undefined,
  dateTo: undefined,
  sortBy: "date",
  sortDir: "desc",
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<TransactionsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query: TransactionQuery = {
        ...filters,
        q: search || undefined,
        sortBy,
        sortDir,
        page,
      };

      const res = await fetchTransactions(query);
      setData(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [filters, search, sortBy, sortDir, page]);

  useEffect(() => {
    // load data when the dashboard is active
    if (activeNav === "dashboard") {
      loadData();
    }
  }, [activeNav, loadData]);

  const handleFilterChange = (partial: Partial<TransactionQuery>) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const handleSortChange = (newSortBy: SortBy, newSortDir: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <MainContent
        search={search}
        onSearchChange={(val) => {
          setPage(1);
          setSearch(val);
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={handleSortChange}
        page={page}
        onPageChange={handlePageChange}
        data={data}
        loading={loading}
        error={error}
      />
    </div>
  );
}
