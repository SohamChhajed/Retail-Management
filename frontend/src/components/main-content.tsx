"use client"
import SummaryMetrics from "./summary-metrics"
import FilterBar from "./filter-bar"
import DataTable from "./data-table"
import { Search } from "lucide-react"

export default function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">

        {/* Header Row: Title LEFT, Search RIGHT */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-80">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Name, Phone no."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none flex-1"
            />
          </div>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto">
        <FilterBar />
        <SummaryMetrics />
        <DataTable />
      </div>
    </div>
  )
}

