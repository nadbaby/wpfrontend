import { useState } from "react"
import {
  Plus,
  Search,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  X,
  Edit,
  Users,
  ToggleLeft,
  ChevronRight,
  BarChart3,
  Activity,
  Calendar,
  Zap,
} from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Senior Agent",
    status: "online",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
    activeChats: 8,
    resolvedToday: 24,
    avgResponse: "1.8 min",
    rating: 4.9,
    skills: ["Customer Support", "Technical", "Billing"],
    teams: ["Support", "Sales"],
    workingHours: "9 AM – 6 PM",
    dept: "Support",
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Agent",
    status: "online",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=60&h=60&fit=crop",
    activeChats: 5,
    resolvedToday: 18,
    avgResponse: "2.4 min",
    rating: 4.7,
    skills: ["Onboarding", "Customer Support"],
    teams: ["Support"],
    workingHours: "10 AM – 7 PM",
    dept: "Support",
  },
  {
    id: 3,
    name: "Arjun Sharma",
    role: "Team Lead",
    status: "online",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop",
    activeChats: 3,
    resolvedToday: 12,
    avgResponse: "3.1 min",
    rating: 4.8,
    skills: ["Leadership", "Escalations", "Customer Support"],
    teams: ["All"],
    workingHours: "9 AM – 6 PM",
    dept: "Management",
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Agent",
    status: "away",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop",
    activeChats: 0,
    resolvedToday: 9,
    avgResponse: "4.2 min",
    rating: 4.5,
    skills: ["Sales", "Product Demos"],
    teams: ["Sales"],
    workingHours: "11 AM – 8 PM",
    dept: "Sales",
  },
  {
    id: 5,
    name: "Kiran Reddy",
    role: "Agent",
    status: "offline",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=60&h=60&fit=crop",
    activeChats: 0,
    resolvedToday: 0,
    avgResponse: "5.1 min",
    rating: 4.3,
    skills: ["Technical", "API Support"],
    teams: ["Technical"],
    workingHours: "2 PM – 11 PM",
    dept: "Technical",
  },
]

const statusColors: Record<string, string> = {
  online: "bg-[#25D366]",
  away: "bg-amber-400",
  offline: "bg-gray-300",
}

const teamStats = [
  { label: "Active Chats", value: 16, icon: MessageSquare, color: "#25D366" },
  { label: "Resolved Today", value: 63, icon: CheckCircle, color: "#3B82F6" },
  { label: "Avg Response", value: "3.3m", icon: Clock, color: "#F59E0B" },
  { label: "Satisfaction", value: "4.7★", icon: Star, color: "#8B5CF6" },
]

