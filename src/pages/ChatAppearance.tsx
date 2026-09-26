import React, { useState } from "react"
import {
  Save,
  RotateCcw,
  Upload,
  Monitor,
  Smartphone,
  Check,
  MessageSquare,
} from "lucide-react"

const fonts = ["Inter", "Poppins", "Roboto", "Open Sans", "DM Sans"]
const bubbleStyles = ["Rounded", "Sharp", "Pill"]
const positions = ["Left", "Right"]

const card = { background: "var(--bg-card)", borderColor: "var(--border)" }
const input = {
  background: "var(--bg-input)",
  borderColor: "var(--border)",
  color: "var(--text-primary)",
}

export default function ChatAppearance() {
  const [brandColor, setBrandColor] = useState("#25D366")
  const [secondaryColor, setSecondaryColor] = useState("#128C7E")
  const [outColor, setOutColor] = useState("#DCF8C6")
  const [inColor, setInColor] = useState("#FFFFFF")
  const [font, setFont] = useState("Inter")
  const [bubbleStyle, setBubbleStyle] = useState("Rounded")
  const [widgetPos, setWidgetPos] = useState("Right")
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop")
  const [companyName, setCompanyName] = useState("WhatsApi Support")
  const [welcomeMsg, setWelcomeMsg] = useState(
    "Hi! How can we help you today? 👋",
  )
  const [buttonText, setButtonText] = useState("Chat with us")
  const [showBranding, setShowBranding] = useState(true)
  const [radius, setRadius] = useState(12)
  const [spacing, setSpacing] = useState(8)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label
      className="text-[12px] font-medium mb-1.5 block"
      style={{ color: "var(--text-secondary)" }}
    >
      {children}
    </label>
  )

  const SectionTitle = ({ children }: { children: string }) => (
    <h2
      className="font-display font-semibold text-[15px] mb-4"
      style={{ color: "var(--text-primary)" }}
    >
      {children}
    </h2>
  )

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={{ color: "var(--text-primary)" }}
          >
            Chat Appearance
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Customize how your chat widget looks to customers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-medium transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              background: "var(--bg-card)",
            }}
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              saved ? "bg-emerald-500" : "bg-[#25D366] hover:bg-[#22C55E]"
            } text-white`}
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {/* Branding */}
          <div className="rounded-2xl border p-5" style={card}>
            <SectionTitle>Branding</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl border-2 border-dashed flex items-center justify-center"
                    style={{
                      borderColor: brandColor + "60",
                      background: brandColor + "10",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: brandColor }}
                    >
                      <MessageSquare size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border text-[12.5px] font-medium transition-colors"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                        background: "var(--bg-card)",
                      }}
                    >
                      <Upload size={13} />
                      Upload Logo
                    </button>
                    <div
                      className="text-[11px] mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      PNG, SVG, max 2MB
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label>Company Name</Label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none transition-colors"
                  style={input}
                />
              </div>
              <div>
                <Label>Brand Color</Label>
                <div
                  className="flex items-center gap-2 h-9 px-3 rounded-xl border"
                  style={input}
                >
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-6 h-6 rounded-lg border-none outline-none cursor-pointer"
                  />
                  <span
                    className="text-[13px] font-mono"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {brandColor}
                  </span>
                </div>
              </div>
              <div>
                <Label>Secondary Color</Label>
                <div
                  className="flex items-center gap-2 h-9 px-3 rounded-xl border"
                  style={input}
                >
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-6 h-6 rounded-lg border-none outline-none cursor-pointer"
                  />
                  <span
                    className="text-[13px] font-mono"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {secondaryColor}
                  </span>
                </div>
              </div>
              <div>
                <Label>Chat Background</Label>
                <select
                  className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none transition-colors"
                  style={input}
                >
                  <option>Light</option>
                  <option>Pattern</option>
                  <option>Custom color</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chat customization */}
          <div className="rounded-2xl border p-5" style={card}>
            <SectionTitle>Chat Customization</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Bubble Style</Label>
                <div className="flex gap-2">
                  {bubbleStyles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setBubbleStyle(s)}
                      className="flex-1 py-2 rounded-xl text-[12px] font-medium border transition-colors"
                      style={{
                        borderColor:
                          bubbleStyle === s ? "#25D366" : "var(--border)",
                        background:
                          bubbleStyle === s ? "#F0FDF4" : "var(--bg-card)",
                        color:
                          bubbleStyle === s
                            ? "#25D366"
                            : "var(--text-secondary)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Font Family</Label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none"
                  style={input}
                >
                  {fonts.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Outgoing Message Color</Label>
                <div
                  className="flex items-center gap-2 h-9 px-3 rounded-xl border"
                  style={input}
                >
                  <input
                    type="color"
                    value={outColor}
                    onChange={(e) => setOutColor(e.target.value)}
                    className="w-6 h-6 rounded-lg border-none outline-none cursor-pointer"
                  />
                  <span
                    className="text-[13px] font-mono"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {outColor}
                  </span>
                </div>
              </div>
              <div>
                <Label>Incoming Message Color</Label>
                <div
                  className="flex items-center gap-2 h-9 px-3 rounded-xl border"
                  style={input}
                >
                  <input
                    type="color"
                    value={inColor}
                    onChange={(e) => setInColor(e.target.value)}
                    className="w-6 h-6 rounded-lg border-none outline-none cursor-pointer"
                  />
                  <span
                    className="text-[13px] font-mono"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {inColor}
                  </span>
                </div>
              </div>
              <div>
                <Label>Border Radius: {radius}px</Label>
                <input
                  type="range"
                  min={0}
                  max={24}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-[#25D366]"
                />
              </div>
              <div>
                <Label>Message Spacing: {spacing}px</Label>
                <input
                  type="range"
                  min={4}
                  max={20}
                  value={spacing}
                  onChange={(e) => setSpacing(Number(e.target.value))}
                  className="w-full accent-[#25D366]"
                />
              </div>
            </div>
          </div>

          {/* Widget settings */}
          <div className="rounded-2xl border p-5" style={card}>
            <SectionTitle>Widget Settings</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Widget Position</Label>
                <div className="flex gap-3">
                  {positions.map((p) => (
                    <button
                      key={p}
                      onClick={() => setWidgetPos(p)}
                      className="flex-1 py-2.5 rounded-xl text-[13px] font-medium border transition-colors"
                      style={{
                        borderColor:
                          widgetPos === p ? "#25D366" : "var(--border)",
                        background:
                          widgetPos === p ? "#F0FDF4" : "var(--bg-card)",
                        color:
                          widgetPos === p ? "#25D366" : "var(--text-secondary)",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Welcome Message</Label>
                <textarea
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-[13px] outline-none resize-none transition-colors"
                  style={input}
                  rows={2}
                />
              </div>
              <div>
                <Label>Chat Button Text</Label>
                <input
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border text-[13px] outline-none transition-colors"
                  style={input}
                />
              </div>
              <div
                className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl border"
                style={{
                  background: "var(--bg-input)",
                  borderColor: "var(--border)",
                }}
              >
                <div>
                  <div
                    className="text-[13px] font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Show Branding
                  </div>
                  <div
                    className="text-[11.5px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Display "Powered by WhatsApi" in the widget
                  </div>
                </div>
                <button
                  onClick={() => setShowBranding(!showBranding)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    showBranding ? "bg-[#25D366]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                      showBranding ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="xl:col-span-1">
          <div
            className="rounded-2xl border p-5 sticky top-[80px]"
            style={card}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-display font-semibold text-[15px]"
                style={{ color: "var(--text-primary)" }}
              >
                Live Preview
              </h2>
              <div
                className="flex items-center gap-1 rounded-xl p-1"
                style={{ background: "var(--bg-input)" }}
              >
                {[
                  { icon: Monitor, id: "desktop" as const },
                  { icon: Smartphone, id: "mobile" as const },
                ].map(({ icon: Icon, id }) => (
                  <button
                    key={id}
                    onClick={() => setPreview(id)}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{
                      background:
                        preview === id ? "var(--bg-card)" : "transparent",
                      color: preview === id ? "#25D366" : "var(--text-muted)",
                    }}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>
            <div
              className="rounded-xl border p-4 min-h-[320px] relative flex items-end justify-end"
              style={{
                background: "var(--bg-input)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className={`flex flex-col items-${
                  widgetPos === "Right" ? "end" : "start"
                } gap-2`}
              >
                <div className="bg-white rounded-2xl shadow-xl w-[220px] border border-[#E8ECF0] overflow-hidden">
                  <div
                    className="p-3 flex items-center gap-2"
                    style={{ backgroundColor: brandColor }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageSquare size={14} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white text-[12px] font-semibold">
                        {companyName}
                      </div>
                      <div className="text-white/70 text-[10px]">
                        Typically replies instantly
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2 bg-[#EEF0F2]">
                    <div className="bg-white rounded-xl rounded-tl-sm p-2 max-w-[80%]">
                      <p className="text-[11px] text-[#111827]">{welcomeMsg}</p>
                    </div>
                    <div
                      className="ml-auto rounded-xl rounded-tr-sm p-2 max-w-[70%]"
                      style={{ backgroundColor: outColor }}
                    >
                      <p className="text-[11px] text-[#111827]">
                        Hi! I need some help.
                      </p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-[#E8ECF0] flex items-center gap-1.5">
                    <div className="flex-1 bg-[#F8F9FB] rounded-lg px-2 py-1.5 text-[10px] text-[#94A3B8]">
                      Type a message...
                    </div>
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: brandColor }}
                    >
                      <MessageSquare size={10} className="text-white" />
                    </div>
                  </div>
                  {showBranding && (
                    <div className="px-3 py-1.5 border-t border-[#E8ECF0] text-center text-[9px] text-[#94A3B8]">
                      Powered by WhatsApi
                    </div>
                  )}
                </div>
                <button
                  className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center"
                  style={{ backgroundColor: brandColor }}
                >
                  <MessageSquare size={22} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
