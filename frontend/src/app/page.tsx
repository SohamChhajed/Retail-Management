"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import MainContent from "../components/main-content";
import {
  fetchTransactions,
  TransactionsResponse,
  TransactionQuery,
  SortBy,
} from "../services/api";

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Omit<TransactionQuery, "q" | "page">>(
    {}
  );
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<TransactionsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch whenever search/filters/sort/page change
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const query: TransactionQuery = {
          q: search || undefined,
          ...filters,
          sortBy,
          sortDir,
          page,
        };

        const res = await fetchTransactions(query);
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, filters, sortBy, sortDir, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (next: Partial<TransactionQuery>) => {
    setFilters((prev) => ({ ...prev, ...next }));
    setPage(1);
  };

  const handleSortChange = (s: SortBy, d: "asc" | "desc") => {
    setSortBy(s);
    setSortDir(d);
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <MainContent
        search={search}
        onSearchChange={handleSearchChange}
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
