import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, Variants } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Settings,
  Shield,
  Crown,
  QrCode,
  Smartphone,
  Globe,
  RefreshCw,
  Bell,
  Star,
  Calendar,
} from "lucide-react"

const messageData = [
  { month: "Jan", sent: 4200, received: 3100, delivered: 3900 },
  { month: "Feb", sent: 5800, received: 4200, delivered: 5500 },
  { month: "Mar", sent: 4800, received: 3800, delivered: 4600 },
  { month: "Apr", sent: 7200, received: 5900, delivered: 7000 },
  { month: "May", sent: 6100, received: 4700, delivered: 5900 },
  { month: "Jun", sent: 8400, received: 6800, delivered: 8100 },
  { month: "Jul", sent: 9200, received: 7400, delivered: 8900 },
  { month: "Aug", sent: 11000, received: 8900, delivered: 10500 },
  { month: "Sep", sent: 10200, received: 8200, delivered: 9800 },
]

const weeklyData = [
  { day: "Mon", conversations: 42 },
  { day: "Tue", conversations: 61 },
  { day: "Wed", conversations: 55 },
  { day: "Thu", conversations: 78 },
  { day: "Fri", conversations: 90 },
  { day: "Sat", conversations: 34 },
  { day: "Sun", conversations: 22 },
]

const categoryData = [
  { name: "Support", value: 45, color: "#25D366" },
  { name: "Sales", value: 28, color: "#3B82F6" },
  { name: "Marketing", value: 15, color: "#8B5CF6" },
  { name: "Technical", value: 12, color: "#F59E0B" },
]

const responseTimeData = [
  { week: "W1", time: 5.2 },
  { week: "W2", time: 4.8 },
  { week: "W3", time: 4.1 },
  { week: "W4", time: 3.7 },
  { week: "W5", time: 3.3 },
  { week: "W6", time: 2.9 },
]

const resourceData = [
  {
    name: "Automation\nBuilder",
    icon: Zap,
    color: "#8B5CF6",
    value: 0,
    utilized: 0,
  },
  {
    name: "Message\nTemplates",
    icon: MessageSquare,
    color: "#F59E0B",
    value: 2,
    utilized: 12,
  },
  {
    name: "Broadcast\nCampaigns",
    icon: Bell,
    color: "#3B82F6",
    value: 0,
    limit: 30,
    utilized: 0,
  },
  {
    name: "Agents",
    icon: Users,
    color: "#10B981",
    value: 0,
    limit: 5,
    utilized: 0,
  },
  {
    name: "Event\nNotifications",
    icon: Star,
    color: "#EC4899",
    value: 0,
    utilized: 0,
  },
]

const quickActions = [
  { label: "Broadcast...", sublabel: "Send broadcast...", icon: Bell },
  { label: "Toolset", sublabel: "Manage chat bot &...", icon: Zap },
]

const recentConversations = [
  {
    name: "Priya Singh",
    msg: "Thank you for the quick response!",
    time: "2m",
    unread: 2,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=40&h=40&fit=crop",
    online: true,
  },
  {
    name: "Rajesh Kumar",
    msg: "When will my order be delivered?",
    time: "15m",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    online: false,
  },
  {
    name: "Ananya Patel",
    msg: "I need help with my account",
    time: "1h",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    online: true,
  },
  {
    name: "Vikram Shah",
    msg: "Please send the invoice again",
    time: "3h",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    online: false,
  },
]

const stats = [
  {
    label: "Total Messages",
    value: "48,293",
    change: "+12.4%",
    up: true,
    icon: MessageSquare,
    color: "#25D366",
  },
  {
    label: "Active Contacts",
    value: "3,847",
    change: "+8.1%",
    up: true,
    icon: Users,
    color: "#3B82F6",
  },
  {
    label: "Resolved Today",
    value: "127",
    change: "+23.5%",
    up: true,
    icon: CheckCircle2,
    color: "#8B5CF6",
  },
  {
    label: "Avg Response",
    value: "3.3 min",
    change: "-0.8 min",
    up: true,
    icon: Clock,
    color: "#F59E0B",
  },
]

