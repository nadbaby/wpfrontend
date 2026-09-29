import { useState } from "react"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  X,
  Smartphone,
  ExternalLink,
  Sparkles,
  Check,
  Image as ImageIcon,
  Type,
  FileCode,
} from "lucide-react"
import {
  WhatsAppPhoneMockup,
  TemplateButton,
} from "../components/WhatsAppPhoneMockup"

interface TemplateItem {
  id: number
  name: string
  category: string
  lang: string
  status: "approved" | "pending" | "draft" | "rejected"
  updated: string
  author: string
  headerType?: "none" | "text" | "image" | "document"
  headerText?: string
  body: string
  footer?: string
  buttons?: TemplateButton[]
}

const initialTemplates: TemplateItem[] = [
  {
    id: 1,
    name: "order_confirmation",
    category: "Utility",
    lang: "English",
    status: "approved",
    updated: "Sep 20, 2026",
    author: "Arjun S.",
    headerType: "text",
    headerText: "Order Confirmed 🎉",
    body: "Hi {{1}}, your order #{{2}} has been confirmed! Expected delivery: {{3}}. Track here: {{4}}",
    footer: "Thank you for shopping with us!",
    buttons: [
      { type: "url", text: "Track Order", value: "https://track.example.com" },
      { type: "quick_reply", text: "Contact Support" },
    ],
  },
  {
    id: 2,
    name: "welcome_message",
    category: "Marketing",
    lang: "English",
    status: "approved",
    updated: "Sep 18, 2026",
    author: "Sneha P.",
    headerType: "image",
    headerText: "",
    body: "Welcome to {{1}}, {{2}}! 🎉 We're thrilled to have you onboard. Explore our exclusive new collection with flat 20% off: {{3}}",
    footer: "Reply STOP to unsubscribe",
    buttons: [
      { type: "url", text: "Shop Now 🛍️", value: "https://shop.example.com" },
    ],
  },
  {
    id: 3,
    name: "otp_verification",
    category: "Authentication",
    lang: "English",
    status: "approved",
    updated: "Sep 15, 2026",
    author: "Rahul K.",
    headerType: "none",
    body: "Your {{1}} verification security code is: {{2}}. This code will expire in {{3}} minutes. Do not share this code with anyone.",
    footer: "Security alert from WhatsApi",
    buttons: [{ type: "quick_reply", text: "Copy Code" }],
  },
  {
    id: 4,
    name: "shipping_update",
    category: "Utility",
    lang: "English",
    status: "pending",
    updated: "Sep 22, 2026",
    author: "Arjun S.",
    headerType: "text",
    headerText: "Out For Delivery 🚚",
    body: "Hello {{customer_name}}, your package with order ID {{order_id}} is out for delivery! Expected arrival by {{delivery_time}}.",
    footer: "Please ensure someone is available to receive.",
    buttons: [
      { type: "phone", text: "Call Driver", value: "+919876543210" },
    ],
  },
  {
    id: 5,
    name: "feedback_request",
    category: "Customer Support",
    lang: "English",
    status: "draft",
    updated: "Sep 23, 2026",
    author: "Sneha P.",
    headerType: "none",
    body: "Hi {{1}}, how was your recent customer support experience with us? Rate us: {{2}}",
    footer: "Your feedback helps us improve.",
    buttons: [
      { type: "quick_reply", text: "⭐⭐⭐⭐⭐ Great" },
      { type: "quick_reply", text: "Need Follow-up" },
    ],
  },
  {
    id: 6,
    name: "payment_reminder",
    category: "Utility",
    lang: "Hindi",
    status: "rejected",
    updated: "Sep 10, 2026",
    author: "Rahul K.",
    headerType: "document",
    headerText: "Invoice_INV8492.pdf",
    body: "Dear {{customer_name}}, your pending invoice payment of {{amount}} is due on {{due_date}}. Pay securely online: {{link}}",
    footer: "Fine Bearing Pvt. Ltd.",
    buttons: [{ type: "url", text: "Pay Now 💳", value: "https://pay.example.com" }],
  },
]

const categories = [
  "All",
  "Marketing",
  "Utility",
  "Authentication",
  "Customer Support",
]

const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Spanish",
  "Arabic",
  "French",
  "German",
]

const statusColors: Record<string, string> = {
  approved: "bg-[#F0FDF4] text-[#25D366] border border-[#25D366]/20",
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
  draft: "bg-gray-100 text-gray-500 border border-gray-200",
  rejected: "bg-red-50 text-red-500 border border-red-200",
}

