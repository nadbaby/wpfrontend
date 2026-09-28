import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  MessageSquare,
  Palette,
  FileText,
  Image,
  Users,
  UserCheck,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  LogIn,
  Megaphone,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/chat", icon: MessageSquare, label: "WA Chat" },
  { path: "/appearance", icon: Palette, label: "Chat Appearance" },
  { path: "/templates", icon: FileText, label: "Message Templates" },
  { path: "/media", icon: Image, label: "Media Library" },
  { path: "/organization", icon: Users, label: "Organization" },
  { path: "/agents", icon: UserCheck, label: "Agents" },
  { path: "/broadcast", icon: Megaphone, label: "Broadcast" },
]

const bottomItems = [
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/help", icon: HelpCircle, label: "Help & Support" },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onMobileClose()
    navigate("/login")
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-[var(--bg-sidebar)] border-r border-[var(--border)]
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[240px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div
          className={`flex items-center h-[64px] px-4 border-b border-[var(--border)] ${collapsed ? "justify-center" : "gap-3"
            }`}
        >
          <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-display font-bold text-[15px] leading-tight text-[var(--text-primary)]">
                WhatsApi
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">
                Business Suite
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive =
              path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path)
            return (
              <NavLink
                key={path}
                to={path}
                onClick={onMobileClose}
                className={`
                  relative flex items-center gap-3 mx-2 mb-0.5 rounded-xl
                  transition-all duration-150 group
                  ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                  ${isActive
                    ? "bg-[var(--bg-active)] text-[#25D366]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  }
                `}
                title={collapsed ? label : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#25D366]" />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {!collapsed && (
                  <span
                    className={`text-[13.5px] font-medium ${isActive ? "font-semibold" : ""
                      }`}
                  >
                    {label}
                  </span>
                )}
                {collapsed && (
                  <div
                    className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111827] text-white text-xs rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50"
                  >
                    {label}
                  </div>
                )}
              </NavLink>
            )
          })}

          <div className="mx-4 my-3 border-t border-[var(--border)]" />

          {bottomItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(path)
            return (
              <NavLink
                key={path}
                to={path}
                onClick={onMobileClose}
                className={`
                  relative flex items-center gap-3 mx-2 mb-0.5 rounded-xl
                  transition-all duration-150 group
                  ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                  ${isActive
                    ? "bg-[var(--bg-active)] text-[#25D366]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {!collapsed && (
                  <span className="text-[13.5px] font-medium">{label}</span>
                )}
                {collapsed && (
                  <div
                    className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111827] text-white text-xs rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50"
                  >
                    {label}
                  </div>
                )}
              </NavLink>
            )
          })}

          {/* Dedicated Login/Logout Link for easy access */}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              onClick={onMobileClose}
              className={`
                relative flex items-center gap-3 mx-2 mt-2 rounded-xl
                transition-all duration-150 group
                ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                ${location.pathname === "/login"
                  ? "bg-[var(--bg-active)] text-[#25D366]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                }
              `}
            >
              <LogIn size={18} />
              {!collapsed && (
                <span className="text-[13.5px] font-medium">Login</span>
              )}
              {collapsed && (
                <div
                  className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111827] text-white text-xs rounded-lg
                  opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50 text-left"
                >
                  Login
                </div>
              )}
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className={`
                w-auto relative flex items-center gap-3 mx-2 mt-2 rounded-xl
                transition-all duration-150 group text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-400
                ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
              `}
            >
              <LogOut size={18} />
              {!collapsed && (
                <span className="text-[13.5px] font-medium text-left">Logout</span>
              )}
              {collapsed && (
                <div
                  className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111827] text-white text-xs rounded-lg
                  opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50 text-left"
                >
                  Logout
                </div>
              )}
            </button>
          )}
        </nav>

        {/* User profile */}
        <div
          className={`p-3 border-t border-[var(--border)] ${collapsed ? "flex justify-center" : ""
            }`}
        >
          {isAuthenticated && user ? (
            collapsed ? (
              <div className="relative group cursor-pointer" onClick={() => navigate("/settings")}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#25D366]/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[var(--bg-sidebar)]" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0 cursor-pointer" onClick={() => navigate("/settings")}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#25D366]/40"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[var(--bg-sidebar)]" />
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate("/settings")}>
                  <div className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] truncate">
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <LogIn size={15} />
              {!collapsed && <span>Sign In</span>}
            </button>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-[84px] w-6 h-6 rounded-full
            bg-[var(--bg-card)] border border-[var(--border)] items-center justify-center
            text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#25D366]
            transition-all duration-150 shadow-sm z-10"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>
    </>
  )
}