const card = { background: "var(--bg-card)", border: "1px solid var(--border)" }
const textPrimary = { color: "var(--text-primary)" }
const textSecondary = { color: "var(--text-secondary)" }
const textMuted = { color: "var(--text-muted)" }
const bgInput = { background: "var(--bg-input)" }
const bgHover = { background: "var(--bg-hover)" }

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export default function Dashboard() {
  const [period, setPeriod] = useState("This Year")
  const navigate = useNavigate()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6 max-w-[1400px]"
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={textPrimary}
          >
            Analytics Dashboard
          </h1>
          <p className="text-[13.5px] mt-0.5" style={textSecondary}>
            Monitor your business performance in real time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-[13px] font-medium rounded-xl px-3 py-2 cursor-pointer outline-none transition-colors"
            style={{ ...card, color: "var(--text-primary)" }}
          >
            <option>This Year</option>
            <option>This Month</option>
            <option>This Week</option>
            <option>Today</option>
          </select>
          <button
            className="p-2 rounded-xl transition-colors"
            style={{ ...card, color: "var(--text-secondary)" }}
          >
            <Calendar size={16} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <motion.div
            key={label}
            variants={item}
            whileHover={{
              y: -4,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
            className="rounded-2xl p-4 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            style={card}
          >
            <div
              className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500"
              style={{ backgroundColor: color }}
            />
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <span
                className={`flex items-center gap-1 text-[11.5px] font-semibold ${up ? "text-emerald-500" : "text-red-500"
                  }`}
              >
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            </div>
            <div
              className="font-display font-bold text-[22px]"
              style={textPrimary}
            >
              {value}
            </div>
            <div
              className="text-[12px] mt-0.5 relative z-10"
              style={textSecondary}
            >
              {label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Messages area chart */}
        <motion.div
          variants={item}
          className="xl:col-span-2 rounded-2xl p-5"
          style={card}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div
                className="font-display font-semibold text-[15px]"
                style={textPrimary}
              >
                Message Activity
              </div>
              <div className="text-[12.5px]" style={textSecondary}>
                Sent, received & delivered this year
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              {[
                { label: "Sent", color: "#25D366" },
                { label: "Received", color: "#3B82F6" },
                { label: "Delivered", color: "#8B5CF6" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-1.5 rounded-full block"
                    style={{ backgroundColor: color }}
                  />
                  <span style={textMuted}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={messageData}
              margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25D366" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#25D366" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
                cursor={{ stroke: "var(--border)" }}
              />
              <Area
                type="monotone"
                dataKey="sent"
                stroke="#25D366"
                strokeWidth={2}
                fill="url(#colorSent)"
                dot={false}
                activeDot={{ r: 4, fill: "#25D366" }}
              />
              <Area
                type="monotone"
                dataKey="received"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorReceived)"
                dot={false}
                activeDot={{ r: 4, fill: "#3B82F6" }}
              />
              <Area
                type="monotone"
                dataKey="delivered"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="none"
                dot={false}
                activeDot={{ r: 4, fill: "#8B5CF6" }}
                strokeDasharray="4 2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category donut */}
        <motion.div
          variants={item}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={card}
        >
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#8B5CF6]/5 blur-[40px] rounded-full" />
          <div
            className="font-display font-semibold text-[15px] mb-1 relative z-10"
            style={textPrimary}
          >
            Conversations by Type
          </div>
          <div className="text-[12.5px] mb-4" style={textSecondary}>
            Category breakdown
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[12px]" style={textSecondary}>
                    {name}
                  </span>
                </div>
                <span className="text-[12px] font-semibold" style={textPrimary}>
                  {value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Weekly bar chart */}
        <motion.div variants={item} className="rounded-2xl p-5" style={card}>
          <div
            className="font-display font-semibold text-[15px] mb-1"
            style={textPrimary}
          >
            Weekly Conversations
          </div>
          <div className="text-[12.5px] mb-4" style={textSecondary}>
            Volume by day this week
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
                cursor={{ fill: "var(--bg-hover)" }}
              />
              <Bar
                dataKey="conversations"
                fill="#25D366"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Response time trend */}
        <motion.div variants={item} className="rounded-2xl p-5" style={card}>
          <div
            className="font-display font-semibold text-[15px] mb-1"
            style={textPrimary}
          >
            Avg Response Time
          </div>
          <div className="text-[12.5px] mb-4" style={textSecondary}>
            6-week trend (minutes)
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart
              data={responseTimeData}
              margin={{ top: 0, right: 10, left: -30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
                cursor={{ stroke: "var(--border)" }}
              />
              <Area
                type="monotone"
                dataKey="time"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorResp)"
                dot={{ fill: "#3B82F6", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent conversations */}
        <motion.div variants={item} className="rounded-2xl p-5" style={card}>
          <div className="flex items-center justify-between mb-4">
            <div
              className="font-display font-semibold text-[15px]"
              style={textPrimary}
            >
              Recent Chats
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="text-[12px] text-[#25D366] font-semibold hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-1">
            {recentConversations.map((conv) => (
              <div
                key={conv.name}
                onClick={() => navigate('/chat')}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer group"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-card)] ${conv.online ? "bg-[#25D366]" : "bg-gray-400"
                      }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[13px] font-semibold truncate"
                      style={textPrimary}
                    >
                      {conv.name}
                    </span>
                    <span
                      className="text-[11px] ml-2 flex-shrink-0"
                      style={textMuted}
                    >
                      {conv.time}
                    </span>
                  </div>
                  <div
                    className="text-[12px] truncate mt-0.5"
                    style={textSecondary}
                  >
                    {conv.msg}
                  </div>
                </div>
                {conv.unread > 0 && (
                  <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {conv.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resource Insights */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div
              className="font-display font-semibold text-[16px]"
              style={textPrimary}
            >
              Resource Insights
            </div>
            <div className="text-[12.5px]" style={textSecondary}>
              Your current plan utilization
            </div>
          </div>
          <button
            className="p-2 rounded-xl transition-colors"
            style={{ ...bgInput, color: "var(--text-secondary)" }}
          >
            <RefreshCw size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {resourceData.map(
            ({ name, icon: Icon, color, value, limit, utilized }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1A1D27]/80 backdrop-blur-md border border-[var(--border)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div
                  className="text-[12px] leading-tight mb-2 whitespace-pre-line"
                  style={textSecondary}
                >
                  {name}
                </div>
                <div
                  className="font-display font-bold text-[24px]"
                  style={textPrimary}
                >
                  {value}
                  {limit && (
                    <span className="text-[13px] font-normal" style={textMuted}>
                      {" "}
                      /{limit}
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={bgInput}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${utilized}%`, backgroundColor: color }}
                    />
                  </div>
                  <div
                    className="text-[10.5px] mt-1 font-medium"
                    style={textMuted}
                  >
                    {utilized}% utilized
                  </div>
                </div>
              </motion.div>
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
