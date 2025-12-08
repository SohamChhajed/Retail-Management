"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    services: true,
    invoices: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: null },
    { id: "intake", label: "Intake", icon: null },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 text-gray-900 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center font-bold text-white">V</div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Vault</p>
            <p className="text-xs text-gray-500">Soham Chhajed</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? "bg-gray-100 text-gray-900 border-l-4 border-black"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="mt-4">
            <button
              onClick={() => toggleSection("services")}
              className="w-full text-left px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${expandedSections.services ? "rotate-180" : ""}`}
              />
            </button>
            {expandedSections.services && (
              <div className="pl-6">
                {["Pre-active", "Active", "Blocked", "Closed"].map((service) => (
                  <button
                    key={service}
                    onClick={() => setActiveNav(service.toLowerCase())}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                      activeNav === service.toLowerCase()
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2">
            <button
              onClick={() => toggleSection("invoices")}
              className="w-full text-left px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
            >
              <span>Invoices</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${expandedSections.invoices ? "rotate-180" : ""}`}
              />
            </button>
            {expandedSections.invoices && (
              <div className="pl-6">
                {["Preforma Invoices", "Final Invoices"].map((invoice) => (
                  <button
                    key={invoice}
                    onClick={() => setActiveNav(invoice.toLowerCase())}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                      activeNav === invoice.toLowerCase()
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {invoice}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
