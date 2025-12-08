"use client"

import { Info } from "lucide-react"

export default function SummaryMetrics() {
  const metrics = [
    {
      label: "Total units sold",
      value: "10",
      info: true,
    },
    {
      label: "Total Amount",
      value: "₹69,000",
      subValue: "(19.58%)",
      info: true,
    },
    {
      label: "Total Discount",
      value: "₹15000",
      subValue: "(45.58%)",
      info: true,
    },
  ]

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200">
      <div className="grid grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                {metric.subValue && <p className="text-sm text-gray-500">{metric.subValue}</p>}
              </div>
            </div>
            {metric.info && <Info size={18} className="text-gray-400 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
