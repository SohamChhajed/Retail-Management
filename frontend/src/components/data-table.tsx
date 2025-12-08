"use client"

import { useState } from "react"
import { FullTableModal } from "./full-table-modal"

export default function DataTable() {
  const [isFullTableOpen, setIsFullTableOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // sample data in figma
  const tableData = Array(12)
    .fill(null)
    .map((_, idx) => ({
      id: idx + 1,
      transactionId: "1234567",
      date: "2023-09-26",
      customerId: "CUST12016",
      customerName: "Neha Yadav",
      phoneNumber: "+91 9123456789",
      gender: "Female",
      age: 25,
      productCategory: "Clothing",
      quantity: "01",
    }))

  const columns = [
    "Transaction ID",
    "Date",
    "Customer ID",
    "Customer name",
    "Phone Number",
    "Gender",
    "Age",
    "Product Category",
    "Quantity",
  ]

  return (
    <>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
          <button
            onClick={() => setIsFullTableOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="View full table"
          >
            <span className="text-xl">&lt;/&gt;</span>
            <span className="text-sm font-medium">Full table view</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => (
                  <th key={column} className="text-left text-sm font-semibold text-gray-700 pb-3 px-2">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="text-sm text-gray-600 py-3 px-2">{row.transactionId}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.date}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.customerId}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.customerName}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.phoneNumber}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.gender}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.age}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.productCategory}</td>
                  <td className="text-sm text-gray-600 py-3 px-2">{row.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Prev
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                page === currentPage ? "bg-black text-white font-semibold" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Next
          </button>
        </div>
      </div>
      <FullTableModal isOpen={isFullTableOpen} onClose={() => setIsFullTableOpen(false)} />
    </>
  )
}
