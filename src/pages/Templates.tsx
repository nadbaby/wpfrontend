import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  ChevronRight,
  X,
  MessageSquare,
  AlignLeft,
  Type,
  Smartphone,
} from "lucide-react"

const templates = [
  {
    id: 1,
    name: "order_confirmation",
    category: "Utility",
    lang: "English",
    status: "approved",
    updated: "Sep 20, 2026",
    author: "Arjun S.",
    body: "Hi {{1}}, your order #{{2}} has been confirmed! Expected delivery: {{3}}. Track here: {{4}}",
  },
  {
    id: 2,
    name: "welcome_message",
    category: "Marketing",
    lang: "English",
    status: "approved",
    updated: "Sep 18, 2026",
    author: "Sneha P.",
    body: "Welcome to {{1}}, {{2}}! 🎉 We're thrilled to have you. Explore our latest offers: {{3}}",
  },
  {
    id: 3,
    name: "otp_verification",
    category: "Authentication",
    lang: "English",
    status: "approved",
    updated: "Sep 15, 2026",
    author: "Rahul K.",
    body: "Your {{1}} verification code is: {{2}}. This code expires in {{3}} minutes. Do not share it.",
  },
  {
    id: 4,
    name: "shipping_update",
    category: "Utility",
    lang: "English",
    status: "pending",
    updated: "Sep 22, 2026",
    author: "Arjun S.",
    body: "Hello {{customer_name}}, your order is out for delivery! Expected by {{delivery_time}}.",
  },
  {
    id: 5,
    name: "feedback_request",
    category: "Customer Support",
    lang: "English",
    status: "draft",
    updated: "Sep 23, 2026",
    author: "Sneha P.",
    body: "Hi {{1}}, how was your recent experience with us? Rate us: {{2}}",
  },
  {
    id: 6,
    name: "payment_reminder",
    category: "Utility",
    lang: "Hindi",
    status: "rejected",
    updated: "Sep 10, 2026",
    author: "Rahul K.",
    body: "Dear {{customer_name}}, your payment of ₹{{amount}} is due on {{due_date}}. Pay now: {{link}}",
  },
]

const categories = [
  "All",
  "Marketing",
  "Utility",
  "Authentication",
  "Customer Support",
]
const statusColors: Record<string, string> = {
  approved: "bg-[#F0FDF4] text-[#25D366]",
  pending: "bg-amber-50 text-amber-600",
  draft: "bg-gray-100 text-gray-500",
  rejected: "bg-red-50 text-red-500",
}
const statusIcons: Record<string, typeof CheckCircle> = {
  approved: CheckCircle,
  pending: Clock,
  draft: FileText,
  rejected: XCircle,
}

