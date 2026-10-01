import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"

import {
  Users,
  FileSpreadsheet,
  Phone,
  Calendar,
  Send,
  MessageSquare,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react"

type TargetType = "list" | "excel" | "manual"

type ScheduleType = "instant" | "scheduled"

export default function Broadcast() {
  const [targetType, setTargetType] = useState<TargetType>("manual")

  const [scheduleType, setScheduleType] = useState<ScheduleType>("instant")

  const [selectedTemplate, setSelectedTemplate] = useState("")

  // Mock template list

  const templates = [
    { id: "tmpl_1", name: "Welcome Message", category: "MARKETING" },

    { id: "tmpl_2", name: "Order Confirmation", category: "UTILITY" },

    { id: "tmpl_3", name: "Promo Offer", category: "MARKETING" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    alert("Broadcast submitted to the backend!")
  }

  return (
    <div className="p-6 max-w-6xl mx-auto w-full h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center">
            <Send className="text-[#25D366]" size={24} />
          </div>
          Broadcast Studio
        </h2>
        <p className="text-[var(--text-secondary)] mt-2">
          Design and launch your WhatsApp campaigns across your audience.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max"
      >
        {/* BENTO CARD 1: Audience (col-span-2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="col-span-1 lg:col-span-2 bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={120} />
          </div>

          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 relative z-10">
            Target Audience
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10">
            Who should receive this campaign?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mb-6">
            <button
              type="button"
              onClick={() => setTargetType("manual")}
              className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all ${
                targetType === "manual"
                  ? "border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/30 bg-[var(--bg-base)]"
              }`}
            >
              <Phone
                size={24}
                className={`mb-3 ${
                  targetType === "manual" ? "text-[#25D366]" : ""
                }`}
              />
              <span className="font-semibold text-sm">Manual Numbers</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType("list")}
              className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all ${
                targetType === "list"
                  ? "border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/30 bg-[var(--bg-base)]"
              }`}
            >
              <Users
                size={24}
                className={`mb-3 ${
                  targetType === "list" ? "text-[#25D366]" : ""
                }`}
              />
              <span className="font-semibold text-sm">Contact List</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType("excel")}
              className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all ${
                targetType === "excel"
                  ? "border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/30 bg-[var(--bg-base)]"
              }`}
            >
              <FileSpreadsheet
                size={24}
                className={`mb-3 ${
                  targetType === "excel" ? "text-[#25D366]" : ""
                }`}
              />
              <span className="font-semibold text-sm">Upload CSV</span>
            </button>
          </div>

          <div className="relative z-10 bg-[var(--bg-base)] p-5 rounded-2xl border border-[var(--border)]">
            {targetType === "manual" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)]">
                  Enter Phone Numbers
                </label>
                <textarea
                  className="w-full bg-[var(--bg-card)] border-none rounded-xl p-4 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366] min-h-[120px] shadow-sm"
                  placeholder="Enter numbers separated by commas (e.g. 1234567890, 0987654321)"
                />
              </div>
            )}
            {targetType === "list" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)]">
                  Select User Group
                </label>
                <select className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-xl p-4 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366]">
                  <option>All Customers</option>
                  <option>VIP Customers</option>
                  <option>Recent Buyers</option>
                </select>
              </div>
            )}
            {targetType === "excel" && (
              <div className="text-center py-8 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-card)]">
                <FileSpreadsheet
                  className="mx-auto text-[var(--text-muted)] mb-3"
                  size={32}
                />
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Drag & drop your Excel or CSV file
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Make sure it has a "phone" column.
                </p>
                <button
                  type="button"
                  className="mt-5 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] text-sm font-bold rounded-xl hover:bg-[#25D366]/20 transition-colors"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* BENTO CARD 2: Template (col-span-1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#25D366]/10 rounded-full blur-3xl" />

          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 relative z-10">
            Message Template
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10">
            Select an approved Meta template to broadcast.
          </p>

          <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center mb-2 shadow-sm">
              <MessageSquare className="text-[var(--text-primary)]" size={28} />
            </div>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-2xl p-4 text-sm font-medium text-[var(--text-primary)] shadow-sm focus:ring-2 focus:ring-[#25D366]"
              required
            >
              <option value="" disabled>
                Browse templates...
              </option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
            <div className="mt-auto pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <Sparkles size={14} className="text-yellow-500" />
                Templates must be pre-approved by WhatsApp.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BENTO CARD 3: Schedule (col-span-2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="col-span-1 lg:col-span-2 bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Delivery Schedule
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            When do you want this campaign to go live?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                scheduleType === "instant"
                  ? "border-[#25D366] bg-[#25D366]/5"
                  : "border-[var(--border)] hover:border-[#25D366]/30 bg-[var(--bg-base)]"
              }`}
            >
              <input
                type="radio"
                name="schedule"
                checked={scheduleType === "instant"}
                onChange={() => setScheduleType("instant")}
                className="hidden"
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  scheduleType === "instant"
                    ? "bg-[#25D366] text-white shadow-md"
                    : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                <Zap size={18} />
              </div>
              <div>
                <div className="text-base font-bold text-[var(--text-primary)] mb-0.5">
                  Send Instantly
                </div>
                <div className="text-sm text-[var(--text-secondary)] leading-snug">
                  Begin processing the queue right now.
                </div>
              </div>
            </label>

            <label
              className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                scheduleType === "scheduled"
                  ? "border-[#25D366] bg-[#25D366]/5"
                  : "border-[var(--border)] hover:border-[#25D366]/30 bg-[var(--bg-base)]"
              }`}
            >
              <input
                type="radio"
                name="schedule"
                checked={scheduleType === "scheduled"}
                onChange={() => setScheduleType("scheduled")}
                className="hidden"
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  scheduleType === "scheduled"
                    ? "bg-[#25D366] text-white shadow-md"
                    : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                <Clock size={18} />
              </div>
              <div>
                <div className="text-base font-bold text-[var(--text-primary)] mb-0.5">
                  Schedule for Later
                </div>
                <div className="text-sm text-[var(--text-secondary)] leading-snug">
                  Configure a specific date and time.
                </div>
              </div>
            </label>
          </div>

          <AnimatePresence>
            {scheduleType === "scheduled" && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[var(--bg-base)] p-5 rounded-2xl border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Calendar size={16} className="text-[#25D366]" />
                      Launch Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-xl p-3.5 text-sm font-medium text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Clock size={16} className="text-[#25D366]" />
                      Launch Time
                    </label>
                    <input
                      type="time"
                      className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-xl p-3.5 text-sm font-medium text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366]"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* BENTO CARD 4: Action/Submit (col-span-1) */}
        <motion.button
          type="submit"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 bg-[#25D366] text-white rounded-[32px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-8 backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform">
            <Send size={24} fill="currentColor" />
          </div>

          <div className="text-left relative z-10 w-full">
            <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-white/90">
              {scheduleType === "instant" ? "Launch Blast" : "Schedule Blast"}
            </h3>
            <p className="text-sm text-green-50 font-medium">
              Click to confirm action &rarr;
            </p>
          </div>
        </motion.button>
      </form>
    </div>
  )
}
