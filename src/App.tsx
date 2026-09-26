import { useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion, Variants } from "framer-motion"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import ChatAppearance from "./pages/ChatAppearance"
import Templates from "./pages/Templates"
import MediaLibrary from "./pages/MediaLibrary"
import Organization from "./pages/Organization"
import Agents from "./pages/Agents"
import Settings from "./pages/Settings"

const pageTitles: Record<string, { title: string subtitle?: string }> = {
  "/": { title: "Dashboard", subtitle: "Analytics & overview" },
  "/chat": { title: "WA Chat", subtitle: "Customer conversations" },
  "/appearance": { title: "Chat Appearance", subtitle: "Customize widget" },
  "/templates": { title: "Message Templates", subtitle: "Manage templates" },
  "/media": { title: "Media Library", subtitle: "Files & assets" },
  "/organization": { title: "Organization", subtitle: "Team management" },
  "/agents": { title: "Agents", subtitle: "Support agents" },
  "/settings": { title: "Settings", subtitle: "Workspace settings" },
  "/help": { title: "Help & Support", subtitle: "Get assistance" },
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 25 },
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
}

function AnimatedRoutes() {
  const location = useLocation()
  const isChat = location.pathname === "/chat"

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={`flex-1 ${
          isChat ? "overflow-hidden flex flex-col h-full" : "overflow-auto"
        }`}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/appearance" element={<ChatAppearance />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/help"
            element={
              <div className="p-6">
                <h1
                  className="font-display font-bold text-[22px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Help & Support
                </h1>
                <p
                  className="text-[13.5px] mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Get help with WhatsApi
                </p>
              </div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const pageInfo = pageTitles[location.pathname] || { title: "WhatsApi" }
  const isChat = location.pathname === "/chat"

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300
          ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"}
        `}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />

        <main className={`flex-1 flex flex-col relative`}>
          <AnimatedRoutes />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
