"use client"

export function FullTableModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
      totalAmount: "₹1,000",
      customerRegion: "South",
      productId: "PROD0001",
      employeeName: "Harsh Agarwal",
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
    "Total Amount",
    "Customer region",
    "Product ID",
    "Employee name",
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Dark overlay background */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={onClose}></div>

      {/* Modal container - larger and full screen */}
      <div className="fixed inset-4 z-50 flex flex-col bg-white rounded-lg shadow-2xl">
        {/* Modal header with dark background */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">Full table view</h2>
          </div>
          <div className="flex items-center gap-4">
            <code className="text-emerald-400 text-xl">&lt;/&gt;</code>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-light w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal content - scrollable table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="border-b border-gray-300">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="text-left text-xs font-bold text-gray-800 py-3 px-4 whitespace-nowrap bg-gray-100"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="text-xs text-gray-700 py-3 px-4">{row.transactionId}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.date}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.customerId}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.customerName}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.phoneNumber}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.gender}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.age}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.productCategory}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.quantity}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.totalAmount}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.customerRegion}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.productId}</td>
                  <td className="text-xs text-gray-700 py-3 px-4">{row.employeeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
