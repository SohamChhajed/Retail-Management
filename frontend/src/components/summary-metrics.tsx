"use client";

import { TransactionsResponse } from "../services/api";

interface SummaryMetricsProps {
  data: TransactionsResponse | null;
  loading: boolean;
}

export default function SummaryMetrics({ data, loading }: SummaryMetricsProps) {
  if (loading || !data) return null;

  const units = data.items.reduce((sum, row) => sum + row.quantity, 0);
  const finalAmount = data.items.reduce(
    (sum, row) => sum + row.final_amount,
    0
  );
  const discount = data.items.reduce(
    (sum, row) => sum + (row.total_amount - row.final_amount),
    0
  );

  return (
    <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-xs text-gray-500">Total units sold (page)</p>
        <p className="text-2xl font-semibold">{units}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-xs text-gray-500">Total amount (page)</p>
        <p className="text-2xl font-semibold">
          ₹{finalAmount.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-xs text-gray-500">Total discount (page)</p>
        <p className="text-2xl font-semibold">
          ₹{discount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
