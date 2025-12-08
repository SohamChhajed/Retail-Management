"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import MainContent from "./main-content"

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")

  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <MainContent />
    </div>
  )
}