export default function Templates() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [selected, setSelected] = useState<typeof templates[0] | null>(null)
  // Create form state
  const [tName, setTName] = useState("")
  const [tCat, setTCat] = useState("Marketing")
  const [tLang, setTLang] = useState("English")
  const [tHeader, setTHeader] = useState("")
  const [tBody, setTBody] = useState("")
  const [tFooter, setTFooter] = useState("")

  const filtered = templates.filter((t) => {
    const matchCat = category === "All" || t.category === category
    const matchSearch =
      t.name.includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const previewBody = tBody
    .replace(/{{1}}/g, "Customer Name")
    .replace(/{{2}}/g, "ORD-2847")
    .replace(/{{customer_name}}/g, "Priya")
    .replace(/{{order_id}}/g, "ORD-2847")

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={{ color: "var(--text-primary)" }}
          >
            Message Templates
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage and create WhatsApp Business message templates
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#22C55E] text-white rounded-xl text-[13px] font-semibold transition-colors"
        >
          <Plus size={16} />
          Create Template
        </button>
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
            placeholder="Search templates..."
            className="flex-1 bg-transparent text-[13px] placeholder-[#94A3B8] outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-2 rounded-xl text-[12.5px] font-medium whitespace-nowrap border transition-colors"
              style={{
                background:
                  category === c ? "var(--bg-active)" : "var(--bg-card)",
                color: category === c ? "#25D366" : "var(--text-secondary)",
                borderColor: category === c ? "#25D366" : "var(--border)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)" }}>
              {[
                "Template Name",
                "Category",
                "Language",
                "Status",
                "Updated",
                "Author",
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
            {filtered.map((t) => {
              const StatusIcon = statusIcons[t.status]
              return (
                <tr
                  key={t.id}
                  className="border-b hover:bg-[var(--bg-hover)] transition-colors"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td className="px-4 py-3">
                    <div
                      className="font-mono text-[12.5px] font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[11.5px] font-medium"
                      style={{
                        background: "var(--bg-input)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-[12.5px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.lang}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold capitalize ${statusColors[t.status]}`}
                    >
                      <StatusIcon size={11} />
                      {t.status}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-[12px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.updated}
                  </td>
                  <td
                    className="px-4 py-3 text-[12.5px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.author}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelected(t)}
                        className="p-1.5 rounded-lg hover:bg-[#F0FDF4] hover:text-[#25D366] transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <FileText
              size={32}
              className="mx-auto mb-3"
              style={{ color: "var(--border)" }}
            />
            <div
              className="text-[14px] font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              No templates found
            </div>
          </div>
        )}
      </div>

      {/* Template detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div
            className="rounded-2xl border w-full max-w-[500px] shadow-2xl"
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
                  className="font-display font-semibold text-[15px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selected.name}
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selected.category} · {selected.lang}
                </div>
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
              <div className="bg-[#EEF0F2] rounded-2xl p-4 mb-4">
                <div
                  className="rounded-xl p-3 max-w-[80%] mx-auto shadow-sm"
                  style={{ background: "var(--bg-card)" }}
                >
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selected.body}
                  </p>
                  <div
                    className="text-[10px] text-right mt-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    10:30 AM ✓✓
                  </div>
                </div>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold capitalize ${statusColors[selected.status]}`}
              >
                {selected.status}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create template modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div
            className="rounded-2xl border w-full max-w-[900px] max-h-[90vh] shadow-2xl flex flex-col"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div
                  className="font-display font-bold text-[16px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Create Template
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Create a new WhatsApp Business message template
                </div>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Form */}
                <div
                  className="p-6 space-y-4 border-r"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <label
                      className="text-[12px] font-medium mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Template Name *
                    </label>
                    <input
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                      placeholder="e.g. order_confirmation"
                      className="w-full h-9 px-3 rounded-xl border text-[13px] font-mono outline-none focus:border-[#25D366] transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <div
                      className="text-[11px] mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Lowercase letters, numbers, and underscores only
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-[12px] font-medium mb-1.5 block"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Category *
                      </label>
                      <select
                        value={tCat}
                        onChange={(e) => setTCat(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366]"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-card)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {[
                          "Marketing",
                          "Utility",
                          "Authentication",
                          "Customer Support",
                        ].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="text-[12px] font-medium mb-1.5 block"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Language *
                      </label>
                      <select
                        value={tLang}
                        onChange={(e) => setTLang(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366]"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-card)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {["English", "Hindi", "Tamil", "Telugu"].map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[12px] font-medium mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Header (optional)
                    </label>
                    <input
                      value={tHeader}
                      onChange={(e) => setTHeader(e.target.value)}
                      placeholder="Header text..."
                      className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className="text-[12px] font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Body *
                      </label>
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {tBody.length}/1024
                      </span>
                    </div>
                    <textarea
                      value={tBody}
                      onChange={(e) => setTBody(e.target.value)}
                      placeholder="Enter your message body. Use {{1}}, {{2}} for variables..."
                      className="w-full px-3 py-2.5 rounded-xl border text-[13px] outline-none resize-none focus:border-[#25D366] transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                      rows={5}
                    />
                    <div className="flex gap-2 mt-1.5">
                      {[
                        "{{1}}",
                        "{{2}}",
                        "{{customer_name}}",
                        "{{order_id}}",
                      ].map((v) => (
                        <button
                          key={v}
                          onClick={() => setTBody((b) => b + v)}
                          className="px-2 py-1 rounded-lg text-[11px] font-mono font-semibold hover:bg-[#DCFCE7] transition-colors text-[#25D366]"
                          style={{ background: "var(--bg-active)" }}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[12px] font-medium mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Footer (optional)
                    </label>
                    <input
                      value={tFooter}
                      onChange={(e) => setTFooter(e.target.value)}
                      placeholder="Footer text..."
                      className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone
                      size={15}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Live Preview
                    </span>
                  </div>
                  <div className="bg-[#EEF0F2] rounded-2xl p-4 min-h-[200px]">
                    {tHeader || tBody || tFooter ? (
                      <div
                        className="rounded-xl rounded-tl-sm p-3 max-w-[85%] shadow-sm"
                        style={{ background: "var(--bg-card)" }}
                      >
                        {tHeader && (
                          <div
                            className="font-semibold text-[13px] mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {tHeader}
                          </div>
                        )}
                        {tBody && (
                          <p
                            className="text-[12.5px] leading-relaxed whitespace-pre-wrap"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {previewBody}
                          </p>
                        )}
                        {tFooter && (
                          <div
                            className="text-[11px] mt-2"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {tFooter}
                          </div>
                        )}
                        <div
                          className="text-[10px] text-right mt-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          10:30 AM ✓✓
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[180px] text-center">
                        <MessageSquare
                          size={28}
                          className="mb-2 text-[#CBD5E1]"
                        />
                        <div
                          className="text-[12px]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Start filling in the form to see your template preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-end gap-2 px-6 py-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl border text-[13px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Save Draft
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#22C55E] text-white text-[13px] font-semibold transition-colors"
              >
                Submit Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