const statusIcons: Record<string, typeof CheckCircle> = {
  approved: CheckCircle,
  pending: Clock,
  draft: FileText,
  rejected: XCircle,
}

export default function Templates() {
  const [templateList, setTemplateList] = useState<TemplateItem[]>(initialTemplates)
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selected, setSelected] = useState<TemplateItem | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  // Form states
  const [tName, setTName] = useState("")
  const [tCat, setTCat] = useState("Marketing")
  const [tLang, setTLang] = useState("English")
  const [tHeaderType, setTHeaderType] = useState<"none" | "text" | "image" | "document">("text")
  const [tHeader, setTHeader] = useState("")
  const [tBody, setTBody] = useState("")
  const [tFooter, setTFooter] = useState("")
  const [tButtons, setTButtons] = useState<TemplateButton[]>([])

  const openCreateModal = () => {
    setEditingId(null)
    setTName("")
    setTCat("Marketing")
    setTLang("English")
    setTHeaderType("text")
    setTHeader("Special Announcement 📣")
    setTBody("Hello {{1}},\n\nWe have exciting updates regarding {{2}}! Check out the details below.")
    setTFooter("Reply STOP to opt out")
    setTButtons([
      { type: "url", text: "Learn More 🚀", value: "https://example.com" },
    ])
    setShowCreate(true)
  }

  const openEditModal = (t: TemplateItem) => {
    setEditingId(t.id)
    setTName(t.name)
    setTCat(t.category)
    setTLang(t.lang)
    setTHeaderType(t.headerType || "none")
    setTHeader(t.headerText || "")
    setTBody(t.body)
    setTFooter(t.footer || "")
    setTButtons(t.buttons || [])
    setShowCreate(true)
  }

  const handleSave = (status: "approved" | "draft" | "pending") => {
    if (!tName.trim()) {
      alert("Please enter a template name")
      return
    }
    if (!tBody.trim()) {
      alert("Please enter template body message")
      return
    }

    if (editingId) {
      setTemplateList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: tName.toLowerCase().replace(/\s+/g, "_"),
                category: tCat,
                lang: tLang,
                status,
                updated: "Just now",
                headerType: tHeaderType,
                headerText: tHeader,
                body: tBody,
                footer: tFooter,
                buttons: tButtons,
              }
            : item
        )
      )
    } else {
      const newTemplate: TemplateItem = {
        id: Date.now(),
        name: tName.toLowerCase().replace(/\s+/g, "_"),
        category: tCat,
        lang: tLang,
        status,
        updated: "Just now",
        author: "Arjun S.",
        headerType: tHeaderType,
        headerText: tHeader,
        body: tBody,
        footer: tFooter,
        buttons: tButtons,
      }
      setTemplateList((prev) => [newTemplate, ...prev])
    }

    setShowCreate(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplateList((prev) => prev.filter((t) => t.id !== id))
      if (selected?.id === id) setSelected(null)
    }
  }

  const handleDuplicate = (t: TemplateItem) => {
    const dup: TemplateItem = {
      ...t,
      id: Date.now(),
      name: `${t.name}_copy`,
      updated: "Just now",
      status: "draft",
    }
    setTemplateList((prev) => [dup, ...prev])
  }

  const handleCopyBody = (t: TemplateItem) => {
    navigator.clipboard.writeText(t.body)
    setCopiedId(t.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const addButton = (type: "quick_reply" | "url" | "phone") => {
    if (tButtons.length >= 3) {
      alert("WhatsApp Business templates allow up to 3 buttons.")
      return
    }
    const defaultText =
      type === "url" ? "Visit Website" : type === "phone" ? "Call Us" : "Confirm"
    setTButtons([
      ...tButtons,
      {
        type,
        text: defaultText,
        value: type === "url" ? "https://example.com" : type === "phone" ? "+91 98765 43210" : "",
      },
    ])
  }

  const removeButton = (idx: number) => {
    setTButtons(tButtons.filter((_, i) => i !== idx))
  }

  const updateButton = (idx: number, patch: Partial<TemplateButton>) => {
    setTButtons(
      tButtons.map((btn, i) => (i === idx ? { ...btn, ...patch } : btn))
    )
  }

  const filtered = templateList.filter((t) => {
    const matchCat = category === "All" || t.category === category
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.body.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-4 sm:p-6 max-w-[1240px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Message Templates
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage WhatsApp Business message templates with live mobile phone preview
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-[13.5px] font-semibold shadow-sm hover:shadow transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div
          className="flex items-center gap-2 rounded-xl border px-3 h-10 flex-1 max-w-[380px] transition-all focus-within:border-[#25D366]"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <Search size={15} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates or content..."
            className="flex-1 bg-transparent text-[13px] placeholder-[#94A3B8] outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-2 rounded-xl text-[12.5px] font-medium whitespace-nowrap border transition-all"
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

      {/* Templates Table */}
      <div
        className="rounded-2xl border overflow-hidden shadow-xs"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-input)",
                }}
              >
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
                    className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filtered.map((t) => {
                const StatusIcon = statusIcons[t.status]
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                          <Smartphone size={14} />
                        </div>
                        <div>
                          <div
                            className="font-mono text-[13px] font-semibold hover:text-[#25D366] cursor-pointer transition-colors"
                            style={{ color: "var(--text-primary)" }}
                            onClick={() => setSelected(t)}
                          >
                            {t.name}
                          </div>
                          <div
                            className="text-[11px] truncate max-w-[200px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {t.body}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11.5px] font-medium inline-block"
                        style={{
                          background: "var(--bg-input)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3.5 text-[12.5px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t.lang}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize ${
                          statusColors[t.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <StatusIcon size={12} />
                        {t.status}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3.5 text-[12px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t.updated}
                    </td>
                    <td
                      className="px-4 py-3.5 text-[12.5px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t.author}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelected(t)}
                          className="p-1.5 rounded-lg hover:bg-[#F0FDF4] hover:text-[#25D366] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          title="Preview Template on Phone"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => openEditModal(t)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          title="Edit Template"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleCopyBody(t)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          title="Copy message body"
                        >
                          {copiedId === t.id ? (
                            <Check size={14} className="text-[#25D366]" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDuplicate(t)}
                          className="p-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          title="Duplicate"
                        >
                          <Sparkles size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                          style={{ color: "var(--text-muted)" }}
                          title="Delete Template"
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
        </div>

        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <FileText
              size={36}
              className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600"
            />
            <div
              className="text-[14px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No templates found
            </div>
            <p
              className="text-[12.5px] mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Try changing your search keywords or create a new template.
            </p>
          </div>
        )}
      </div>

      {/* FULL PHONE PREVIEW MODAL FOR VIEWING TEMPLATE */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="rounded-3xl border w-full max-w-[860px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                  <Smartphone size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-display font-bold text-[16px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selected.name}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                        statusColors[selected.status]
                      }`}
                    >
                      {selected.status}
                    </span>
                  </div>
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selected.category} · {selected.lang} · Updated {selected.updated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const toEdit = selected
                    setSelected(null)
                    openEditModal(toEdit)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[12.5px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Edit size={13} />
                  Edit
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-muted)]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body with Phone Preview */}
            <div className="p-6 overflow-y-auto flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
              {/* Phone Preview */}
              <div className="shrink-0">
                <WhatsAppPhoneMockup
                  headerType={selected.headerType}
                  headerText={selected.headerText}
                  bodyText={selected.body}
                  footerText={selected.footer}
                  buttons={selected.buttons}
                  initialTheme="dark"
                  showHistoryCallLogs={true}
                />
              </div>

              {/* Template Metadata & Raw Tokens */}
              <div className="flex-1 w-full space-y-4">
                <div
                  className="p-4 rounded-2xl border space-y-3"
                  style={{
                    background: "var(--bg-input)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    Template Details
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[12.5px]">
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">
                        Category
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {selected.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">
                        Language
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {selected.lang}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">
                        Created by
                      </span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {selected.author}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-[11px]">
                        Status
                      </span>
                      <span className="font-medium capitalize text-[var(--text-primary)]">
                        {selected.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-2xl border space-y-2"
                  style={{
                    background: "var(--bg-input)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Raw Message Body
                    </span>
                    <button
                      onClick={() => handleCopyBody(selected)}
                      className="text-[11px] font-medium text-[#25D366] hover:underline flex items-center gap-1"
                    >
                      {copiedId === selected.id ? (
                        <>
                          <Check size={11} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy Body
                        </>
                      )}
                    </button>
                  </div>
                  <pre
                    className="p-3 rounded-xl font-mono text-[12px] leading-relaxed whitespace-pre-wrap overflow-x-auto"
                    style={{
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {selected.body}
                  </pre>
                </div>

                {selected.buttons && selected.buttons.length > 0 && (
                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{
                      background: "var(--bg-input)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Configured Interactive Buttons ({selected.buttons.length})
                    </span>
                    <div className="space-y-1.5 pt-1">
                      {selected.buttons.map((btn, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px]"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[#25D366] font-semibold">
                              {btn.type === "url"
                                ? "URL"
                                : btn.type === "phone"
                                ? "CALL"
                                : "REPLY"}
                            </span>
                            <span className="font-medium text-[var(--text-primary)]">
                              {btn.text}
                            </span>
                          </div>
                          {btn.value && (
                            <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[180px]">
                              {btn.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE & EDIT TEMPLATE MODAL WITH LIVE PHONE SCREEN PREVIEW */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="rounded-3xl border w-full max-w-[1040px] max-h-[94vh] shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b shrink-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div
                  className="font-display font-bold text-[17px] tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {editingId ? "Edit Template" : "Create Template"}
                </div>
                <div
                  className="text-[12px] mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Configure your WhatsApp Business message template with real-time smartphone preview
                </div>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Split Form & Live Phone */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                {/* Left Side: Configuration Form */}
                <div
                  className="lg:col-span-7 p-5 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r"
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Template Name */}
                  <div>
                    <label
                      className="text-[12px] font-semibold mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Template Name *
                    </label>
                    <input
                      value={tName}
                      onChange={(e) =>
                        setTName(
                          e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                        )
                      }
                      placeholder="e.g. order_confirmation"
                      className="w-full h-10 px-3.5 rounded-xl border text-[13px] font-mono outline-none focus:border-[#25D366] transition-colors"
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

                  {/* Category & Language */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="text-[12px] font-semibold mb-1.5 block"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Category *
                      </label>
                      <select
                        value={tCat}
                        onChange={(e) => setTCat(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors cursor-pointer"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-input)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {[
                          "Marketing",
                          "Utility",
                          "Authentication",
                          "Customer Support",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className="text-[12px] font-semibold mb-1.5 block"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Language *
                      </label>
                      <select
                        value={tLang}
                        onChange={(e) => setTLang(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors cursor-pointer"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-input)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {languages.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Header Type & Input */}
                  <div>
                    <label
                      className="text-[12px] font-semibold mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Header (optional)
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                      {[
                        { id: "none", label: "None" },
                        { id: "text", label: "Text" },
                        { id: "image", label: "Image" },
                        { id: "document", label: "Document" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setTHeaderType(
                              type.id as "none" | "text" | "image" | "document"
                            )
                          }
                          className={`py-1.5 text-[11.5px] font-medium rounded-lg border transition-all ${
                            tHeaderType === type.id
                              ? "bg-[#25D366]/15 text-[#25D366] border-[#25D366]"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    {tHeaderType === "text" && (
                      <input
                        value={tHeader}
                        onChange={(e) => setTHeader(e.target.value)}
                        placeholder="Header text title (e.g. Order Update)..."
                        className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-input)",
                          color: "var(--text-primary)",
                        }}
                      />
                    )}

                    {tHeaderType === "document" && (
                      <input
                        value={tHeader}
                        onChange={(e) => setTHeader(e.target.value)}
                        placeholder="Document title or filename (e.g. invoice_march.pdf)..."
                        className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-input)",
                          color: "var(--text-primary)",
                        }}
                      />
                    )}

                    {tHeaderType === "image" && (
                      <div className="text-[12px] text-[var(--text-muted)] italic px-1">
                        Sample image media card will be displayed as the message banner.
                      </div>
                    )}
                  </div>

                  {/* Body Textarea with Tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className="text-[12px] font-semibold"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Body *
                      </label>
                      <span
                        className={`text-[11px] ${
                          tBody.length > 1024
                            ? "text-red-500 font-bold"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {tBody.length}/1024
                      </span>
                    </div>

                    <textarea
                      value={tBody}
                      onChange={(e) => setTBody(e.target.value)}
                      placeholder="Enter your message body. Use {{1}}, {{2}} for variables..."
                      className="w-full px-3 py-2.5 rounded-xl border text-[13px] outline-none resize-none focus:border-[#25D366] transition-colors font-sans leading-relaxed"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                      rows={5}
                    />

                    {/* Quick Variable Insertion Pills */}
                    <div className="mt-1.5">
                      <div className="text-[11px] text-[var(--text-muted)] mb-1">
                        Click to insert dynamic variable tag:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "{{1}}",
                          "{{2}}",
                          "{{customer_name}}",
                          "{{order_id}}",
                          "{{amount}}",
                          "{{due_date}}",
                          "{{link}}",
                        ].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setTBody((b) => b + " " + v)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all hover:scale-105 active:scale-95 text-[#25D366] border border-[#25D366]/30"
                            style={{ background: "var(--bg-active)" }}
                          >
                            + {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Text */}
                  <div>
                    <label
                      className="text-[12px] font-semibold mb-1.5 block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Footer (optional)
                    </label>
                    <input
                      value={tFooter}
                      onChange={(e) => setTFooter(e.target.value)}
                      placeholder="Footer text (e.g. Reply STOP to opt out)..."
                      className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none focus:border-[#25D366] transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--bg-input)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  {/* WhatsApp Action Buttons Builder */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        className="text-[12px] font-semibold"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Interactive Buttons (optional · max 3)
                      </label>
                      {tButtons.length < 3 && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => addButton("quick_reply")}
                            className="text-[11px] font-medium text-[#25D366] hover:underline"
                          >
                            + Quick Reply
                          </button>
                          <span className="text-[var(--text-muted)] text-[10px]">·</span>
                          <button
                            type="button"
                            onClick={() => addButton("url")}
                            className="text-[11px] font-medium text-[#25D366] hover:underline"
                          >
                            + Website URL
                          </button>
                          <span className="text-[var(--text-muted)] text-[10px]">·</span>
                          <button
                            type="button"
                            onClick={() => addButton("phone")}
                            className="text-[11px] font-medium text-[#25D366] hover:underline"
                          >
                            + Phone Call
                          </button>
                        </div>
                      )}
                    </div>

                    {tButtons.length > 0 ? (
                      <div className="space-y-2 mt-2">
                        {tButtons.map((btn, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border flex flex-col sm:flex-row gap-2 items-center"
                            style={{
                              background: "var(--bg-input)",
                              borderColor: "var(--border)",
                            }}
                          >
                            <span className="text-[11px] font-semibold text-[#25D366] uppercase px-1.5 py-0.5 rounded bg-[#25D366]/10 shrink-0">
                              {btn.type === "url"
                                ? "Website"
                                : btn.type === "phone"
                                ? "Phone"
                                : "Reply"}
                            </span>
                            <input
                              value={btn.text}
                              onChange={(e) =>
                                updateButton(idx, { text: e.target.value })
                              }
                              placeholder="Button label..."
                              className="h-8 px-2.5 rounded-lg border text-[12px] outline-none flex-1 w-full bg-[var(--bg-card)] text-[var(--text-primary)]"
                              style={{ borderColor: "var(--border)" }}
                            />
                            {btn.type !== "quick_reply" && (
                              <input
                                value={btn.value || ""}
                                onChange={(e) =>
                                  updateButton(idx, { value: e.target.value })
                                }
                                placeholder={
                                  btn.type === "url"
                                    ? "https://..."
                                    : "+91 98765 43210"
                                }
                                className="h-8 px-2.5 rounded-lg border text-[12px] outline-none flex-1 w-full bg-[var(--bg-card)] text-[var(--text-primary)]"
                                style={{ borderColor: "var(--border)" }}
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeButton(idx)}
                              className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors shrink-0"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="p-3 rounded-xl border border-dashed text-center text-[12px]"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        No buttons added. You can add Quick Replies or Call-To-Action buttons.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Live WhatsApp Smartphone Mockup */}
                <div
                  className="lg:col-span-5 p-4 sm:p-6 flex flex-col items-center justify-center"
                  style={{ background: "var(--bg-input)" }}
                >
                  <WhatsAppPhoneMockup
                    headerType={tHeaderType}
                    headerText={tHeader}
                    bodyText={tBody}
                    footerText={tFooter}
                    buttons={tButtons}
                    initialTheme="dark"
                    showHistoryCallLogs={true}
                  />
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div
              className="flex items-center justify-end gap-2 px-6 py-3.5 border-t shrink-0"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave("draft")}
                className="px-4 py-2 rounded-xl border text-[13px] font-medium hover:bg-[var(--bg-hover)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("approved")}
                className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold transition-all active:scale-95 shadow-sm"
              >
                {editingId ? "Update Template" : "Submit Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
