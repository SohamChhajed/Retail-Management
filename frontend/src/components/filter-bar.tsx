"use client";
import React, { ChangeEvent } from "react";
import { TransactionQuery, SortBy } from "../services/api";
interface FilterBarProps {
  filters: Omit<TransactionQuery, "q" | "page">;
  sortBy: SortBy;
  sortDir: "asc" | "desc";
  onFilterChange: (filters: Partial<TransactionQuery>) => void;
  onSortChange: (sortBy: SortBy, sortDir: "asc" | "desc") => void;
}
const REGIONS = ["North", "South", "East", "West", "Central"];
const GENDERS = ["Male", "Female", "Other"];
const CATEGORIES = [
  "Clothing",
  "Electronics",
  "Grocery",
  "Home & Kitchen",
  "Beauty",
  "Sports",
];
const PAYMENT_METHODS = ["UPI", "Credit Card", "Debit Card", "Wallet", "Cash"];

export default function FilterBar({
  filters,
  sortBy,
  sortDir,
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  const handleSingleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    key: keyof TransactionQuery
  ) => {
    const value = e.target.value;
    onFilterChange({
      [key]: value ? [value] : [],
    });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortBy;
    onSortChange(value, sortDir);
  };

  const handleSortDirToggle = () => {
    onSortChange(sortBy, sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="px-6 py-3 bg-white border-b border-gray-200 flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Customer Region</label>
        <select
          className="border rounded px-3 py-1 text-sm min-w-[150px] bg-white"
          value={filters.region?.[0] || ""}
          onChange={(e) => handleSingleSelectChange(e, "region")}
        >
          <option value="">All</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Gender</label>
        <select
          className="border rounded px-3 py-1 text-sm min-w-[120px] bg-white"
          value={filters.gender?.[0] || ""}
          onChange={(e) => handleSingleSelectChange(e, "gender")}
        >
          <option value="">All</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>


      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Age Range</label>
        <div className="flex gap-1">
          <input
            type="number"
            placeholder="Min"
            className="border rounded px-2 py-1 text-xs w-16"
            value={filters.ageMin ?? ""}
            onChange={(e) =>
              onFilterChange({
                ageMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <span className="text-xs text-gray-400 self-center">–</span>
          <input
            type="number"
            placeholder="Max"
            className="border rounded px-2 py-1 text-xs w-16"
            value={filters.ageMax ?? ""}
            onChange={(e) =>
              onFilterChange({
                ageMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Product Category</label>
        <select
          className="border rounded px-3 py-1 text-sm min-w-[160px] bg-white"
          value={filters.category?.[0] || ""}
          onChange={(e) => handleSingleSelectChange(e, "category")}
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>


      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Payment Method</label>
        <select
          className="border rounded px-3 py-1 text-sm min-w-[160px] bg-white"
          value={filters.paymentMethod?.[0] || ""}
          onChange={(e) => handleSingleSelectChange(e, "paymentMethod")}
        >
          <option value="">All</option>
          {PAYMENT_METHODS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Date range</label>
        <div className="flex gap-1">
          <input
            type="date"
            className="border rounded px-2 py-1 text-xs bg-white"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              onFilterChange({ dateFrom: e.target.value || undefined })
            }
          />
          <span className="text-xs text-gray-400 self-center">–</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-xs bg-white"
            value={filters.dateTo || ""}
            onChange={(e) =>
              onFilterChange({ dateTo: e.target.value || undefined })
            }
          />
        </div>
      </div>

      <div className="flex flex-col ml-auto">
        <label className="text-xs text-gray-500 mb-1">Sort by</label>
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-1 text-sm bg-white"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Date (Newest)</option>
            <option value="quantity">Quantity</option>
            <option value="customerName">Customer Name (A–Z)</option>
          </select>
          <button
            type="button"
            className="border rounded px-2 py-1 text-xs bg-white"
            onClick={handleSortDirToggle}
          >
            {sortDir === "asc" ? "Asc ↑" : "Desc ↓"}
          </button>
        </div>
      </div>
    </div>
  );
}
