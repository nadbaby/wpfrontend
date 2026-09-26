import { useState } from "react"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  UserPlus,
  X,
  Shield,
  ShieldCheck,
  Crown,
  Eye,
  UserX,
  ChevronDown,
  Check,
} from "lucide-react"

const members = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@company.com",
    role: "Owner",
    dept: "Management",
    status: "active",
    conversations: 24,
    lastActive: "2 min ago",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
  },
  {
    id: 2,
    name: "Sneha Patel",
    email: "sneha@company.com",
    role: "Admin",
    dept: "Operations",
    status: "active",
    conversations: 18,
    lastActive: "15 min ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=40&h=40&fit=crop",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@company.com",
    role: "Agent",
    dept: "Support",
    status: "active",
    conversations: 31,
    lastActive: "1 hour ago",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya@company.com",
    role: "Agent",
    dept: "Sales",
    status: "away",
    conversations: 12,
    lastActive: "3 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    email: "vikram@company.com",
    role: "Manager",
    dept: "Sales",
    status: "offline",
    conversations: 8,
    lastActive: "1 day ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: 6,
    name: "Meera Nair",
    email: "meera@company.com",
    role: "Viewer",
    dept: "Marketing",
    status: "invited",
    conversations: 0,
    lastActive: "Never",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop",
  },
]

const roleColors: Record<string, string> = {
  Owner: "bg-amber-50 text-amber-600",
  Admin: "bg-purple-50 text-purple-600",
  Manager: "bg-blue-50 text-blue-600",
  Agent: "bg-[#F0FDF4] text-[#25D366]",
  Viewer: "bg-gray-100 text-gray-500",
}

const statusColors: Record<string, string> = {
  active: "bg-[#F0FDF4] text-[#25D366]",
  away: "bg-amber-50 text-amber-500",
  offline: "bg-gray-100 text-gray-500",
  invited: "bg-blue-50 text-blue-500",
}

const statusDotColors: Record<string, string> = {
  active: "bg-[#25D366]",
  away: "bg-amber-400",
  offline: "bg-gray-300",
  invited: "bg-blue-400",
}

export default function Organization() {
  const [search, setSearch] = useState("")
  const [showInvite, setShowInvite] = useState(false)
  const [inviteName, setInviteName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Agent")
  const [inviteDept, setInviteDept] = useState("Support")
  const [sent, setSent] = useState(false)

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleInvite = () => {
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setShowInvite(false)
      setInviteName("")
      setInviteEmail("")
    }, 2000)
  }

  const stats = [
    { label: "Total Members", value: members.length, color: "#3B82F6" },
    {
      label: "Active Now",
      value: members.filter((m) => m.status === "active").length,
      color: "#25D366",
    },
    {
      label: "Away",
      value: members.filter((m) => m.status === "away").length,
      color: "#F59E0B",
    },
    {
      label: "Pending Invites",
      value: members.filter((m) => m.status === "invited").length,
      color: "#8B5CF6",
    },
  ]

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={{ color: "var(--text-primary)" }}
          >
            Organization
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your team members, roles and permissions
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#22C55E] text-white rounded-xl text-[13px] font-semibold transition-colors"
        >
          <UserPlus size={16} />
          Invite Member
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl border p-4 flex items-center gap-3"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}15` }}
            >
              <span
                className="font-display font-bold text-[18px]"
                style={{ color }}
              >
                {value}
              </span>
            </div>
            <div
              className="text-[13px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 rounded-xl border px-3 h-10 max-w-[360px] mb-5"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <Search size={15} style={{ color: "var(--text-muted)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team members..."
          className="flex-1 bg-transparent text-[13px] placeholder-[#94A3B8] outline-none"
          style={{ color: "var(--text-primary)" }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-x-auto"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)" }}>
              {[
                "Member",
                "Role",
                "Department",
                "Status",
                "Conversations",
                "Last Active",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[11.5px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-[var(--bg-hover)] transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusDotColors[m.status]}`}
                      />
                    </div>
                    <div>
                      <div
                        className="text-[13px] font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {m.name}
                      </div>
                      <div
                        className="text-[11.5px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {m.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold ${roleColors[m.role]}`}
                  >
                    {m.role}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-[13px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {m.dept}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold capitalize ${statusColors[m.status]}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusDotColors[m.status]}`}
                    />
                    {m.status}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-[13px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {m.conversations}
                </td>
                <td
                  className="px-4 py-3 text-[12.5px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {m.lastActive}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-500 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Shield size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <UserX size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div
            className="rounded-2xl border w-full max-w-[440px] shadow-2xl"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div
                  className="font-display font-bold text-[16px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Invite Team Member
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Send an invitation to join your workspace
                </div>
              </div>
              <button
                onClick={() => setShowInvite(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={15} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label
                  className="text-[12px] font-medium mb-1.5 block"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Full Name
                </label>
                <input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-input)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-[12px] font-medium mb-1.5 block"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email Address
                </label>
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  type="email"
                  placeholder="e.g. anjali@company.com"
                  className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-input)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="text-[12px] font-medium mb-1.5 block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {["Admin", "Manager", "Agent", "Viewer"].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-[12px] font-medium mb-1.5 block"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Department
                  </label>
                  <select
                    value={inviteDept}
                    onChange={(e) => setInviteDept(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {[
                      "Support",
                      "Sales",
                      "Marketing",
                      "Operations",
                      "Management",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-end gap-2 px-5 py-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => setShowInvite(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all
                  ${
                    sent
                      ? "bg-emerald-500 text-white"
                      : "bg-[#25D366] hover:bg-[#22C55E] text-white"
                  } disabled:opacity-50`}
              >
                {sent ? <Check size={15} /> : <UserPlus size={15} />}
                {sent ? "Invitation Sent!" : "Send Invitation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
