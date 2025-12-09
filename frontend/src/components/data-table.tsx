"use client";

import { TransactionsResponse } from "../services/api";

interface DataTableProps {
  data: TransactionsResponse | null;
  loading: boolean;
  error: string | null;
  page: number;
  onPageChange: (page: number) => void;
}

export default function DataTable({
  data,
  loading,
  error,
  page,
  onPageChange,
}: DataTableProps) {
  if (loading) return <div className="px-6 py-4">Loading...</div>;
  if (error) return <div className="px-6 py-4 text-red-600">{error}</div>;
  if (!data || data.items.length === 0)
    return <div className="px-6 py-4">No records found.</div>;

  const rows = data.items;
  const totalPages = data.totalPages;

  // Pagination logic
  const pages: number[] = [];
  if (totalPages > 0) {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }
  }

  return (
    <div className="px-6 pb-6">
      <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Customer</th>
            <th className="px-3 py-2">Region</th>
            <th className="px-3 py-2">Product</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2 text-right">Qty</th>
            <th className="px-3 py-2 text-right">Final Amount</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.transaction_id}-${row.date}`}  
              className="border-t"
            >
              <td className="px-3 py-2">{row.date}</td>
              <td className="px-3 py-2">{row.customer_name}</td>
              <td className="px-3 py-2">{row.customer_region}</td>
              <td className="px-3 py-2">{row.product_name}</td>
              <td className="px-3 py-2">{row.product_category}</td>
              <td className="px-3 py-2 text-right">{row.quantity}</td>
              <td className="px-3 py-2 text-right">
                ₹{row.final_amount.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <div className="flex gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 border rounded text-sm ${
                p === page
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
