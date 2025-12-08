"use client"

import { ChevronDown } from "lucide-react"

export default function FilterBar() {
  const filters = ["Customer Region", "Gender", "Age Range", "Product Category", "Tags", "Payment Method", "Date"]

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 flex-wrap">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {filter}
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        ))}
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Sort by: Customer Name (A-Z)</button>
      </div>
    </div>
  )
}
