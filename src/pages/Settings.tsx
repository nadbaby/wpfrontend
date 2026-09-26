import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Webhook,
  Key,
  ChevronRight,
} from "lucide-react"

const sections = [
  {
    icon: Bell,
    label: "Notifications",
    desc: "Manage email and push notification preferences",
    color: "#3B82F6",
  },
  {
    icon: Shield,
    label: "Security",
    desc: "Two-factor auth, sessions and API keys",
    color: "#8B5CF6",
  },
  {
    icon: Globe,
    label: "Integrations",
    desc: "Connect third-party apps and services",
    color: "#F59E0B",
  },
  {
    icon: Webhook,
    label: "Webhooks",
    desc: "Configure webhooks for real-time events",
    color: "#EC4899",
  },
  {
    icon: Key,
    label: "API Access",
    desc: "Manage API keys and access tokens",
    color: "#25D366",
  },
]

export default function Settings() {
  return (
    <div className="p-6 max-w-[800px]">
      <div className="mb-6">
        <h1
          className="font-display font-bold text-[22px]"
          style={{ color: "var(--text-primary)" }}
        >
          Settings
        </h1>
        <p
          className="text-[13.5px] mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          Configure your workspace preferences
        </p>
      </div>
      <div className="space-y-2">
        {sections.map(({ icon: Icon, label, desc, color }) => (
          <div
            key={label}
            className="rounded-2xl border p-4 flex items-center gap-4 hover:shadow-md hover:shadow-black/5 cursor-pointer group transition-shadow"
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
            <div className="flex-1">
              <div
                className="font-semibold text-[14px]"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </div>
              <div
                className="text-[12.5px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {desc}
              </div>
            </div>
            <ChevronRight
              size={16}
              className="group-hover:text-[#25D366] transition-colors"
              style={{ color: "var(--text-muted)" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
