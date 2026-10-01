import React, { useState } from "react"
import {
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
  Plus,
  Camera,
  Mic,
  Smile,
  CheckCheck,
  Lock,
  ExternalLink,
  PhoneCall,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Sun,
  Moon,
  Volume2,
} from "lucide-react"

export interface TemplateButton {
  type: "quick_reply" | "url" | "phone"
  text: string
  value?: string
}

export interface WhatsAppPhoneMockupProps {
  headerType?: "none" | "text" | "image" | "document"
  headerText?: string
  headerMediaUrl?: string
  bodyText: string
  footerText?: string
  buttons?: TemplateButton[]
  businessName?: string
  businessPhone?: string
  businessAvatar?: string
  sampleVariables?: Record<string, string>
  showSampleData?: boolean
  initialTheme?: "dark" | "light"
  showHistoryCallLogs?: boolean
  className?: string
}

export const WhatsAppPhoneMockup: React.FC<WhatsAppPhoneMockupProps> = ({
  headerType = "text",
  headerText = "",
  headerMediaUrl = "",
  bodyText = "",
  footerText = "",
  buttons = [],
  businessName = "WhatsApi Business",
  businessPhone = "+91 6239 088 401",
  businessAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  sampleVariables = {
    "1": "Arjun Sharma",
    "2": "ORD-94821",
    "3": "Sep 30, 2026",
    "4": "https://track.package/94821",
    customer_name: "Arjun Sharma",
    order_id: "ORD-94821",
    amount: "₹1,499",
    due_date: "Oct 05, 2026",
    delivery_time: "Tomorrow by 2:00 PM",
    link: "https://pay.wbapi.dev/ord-948",
  },
  showSampleData = true,
  initialTheme = "dark",
  showHistoryCallLogs = true,
  className = "",
}) => {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme)
  const [useSample, setUseSample] = useState(showSampleData)

  // Replace variable placeholders with sample values or keep tags
  const renderFormattedBody = (raw: string) => {
    if (!raw) return "Start typing your template message..."

    let processed = raw
    if (useSample) {
      // Replace numbered variables {{1}}, {{2}}
      processed = processed.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
        return sampleVariables[key] || `[${key}]`
      })
    }

    return processed
  }

  const isDark = theme === "dark"

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Controls Bar above Phone */}
      <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span>WhatsApp Screen</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setUseSample(!useSample)}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors border ${
              useSample
                ? "bg-[#25D366]/15 text-[#25D366] border-[#25D366]/40"
                : "bg-transparent text-[var(--text-muted)] border-[var(--border)]"
            }`}
            title="Toggle sample variable replacement"
          >
            {useSample ? "Preview: Sample Data" : "Preview: {{variables}}"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-1 rounded-md hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors border border-[var(--border)]"
            title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
          >
            {isDark ? (
              <Sun size={12} className="text-amber-400" />
            ) : (
              <Moon size={12} className="text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Realistic Phone Bezel Frame */}
      <div
        className="relative w-[320px] sm:w-[335px] h-[610px] rounded-[46px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] transition-all select-none"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #2c3036 0%, #15181c 50%, #0d0f12 100%)"
            : "linear-gradient(145deg, #d8dee8 0%, #b8c0cc 50%, #9aa3b0 100%)",
          boxShadow: isDark
            ? "0 22px 50px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {/* Left Side Buttons (Volume & Mute) */}
        <div className="absolute -left-[3px] top-[105px] w-[3px] h-[24px] bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[145px] w-[3px] h-[44px] bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[200px] w-[3px] h-[44px] bg-neutral-600 rounded-l-sm" />

        {/* Right Side Button (Power) */}
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[68px] bg-neutral-600 rounded-r-sm" />

        {/* Inner Screen Container */}
        <div
          className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col"
          style={{
            backgroundColor: isDark ? "#0b141a" : "#efeae2",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {/* Dynamic Island / Top Bezel with Clock & Status */}
          <div
            className="w-full pt-2.5 px-6 pb-1 flex items-center justify-between text-xs z-20 shrink-0 select-none"
            style={{
              backgroundColor: isDark ? "#1f2c34" : "#f0f2f5",
              color: isDark ? "#ffffff" : "#111b21",
            }}
          >
            <span className="font-semibold text-[13px] tracking-tight ml-0.5">
              3:07
            </span>
            {/* Dynamic Island Pill */}
            <div className="w-[82px] h-[20px] bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner -mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#101010] border border-neutral-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#001f3f]/50"></div>
              </div>
            </div>
            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium">
              <span className="text-[10px] tracking-tighter font-semibold">
                5G
              </span>
              {/* Battery Icon */}
              <div className="w-[20px] h-[10px] border border-current rounded-[3px] p-[1px] flex items-center">
                <div className="w-[80%] h-full bg-current rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* WhatsApp Chat Navigation Bar */}
          <div
            className="w-full px-2 py-2 flex items-center justify-between shadow-sm z-20 shrink-0"
            style={{
              backgroundColor: isDark ? "#1f2c34" : "#f0f2f5",
              borderBottom: `1px solid ${isDark ? "#2a3942" : "#e9edef"}`,
              color: isDark ? "#e9edef" : "#111b21",
            }}
          >
            <div className="flex items-center gap-1 min-w-0">
              {/* Back Button with count badge like screenshot */}
              <button
                type="button"
                className="flex items-center text-[#53bdeb] hover:opacity-80 transition-opacity"
              >
                <ChevronLeft size={22} className="-mr-1 text-[#00a884]" />
                <span className="text-[13px] font-normal text-[#00a884]">
                  140
                </span>
              </button>

              {/* Avatar */}
              <div className="relative ml-0.5 shrink-0">
                <img
                  src={businessAvatar}
                  alt={businessName}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#1f2c34] rounded-full"></span>
              </div>

              {/* Contact Name & Status */}
              <div className="ml-1.5 min-w-0 flex-1 leading-tight">
                <div
                  className="text-[13.5px] font-semibold truncate flex items-center gap-1"
                  style={{ color: isDark ? "#e9edef" : "#111b21" }}
                >
                  <span className="truncate">
                    {businessPhone || businessName}
                  </span>
                </div>
                <div
                  className="text-[10.5px] truncate"
                  style={{ color: isDark ? "#8696a0" : "#667781" }}
                >
                  tap to add to contacts
                </div>
              </div>
            </div>

            {/* Video & Phone Call Action Icons */}
            <div
              className="flex items-center gap-3.5 pr-1"
              style={{ color: "#00a884" }}
            >
              <Video size={18} className="cursor-pointer hover:opacity-80" />
              <Phone size={17} className="cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* WhatsApp Chat Canvas with Doodle Pattern */}
          <div
            className="flex-1 overflow-y-auto px-3 py-2.5 relative flex flex-col space-y-2.5"
            style={{
              backgroundColor: isDark ? "#0b141a" : "#efeae2",
              backgroundImage: isDark
                ? `radial-gradient(#1e293b 0.6px, transparent 0.6px), radial-gradient(#1e293b 0.6px, #0b141a 0.6px)`
                : `radial-gradient(#cbd5e1 0.6px, transparent 0.6px), radial-gradient(#cbd5e1 0.6px, #efeae2 0.6px)`,
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          >
            {/* Optional Call Log / History items like in user screenshot */}
            {showHistoryCallLogs && (
              <>
                {/* Voice Call Pill 1 */}
                <div
                  className="mx-auto rounded-xl px-3 py-1.5 flex items-center justify-between gap-3 text-[11px] shadow-sm max-w-[210px]"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(31, 44, 52, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    border: `1px solid ${isDark ? "#2a3942" : "#e9edef"}`,
                    color: isDark ? "#e9edef" : "#111b21",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00a884]/20 flex items-center justify-center text-[#00a884]">
                      <PhoneCall size={11} />
                    </div>
                    <div>
                      <div className="font-medium text-[11px]">Voice call</div>
                      <div
                        className="text-[9.5px]"
                        style={{ color: isDark ? "#8696a0" : "#667781" }}
                      >
                        No answer
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-[9px]"
                    style={{ color: isDark ? "#8696a0" : "#667781" }}
                  >
                    12:34 PM
                  </span>
                </div>

                {/* Voice Call Pill 2 */}
                <div
                  className="mx-auto rounded-xl px-3 py-1.5 flex items-center justify-between gap-3 text-[11px] shadow-sm max-w-[210px]"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(31, 44, 52, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    border: `1px solid ${isDark ? "#2a3942" : "#e9edef"}`,
                    color: isDark ? "#e9edef" : "#111b21",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00a884]/20 flex items-center justify-center text-[#00a884]">
                      <PhoneCall size={11} />
                    </div>
                    <div>
                      <div className="font-medium text-[11px]">Voice call</div>
                      <div
                        className="text-[9.5px]"
                        style={{ color: isDark ? "#8696a0" : "#667781" }}
                      >
                        No answer
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-[9px]"
                    style={{ color: isDark ? "#8696a0" : "#667781" }}
                  >
                    12:35 PM
                  </span>
                </div>

                {/* Unread message banner like user screenshot */}
                <div className="relative flex items-center justify-center my-1">
                  <div
                    className="px-3 py-0.5 rounded-full text-[10px] font-medium shadow-sm"
                    style={{
                      backgroundColor: isDark ? "#182229" : "#ffffff",
                      color: isDark ? "#8696a0" : "#667781",
                      border: `1px solid ${isDark ? "#222d34" : "#e9edef"}`,
                    }}
                  >
                    2 unread messages
                  </div>
                </div>
              </>
            )}

            {/* End-to-end Encryption Banner */}
            <div
              className="mx-auto rounded-lg px-2.5 py-1 text-[9.5px] leading-tight text-center max-w-[240px] shadow-sm"
              style={{
                backgroundColor: isDark
                  ? "rgba(24, 34, 41, 0.85)"
                  : "rgba(254, 243, 199, 0.85)",
                color: isDark ? "#ffd279" : "#92400e",
              }}
            >
              <Lock size={9} className="inline mr-1 -mt-0.5" />
              Messages are end-to-end encrypted.
            </div>

            {/* MAIN TEMPLATE MESSAGE BUBBLE */}
            <div className="w-full flex justify-start my-1">
              <div
                className="relative rounded-2xl rounded-tl-xs max-w-[88%] shadow-[0_1px_1.5px_rgba(0,0,0,0.15)] overflow-hidden transition-all"
                style={{
                  backgroundColor: isDark ? "#202c33" : "#ffffff",
                  color: isDark ? "#e9edef" : "#111b21",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.04)",
                }}
              >
                {/* Bubble Speech Tail (WhatsApp Notch) */}
                <div
                  className="absolute -top-[1px] -left-[7px] w-0 h-0"
                  style={{
                    borderTop: `8px solid ${isDark ? "#202c33" : "#ffffff"}`,
                    borderLeft: "8px solid transparent",
                  }}
                />

                {/* Header (Media / Text) */}
                {headerType === "image" && (
                  <div className="w-full h-32 bg-neutral-800 relative overflow-hidden flex items-center justify-center">
                    {headerMediaUrl ? (
                      <img
                        src={headerMediaUrl}
                        alt="Header preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-neutral-400 gap-1">
                        <ImageIcon size={28} />
                        <span className="text-[10px]">
                          Media Header (Image)
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {headerType === "document" && (
                  <div
                    className="p-2.5 flex items-center gap-2 border-b"
                    style={{
                      borderColor: isDark ? "#2a3942" : "#e9edef",
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E02424]/10 text-[#E02424] flex items-center justify-center shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11.5px] font-semibold truncate">
                        {headerText || "document_attachment.pdf"}
                      </div>
                      <div
                        className="text-[9.5px]"
                        style={{ color: isDark ? "#8696a0" : "#667781" }}
                      >
                        PDF · 245 KB
                      </div>
                    </div>
                  </div>
                )}

                {headerType === "text" && headerText && (
                  <div className="px-3 pt-2.5 pb-1">
                    <div
                      className="font-bold text-[13px] leading-snug"
                      style={{ color: isDark ? "#e9edef" : "#111b21" }}
                    >
                      {headerText}
                    </div>
                  </div>
                )}

                {/* Body Content */}
                <div className="px-3 py-1.5">
                  <p
                    className="text-[12px] leading-relaxed whitespace-pre-wrap font-sans break-words"
                    style={{ color: isDark ? "#e9edef" : "#111b21" }}
                  >
                    {renderFormattedBody(bodyText)}
                  </p>
                </div>

                {/* Footer Content */}
                {footerText && (
                  <div className="px-3 pb-1">
                    <p
                      className="text-[10.5px] italic leading-tight"
                      style={{ color: isDark ? "#8696a0" : "#667781" }}
                    >
                      {footerText}
                    </p>
                  </div>
                )}

                {/* Timestamp & Double Checkmarks */}
                <div className="px-3 pb-1.5 flex items-center justify-end gap-1 text-[9px] select-none">
                  <span style={{ color: isDark ? "#8696a0" : "#667781" }}>
                    12:36 PM
                  </span>
                  <CheckCheck size={13} className="text-[#53bdeb]" />
                </div>

                {/* Template Action Buttons (Quick Replies & CTA) */}
                {buttons && buttons.length > 0 && (
                  <div
                    className="border-t flex flex-col divide-y"
                    style={{
                      borderColor: isDark ? "#2a3942" : "#e9edef",
                      divideColor: isDark ? "#2a3942" : "#e9edef",
                    }}
                  >
                    {buttons.map((btn, idx) => (
                      <div
                        key={idx}
                        className="py-2 px-3 text-center text-[11.5px] font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ color: "#00a884" }}
                      >
                        {btn.type === "url" && <ExternalLink size={12} />}
                        {btn.type === "phone" && <Phone size={12} />}
                        {btn.type === "quick_reply" && <Sparkles size={11} />}
                        <span>{btn.text || `Button ${idx + 1}`}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Bottom Chat Input Bar */}
          <div
            className="w-full px-2 py-2 flex items-center gap-2 z-20 shrink-0"
            style={{
              backgroundColor: isDark ? "#1f2c34" : "#f0f2f5",
              borderTop: `1px solid ${isDark ? "#2a3942" : "#e9edef"}`,
            }}
          >
            {/* Attachment Button */}
            <button
              type="button"
              className="p-1 rounded-full text-[#8696a0] hover:text-[#e9edef] transition-colors"
            >
              <Plus size={20} />
            </button>

            {/* Fake Input Box */}
            <div
              className="flex-1 h-8 rounded-full px-3 flex items-center justify-between shadow-inner"
              style={{
                backgroundColor: isDark ? "#2a3942" : "#ffffff",
                color: isDark ? "#8696a0" : "#667781",
              }}
            >
              <span className="text-[11.5px]">Message</span>
              <div className="flex items-center gap-2 text-[#8696a0]">
                <Camera size={15} />
              </div>
            </div>

            {/* WhatsApp Green Mic Button */}
            <div className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#009472] transition-colors shrink-0">
              <Mic size={15} />
            </div>
          </div>

          {/* iPhone Home Indicator Bottom Bar */}
          <div
            className="w-full pt-1 pb-1.5 flex justify-center z-20 shrink-0"
            style={{
              backgroundColor: isDark ? "#1f2c34" : "#f0f2f5",
            }}
          >
            <div
              className="w-32 h-1 rounded-full"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
