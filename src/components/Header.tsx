import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Search, Bell, ChevronDown, Menu, Globe, Sun, Moon, LogOut, User as UserIcon, Settings, LogIn } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

interface HeaderProps {
  onMenuClick: () => void
  title: string
  subtitle?: string
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, toggle } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate("/login")
  }

  return (
    <header className="h-[64px] bg-[var(--bg-card)] border-b border-[var(--border)] flex items-center gap-4 px-4 lg:px-6 sticky top-0 z-30 transition-colors duration-200">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
      >
        <Menu size={20} />
      </button>

      {/* Page title (mobile) */}
      <div className="lg:hidden flex-1">
        <div className="font-display font-semibold text-[15px] text-[var(--text-primary)]">
          {title}
        </div>
      </div>

      {/* Search */}
      <div
        className={`hidden lg:flex items-center gap-2.5 flex-1 max-w-[440px] h-9 px-3.5 rounded-xl border transition-all duration-150
        ${
          searchFocused
            ? "border-[#25D366] bg-[var(--bg-card)] shadow-[0_0_0_3px_rgba(37,211,102,0.1)]"
            : "border-[var(--border)] bg-[var(--bg-input)]"
        }
      `}
      >
        <Search size={15} className="text-[var(--text-muted)] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search menus, contacts, templates..."
          className="flex-1 bg-transparent text-[13.5px] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-muted)] border border-[var(--border)] font-mono">
          ⌘K
        </kbd>
      </div>

      <div className="flex-1 lg:flex-none" />

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }}
            className="relative p-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#25D366] border-2 border-[var(--bg-card)]" />
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-xl shadow-black/12 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <div className="font-display font-semibold text-[14px] text-[var(--text-primary)]">
                  Notifications
                </div>
                <button className="text-[12px] text-[#25D366] font-medium">
                  Mark all read
                </button>
              </div>
              {[
                {
                  title: "New message from Priya Singh",
                  time: "2 min ago",
                  read: false,
                },
                {
                  title: 'Template "Order Update" approved',
                  time: "1 hour ago",
                  read: false,
                },
                {
                  title: "Agent Rahul Kumar went offline",
                  time: "3 hours ago",
                  read: true,
                },
              ].map((n, i) => (
                <div
                  key={i}
                  className={`flex gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
                    !n.read ? "bg-[var(--bg-active)]" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      n.read ? "bg-transparent" : "bg-[#25D366]"
                    }`}
                  />
                  <div>
                    <div className="text-[13px] text-[var(--text-primary)] font-medium">
                      {n.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language */}
        <button className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Globe size={15} />
          <span className="text-[12px] font-medium">EN</span>
        </button>

        {/* User profile or Login Button */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors ml-1"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#25D366]/30"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#25D366] border-[1.5px] border-[var(--bg-card)]" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-[12.5px] font-semibold text-[var(--text-primary)] leading-tight truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[10.5px] text-[var(--text-muted)] truncate max-w-[120px]">
                  {user.role}
                </div>
              </div>
              <ChevronDown
                size={13}
                className="text-[var(--text-muted)] hidden md:block"
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-xl p-2 z-50">
                <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
                  <div className="text-xs font-bold text-[var(--text-primary)]">{user.name}</div>
                  <div className="text-[11px] text-[var(--text-muted)] truncate">{user.email}</div>
                </div>

                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <UserIcon size={15} />
                  <span>Profile Settings</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <Settings size={15} />
                  <span>Account & Preferences</span>
                </Link>

                <div className="my-1 border-t border-[var(--border)]" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-500 hover:bg-red-500/10 transition-colors font-medium text-left"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-[#25D366]/20 ml-2"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </Link>
        )}
      </div>

      {(showNotifs || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotifs(false); setShowUserMenu(false); }}
        />
      )}
    </header>
  )
}