export default function Agents() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<typeof agents[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = agents.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === "All" || a.status === statusFilter.toLowerCase()
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={{ color: "var(--text-primary)" }}
          >
            Agents
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Monitor and manage your support team
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#22C55E] text-white rounded-xl text-[13px] font-semibold transition-colors">
          <Plus size={16} />
          Add Agent
        </button>
      </div>

      {/* Team stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {teamStats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border p-4 flex items-center gap-3"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={19} style={{ color }} />
            </div>
            <div>
              <div
                className="font-display font-bold text-[20px] leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {value}
              </div>
              <div
                className="text-[12px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div
          className="flex items-center gap-2 rounded-xl border px-3 h-10 flex-1 max-w-[360px]"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <Search size={15} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents..."
            className="flex-1 bg-transparent text-[13px] placeholder-[#94A3B8] outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-1.5">
          {["All", "Online", "Away", "Offline"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-[12.5px] font-medium border transition-colors"
              style={{
                background:
                  statusFilter === s ? "var(--bg-active)" : "var(--bg-card)",
                color: statusFilter === s ? "#25D366" : "var(--text-secondary)",
                borderColor: statusFilter === s ? "#25D366" : "var(--border)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelected(agent)}
            className="rounded-2xl border p-5 hover:shadow-lg hover:shadow-black/6 hover:border-[#25D366]/30 transition-all duration-200 cursor-pointer group"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${statusColors[agent.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-display font-bold text-[15px] truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {agent.name}
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {agent.role}
                </div>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-amber-500">
                <Star size={13} className="fill-amber-400 stroke-amber-400" />
                {agent.rating}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  label: "Active",
                  value: agent.activeChats,
                  color: "#25D366",
                  icon: MessageSquare,
                },
                {
                  label: "Resolved",
                  value: agent.resolvedToday,
                  color: "#3B82F6",
                  icon: CheckCircle,
                },
                {
                  label: "Avg Time",
                  value: agent.avgResponse,
                  color: "#F59E0B",
                  icon: Clock,
                },
              ].map(({ label, value, color, icon: Icon }) => (
                <div
                  key={label}
                  className="text-center p-2.5 rounded-xl"
                  style={{ background: "var(--bg-input)" }}
                >
                  <div
                    className="font-display font-bold text-[16px]"
                    style={{ color }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-[10.5px] mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {agent.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium"
                  style={{
                    background: "var(--bg-input)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between pt-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="text-[11.5px]"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${statusColors[agent.status]}`}
                />
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Edit size={13} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1.5 rounded-lg hover:bg-[#F0FDF4] hover:text-[#25D366] transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Users size={13} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-500 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <ToggleLeft size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agent detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40">
          <div
            className="rounded-t-3xl sm:rounded-2xl border w-full sm:max-w-[500px] shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b sticky top-0 rounded-t-3xl sm:rounded-t-2xl"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="font-display font-bold text-[16px]"
                style={{ color: "var(--text-primary)" }}
              >
                Agent Profile
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-5">
              {/* Profile header */}
              <div
                className="flex items-center gap-4 mb-5 pb-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="relative">
                  <img
                    src={selected.avatar}
                    alt={selected.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${statusColors[selected.status]}`}
                  />
                </div>
                <div>
                  <div
                    className="font-display font-bold text-[18px]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selected.name}
                  </div>
                  <div
                    className="text-[13px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selected.role} · {selected.dept}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i <= Math.round(selected.rating)
                            ? "fill-amber-400 stroke-amber-400"
                            : "stroke-gray-200 fill-gray-100"
                        }
                      />
                    ))}
                    <span
                      className="text-[12px] ml-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {selected.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance stats */}
              <div className="mb-5">
                <div
                  className="text-[12px] uppercase tracking-wider font-semibold mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Performance
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Active Chats",
                      value: selected.activeChats,
                      color: "#25D366",
                    },
                    {
                      label: "Resolved Today",
                      value: selected.resolvedToday,
                      color: "#3B82F6",
                    },
                    {
                      label: "Avg Response",
                      value: selected.avgResponse,
                      color: "#F59E0B",
                    },
                    {
                      label: "Satisfaction",
                      value: `${selected.rating}/5`,
                      color: "#8B5CF6",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3"
                      style={{ background: "var(--bg-input)" }}
                    >
                      <div
                        className="font-display font-bold text-[20px]"
                        style={{ color }}
                      >
                        {value}
                      </div>
                      <div
                        className="text-[12px] mt-0.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <div
                  className="text-[12px] uppercase tracking-wider font-semibold mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl text-[#25D366] text-[12px] font-medium"
                      style={{ background: "var(--bg-active)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Teams */}
              <div className="mb-5">
                <div
                  className="text-[12px] uppercase tracking-wider font-semibold mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Teams
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.teams.map((team) => (
                    <span
                      key={team}
                      className="px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-[12px] font-medium"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working hours */}
              <div
                className="p-3 rounded-xl border flex items-center gap-3"
                style={{
                  background: "var(--bg-input)",
                  borderColor: "var(--border)",
                }}
              >
                <Calendar size={16} style={{ color: "var(--text-muted)" }} />
                <div>
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Working Hours
                  </div>
                  <div
                    className="text-[13px] font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selected.workingHours}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  className="py-2.5 rounded-xl text-[#25D366] text-[13px] font-semibold hover:bg-[#DCFCE7] transition-colors"
                  style={{ background: "var(--bg-active)" }}
                >
                  Assign Conversations
                </button>
                <button
                  className="py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#F1F5F9] transition-colors"
                  style={{
                    background: "var(--bg-input)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Set Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
