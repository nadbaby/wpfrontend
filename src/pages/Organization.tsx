import { useState, useEffect } from "react"
import API_BASE from "../lib/api"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Shield,
  MessageSquare,
  FileText,
  Radio,
  CalendarClock,
  UserPlus,
  X,
  Check,
  Building2,
  Users,
  Settings2,
  Zap,
  Trash2,
  Save,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface OrgNode {
  id: string
  name: string
  features: string[]
  membersCount: number
}

const FEATURE_LIST = [
  { id: "send-messages", label: "Send Messages", icon: MessageSquare },
  { id: "create-template", label: "Create Templates", icon: FileText },
  { id: "send-broadcasting", label: "Send Broadcasting", icon: Radio },
  { id: "schedule-broadcasting", label: "Schedule Broadcasting", icon: CalendarClock },
]

export default function Organization() {
  const { adminCreateUser } = useAuth()

  const [organizations, setOrganizations] = useState<OrgNode[]>([])

  const fetchOrgs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orgs`);
      if (res.ok) setOrganizations(await res.json());
    } catch (e) { }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  // New Org State
  const [newOrgName, setNewOrgName] = useState("")
  const [newOrgFeatures, setNewOrgFeatures] = useState<string[]>([])

  // Modal State
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<OrgNode | null>(null)

  // Agent Invite Form
  const [inviteType, setInviteType] = useState<"new" | "existing">("existing")
  const [existingAgentEmail, setExistingAgentEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [invitePass, setInvitePass] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [allAgents, setAllAgents] = useState<any[]>([])

  const [showManageModal, setShowManageModal] = useState(false)
  const [manageTab, setManageTab] = useState<"members" | "permissions" | "settings">("members")
  const [orgMembers, setOrgMembers] = useState<any[]>([])

  const fetchMembers = async (orgName: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/orgs/${encodeURIComponent(orgName)}/members`);
      if (res.ok) setOrgMembers(await res.json());
    } catch (err) { }
  }

  const openManageModal = (org: OrgNode) => {
    setSelectedOrg(org)
    setManageTab("members")
    setShowManageModal(true)
    fetchMembers(org.name)
  }

  const removeMember = async (email: string) => {
    await fetch(`${API_BASE}/api/orgs/members/${encodeURIComponent(email)}`, { method: "DELETE" });
    setOrgMembers(prev => prev.filter(m => m.email !== email));
    fetchOrgs();
  }

  const handleUpdateOrg = async () => {
    if (!selectedOrg) return;
    await fetch(`${API_BASE}/api/orgs/${selectedOrg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedOrg.name, features: selectedOrg.features })
    });
    fetchOrgs(); // Refresh
  }

  const handleDeleteOrg = async (id: string) => {
    if (window.confirm("Delete this organization?")) {
      await fetch(`${API_BASE}/api/orgs/${id}`, { method: "DELETE" });
      setShowManageModal(false);
      fetchOrgs();
    }
  }

  const toggleFeature = (featureId: string) => {
    setNewOrgFeatures(prev =>
      prev.includes(featureId) ? prev.filter(f => f !== featureId) : [...prev, featureId]
    )
  }

  const handleCreateOrg = async () => {
    if (!newOrgName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/orgs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newOrgName, features: newOrgFeatures })
      });
      if (res.ok) {
        const newOrg = await res.json();
        setOrganizations(prev => [newOrg, ...prev])
        setNewOrgName("")
        setNewOrgFeatures([])
      } else {
        const errData = await res.json().catch(() => null);
        alert("Failed to create organization: " + (errData?.error || "Unknown Error"));
      }
    } catch (e: any) {
      alert("Network Error: " + e.message);
      console.error(e);
    }
  }

  const openInvite = (org: OrgNode) => {
    setSelectedOrg(org)
    setShowInviteModal(true)
    setSuccess(false)
    setErrorMsg("")
    setInviteName("")
    setInviteEmail("")
    setInvitePass("")

    fetch(`${API_BASE}/api/agents/all`)
      .then(r => r.json())
      .then(data => setAllAgents(data || []))
      .catch(e => console.error(e));
  }

  const handleInviteAgent = async () => {
    if (!selectedOrg) return

    try {
      setLoading(true)
      setErrorMsg("")

      if (inviteType === "new") {
        if (!inviteName || !inviteEmail || !invitePass) {
          setErrorMsg("Please fill all fields")
          return
        }
        await adminCreateUser(inviteName, inviteEmail, invitePass, selectedOrg.name, selectedOrg.features)
      } else {
        if (!existingAgentEmail) {
          setErrorMsg("Please select an agent")
          return
        }
        const res = await fetch(`${API_BASE}/api/agents/permissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target_email: existingAgentEmail, category: selectedOrg.name, features: selectedOrg.features })
        });
        if (!res.ok) throw new Error("Failed to assign existing agent");
      }

      setSuccess(true)

      // Opt: Increment local UI count
      setOrganizations(orgs => orgs.map(o => o.id === selectedOrg.id ? { ...o, membersCount: o.membersCount + 1 } : o))

      setTimeout(() => {
        setShowInviteModal(false)
        setSuccess(false)
      }, 2000)
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to add agent")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-[var(--text-primary)] flex items-center gap-3">
          <Building2 size={32} className="text-[#25D366]" />
          Organizations & Permissions
        </h1>
        <p className="text-[var(--text-secondary)] mt-2 text-sm max-w-2xl">
          Manage your team categories via a Bento grid. Create tailored organizations and strictly control what features their agents can access across the WhatsApp Suite.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

        {/* Create Organization Bento Card - SPANS 8 COLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-8 bg-[var(--bg-card)] rounded-[2rem] p-8 border border-[var(--border)] shadow-xl relative overflow-hidden group"
        >
          {/* Decorative Background Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30">
                <Shield size={20} />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] font-display">Create New Category</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side: Setup */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 block">
                    Category Name
                  </label>
                  <input
                    value={newOrgName}
                    onChange={e => setNewOrgName(e.target.value)}
                    placeholder="e.g. Retail Sales"
                    className="w-full h-12 px-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-sm outline-none focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10 transition-all font-medium text-[var(--text-primary)]"
                  />
                </div>

                <button
                  onClick={handleCreateOrg}
                  disabled={!newOrgName.trim()}
                  className="w-full h-12 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl font-bold shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add Organization
                </button>
              </div>

              {/* Right side: Feature Toggles */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3 block">
                  Allowed Features for Agents
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {FEATURE_LIST.map(feat => {
                    const isSelected = newOrgFeatures.includes(feat.id);
                    return (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${isSelected
                          ? "border-[#25D366] bg-[#25D366]/5"
                          : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text-muted)]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <feat.icon size={18} className={isSelected ? "text-[#25D366]" : "text-[var(--text-muted)]"} />
                          <span className={`text-sm font-semibold ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                            {feat.label}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${isSelected ? "bg-[#25D366] text-white" : "bg-[var(--bg-input)] border border-[var(--border)]"
                          }`}>
                          {isSelected && <Check size={14} />}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Impact Summary - SPANS 4 COLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Zap size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Access Control</h2>
              <p className="text-indigo-100 text-sm leading-relaxed">
                You are utilizing edge-grade RBAC. Every agent provisioned will only access their rigorously allowed components.
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <div className="text-4xl font-extrabold">{organizations.length}</div>
                <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mt-1">Active Categories</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold">{organizations.reduce((acc, curr) => acc + curr.membersCount, 0)}</div>
                <div className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mt-1">Total Agents</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Organization Cards - Array rendering Bento items */}
        {organizations.map((org, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + (index * 0.05) }}
            key={org.id}
            className="col-span-1 md:col-span-4 bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border)] p-6 shadow-lg hover:shadow-2xl hover:border-[#25D366]/50 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-display truncate max-w-[180px]">{org.name}</h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] mt-1">
                  <Users size={14} />
                  <span>{org.membersCount} Agent{org.membersCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <button
                onClick={() => openManageModal(org)}
                className="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] cursor-pointer flex items-center justify-center text-[var(--text-secondary)] transition-colors"
              >
                <Settings2 size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-2 mb-6">
              {org.features.map(f => {
                const featureRef = FEATURE_LIST.find(fl => fl.id === f)
                if (!featureRef) return null
                return (
                  <div key={f} className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] px-3 py-1.5 rounded-xl">
                    <featureRef.icon size={14} className="text-[#25D366]" />
                    {featureRef.label}
                  </div>
                )
              })}
              {org.features.length === 0 && (
                <div className="text-xs text-[var(--text-muted)] italic py-2">No features enabled</div>
              )}
            </div>

            <button
              onClick={() => openInvite(org)}
              className="w-full py-3 bg-[var(--bg-input)] hover:bg-[#25D366] hover:text-white text-[var(--text-primary)] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
            >
              <UserPlus size={16} />
              Add Agent
            </button>
          </motion.div>
        ))}

      </div>

      {/* Invite Modal for Admin Create User */}
      <AnimatePresence>
        {showInviteModal && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-hover)]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Add Agent to {selectedOrg.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Provision a new account with {selectedOrg.name} permissions</p>
                </div>
                <button onClick={() => setShowInviteModal(false)} className="p-2 rounded-xl hover:bg-black/5 text-[var(--text-muted)]">
                  <X size={18} />
                </button>
              </div>

              <div className="flex border-b border-[var(--border)] px-6 pt-2 gap-6 bg-[var(--bg-hover)] mt-2">
                <button
                  onClick={() => setInviteType("existing")}
                  className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${inviteType === "existing" ? "border-[#25D366] text-[#25D366]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Existing Agent
                </button>
                <button
                  onClick={() => setInviteType("new")}
                  className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${inviteType === "new" ? "border-[#25D366] text-[#25D366]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Provision New
                </button>
              </div>

              <div className="p-6 space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {inviteType === "existing" ? (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">Select Agent</label>
                    <div className="relative group">
                      <select
                        value={existingAgentEmail}
                        onChange={(e) => setExistingAgentEmail(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] text-sm outline-none focus:border-[#25D366] appearance-none cursor-pointer text-[var(--text-primary)]"
                      >
                        <option value="" disabled>Select an agent to add...</option>
                        {allAgents.map(ag => (
                          <option key={ag.email} value={ag.email}>
                            {ag.email} (Currently: {ag.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">Agent Name</label>
                      <input
                        value={inviteName}
                        onChange={e => setInviteName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] text-sm outline-none focus:border-[#25D366]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">Login Email (ID)</label>
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] text-sm outline-none focus:border-[#25D366]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">Secure Password</label>
                      <input
                        type="password"
                        value={invitePass}
                        onChange={e => setInvitePass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] text-sm outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-[var(--border)] mt-6">
                  <button
                    onClick={handleInviteAgent}
                    disabled={loading || success}
                    className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${success
                      ? "bg-[#25D366] text-white"
                      : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white dark:from-white dark:to-gray-200 dark:text-black"
                      }`}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : success ? (
                      <>
                        <Check size={18} />
                        Agent Assigned Successfully
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} />
                        {inviteType === "new" ? "Create Agent Account" : "Assign Existing Agent"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Organization Modal */}
      <AnimatePresence>
        {showManageModal && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-hover)]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Manage {selectedOrg.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Edit team members, feature permissions, and settings</p>
                </div>
                <button onClick={() => setShowManageModal(false)} className="p-2 rounded-xl hover:bg-black/5 text-[var(--text-muted)]">
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[var(--border)] px-6 pt-2 gap-6 bg-[var(--bg-hover)]">
                {["members", "permissions", "settings"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setManageTab(tab as any)}
                    className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${manageTab === tab ? "border-[#25D366] text-[#25D366]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {manageTab === "members" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Current Team Members</p>
                    <div className="space-y-2">
                      {orgMembers.length === 0 && (
                        <div className="text-sm text-[var(--text-muted)] p-4 text-center">No members found. Use "Add Agent" to provision members into this organization.</div>
                      )}
                      {orgMembers.map(member => (
                        <div key={member.email} className="flex items-center justify-between p-3.5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border)] group">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md">
                              {member.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[var(--text-primary)]">{member.email.split('@')[0]}</div>
                              <div className="text-xs text-[var(--text-secondary)]">{member.email}</div>
                            </div>
                          </div>
                          <button onClick={() => removeMember(member.email)} className="text-red-500 bg-red-500/10 p-2 rounded-xl hover:bg-red-500 text-xs transition-colors hover:text-white opacity-0 group-hover:opacity-100 font-bold border border-red-500/20 flex items-center gap-1">
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {manageTab === "permissions" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Category Feature Access</p>
                    <div className="grid grid-cols-1 gap-3">
                      {FEATURE_LIST.map(feat => {
                        const isSelected = selectedOrg.features.includes(feat.id);
                        return (
                          <div key={feat.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${isSelected ? "border-[#25D366] bg-[#25D366]/5" : "border-[var(--border)] bg-[var(--bg-input)]"}`}>
                            <div className="flex items-center gap-3">
                              <feat.icon size={18} className={isSelected ? "text-[#25D366]" : "text-[var(--text-muted)]"} />
                              <span className={`text-sm font-semibold ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                                {feat.label}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                // Live update the orgs features locally
                                setOrganizations(orgs => orgs.map(o => {
                                  if (o.id === selectedOrg.id) {
                                    const newF = isSelected ? o.features.filter(fid => fid !== feat.id) : [...o.features, feat.id];
                                    return { ...o, features: newF }
                                  }
                                  return o;
                                }))
                                // Update selected locally
                                setSelectedOrg(prev => {
                                  if (!prev) return prev;
                                  return {
                                    ...prev,
                                    features: isSelected ? prev.features.filter(fid => fid !== feat.id) : [...prev.features, feat.id]
                                  }
                                });
                              }}
                              className={`w-10 h-6 rounded-full p-1 transition-colors ${isSelected ? "bg-[#25D366]" : "bg-[var(--border)]"}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isSelected ? "translate-x-4" : "translate-x-0"}`} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {manageTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 block">Rename Category</label>
                      <div className="flex gap-2">
                        <input
                          value={selectedOrg?.name || ""}
                          onChange={(e) => setSelectedOrg(prev => prev ? { ...prev, name: e.target.value } : prev)}
                          className="flex-1 h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-medium text-sm outline-none focus:border-[#25D366]"
                        />
                        <button onClick={handleUpdateOrg} className="h-11 px-4 bg-[#25D366] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#22c55e]">
                          <Save size={16} /> Save
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[var(--border)]">
                      <h4 className="text-sm font-bold text-red-500 mb-1">Danger Zone</h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-4">Permanently delete this organization. This removes the category. Agents may lose structured access.</p>
                      <button onClick={() => handleDeleteOrg(selectedOrg.id)} className="w-full h-11 border-2 border-red-500/20 bg-red-500/5 text-red-500 font-bold rounded-xl text-sm hover:bg-red-500 hover:text-white transition-colors">
                        Delete Organization
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}





