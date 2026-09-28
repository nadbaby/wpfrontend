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
    CheckCircle2
} from "lucide-react"

type TargetType = 'manual' | 'list' | 'excel'
type ScheduleType = 'instant' | 'scheduled'

export default function Broadcast() {
    const [targetType, setTargetType] = useState<TargetType>('manual')
    const [scheduleType, setScheduleType] = useState<ScheduleType>('instant')
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [isHoveringSubmit, setIsHoveringSubmit] = useState(false)

    const templates = [
        { id: "tmpl_1", name: "Welcome Message", category: "MARKETING" },
        { id: "tmpl_2", name: "Order Confirmation", category: "UTILITY" },
        { id: "tmpl_3", name: "Flash Sale Promo", category: "MARKETING" }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Broadcast queued!")
    }

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full min-h-screen flex flex-col text-[var(--text-primary)]">
            {/* Header Area */}
            <div className="mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl tracking-tight font-display font-extrabold flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Send className="text-white" size={26} strokeWidth={2.5} />
                        </div>
                        Broadcast Studio
                    </h2>
                    <p className="text-[var(--text-secondary)] mt-3 text-lg max-w-xl">
                        Design and deploy high-conversion WhatsApp campaigns to your audience instantly or at the perfect moment.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 pb-20">

                {/* 1. AUDIENCE BENTO (LEFT, 8 Cols) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-10 border border-[var(--border)] shadow-sm flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Users size={200} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Target Audience</h3>
                        <p className="text-[var(--text-secondary)] mb-8 text-sm">Select the recipients for this campaign broadcast.</p>

                        {/* Elegant Segmented Control */}
                        <div className="flex bg-[var(--bg-base)] p-1.5 rounded-2xl border border-[var(--border)] mb-8 overflow-x-auto hide-scrollbar">
                            {(['manual', 'list', 'excel'] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setTargetType(type)}
                                    className={`relative flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap z-10 ${targetType === type ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {targetType === type && (
                                        <motion.div
                                            layoutId="activeTabAudience"
                                            className="absolute inset-0 bg-[#25D366] rounded-xl -z-10 shadow-sm"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {type === 'manual' && <Phone size={16} />}
                                    {type === 'list' && <Users size={16} />}
                                    {type === 'excel' && <FileSpreadsheet size={16} />}
                                    <span className="capitalize">{type === 'excel' ? 'Upload CSV' : type === 'list' ? 'Contact List' : 'Manual Entry'}</span>
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Input Area */}
                        <div className="bg-[var(--bg-base)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300">
                            {targetType === 'manual' && (
                                <div className="p-6">
                                    <label className="block text-sm font-bold mb-3 text-[var(--text-primary)]">Paste Phone Numbers</label>
                                    <textarea
                                        className="w-full bg-[var(--bg-card)] border-none rounded-xl p-4 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366] min-h-[160px] shadow-inner resize-y placeholder:text-[var(--text-muted)]"
                                        placeholder="Format: 1234567890, 0987654321..."
                                    />
                                </div>
                            )}
                            {targetType === 'list' && (
                                <div className="p-6">
                                    <label className="block text-sm font-bold mb-3 text-[var(--text-primary)]">Select Existing Segments</label>
                                    <div className="relative">
                                        <select className="appearance-none w-full bg-[var(--bg-card)] border-none rounded-xl px-5 py-4 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366] shadow-sm font-medium">
                                            <option>All Customers (15,402)</option>
                                            <option>VIP Buyers (2,109)</option>
                                            <option>Inactive Users (8,552)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-[var(--text-muted)]">
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            )}
                            {targetType === 'excel' && (
                                <div className="p-10 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4 text-[#25D366]">
                                        <FileSpreadsheet size={32} />
                                    </div>
                                    <p className="text-base font-bold mb-1">Drag and drop your CSV</p>
                                    <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-6">File must contain a column designated for phone numbers.</p>
                                    <button type="button" className="px-6 py-2.5 bg-[var(--bg-card)] border border-[#25D366]/50 text-[#25D366] text-sm font-bold rounded-full hover:bg-[#25D366] hover:text-white transition-colors shadow-sm">
                                        Browse Computer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* 2. TEMPLATE BENTO (RIGHT, 4 Cols) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-4 bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-8 border border-[var(--border)] shadow-sm flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#25D366]/10 to-transparent blur-3xl opacity-60 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                    <h3 className="text-2xl font-bold tracking-tight mb-2 relative z-10">Message Template</h3>
                    <p className="text-[var(--text-secondary)] mb-8 text-sm relative z-10">Select an approved Meta layout.</p>

                    <div className="flex flex-col flex-1 gap-2 relative z-10">
                        {templates.map(tmpl => (
                            <label key={tmpl.id} className={`group flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedTemplate === tmpl.id ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                                }`}>
                                <input
                                    type="radio"
                                    name="template"
                                    value={tmpl.id}
                                    checked={selectedTemplate === tmpl.id}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="hidden"
                                />
                                <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTemplate === tmpl.id ? 'border-[#25D366] bg-[#25D366]' : 'border-[var(--text-muted)] bg-transparent group-hover:border-[#25D366]/50'
                                    }`}>
                                    {selectedTemplate === tmpl.id && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-bold truncate mb-0.5">{tmpl.name}</div>
                                    <div className="text-[10px] font-extrabold tracking-wider text-[var(--text-muted)] uppercase flex items-center gap-1">
                                        <Sparkles size={10} className={tmpl.category === 'MARKETING' ? 'text-amber-500' : 'text-blue-500'} />
                                        {tmpl.category}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </motion.div>

                {/* 3. SCHEDULE BENTO (LEFT, 8 Cols) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-8 bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-10 border border-[var(--border)] shadow-sm flex flex-col"
                >
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Delivery Strategy</h3>
                    <p className="text-[var(--text-secondary)] mb-8 text-sm">Control precisely when your message blasts are executed.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                        {/* Instant Option */}
                        <label className={`flex flex-col p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all ${scheduleType === 'instant' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${scheduleType === 'instant' ? 'bg-[#25D366] text-white' : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]'
                                    }`}>
                                    <Zap size={22} fill={scheduleType === 'instant' ? "currentColor" : "none"} />
                                </div>
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleType === 'instant'}
                                    onChange={() => setScheduleType('instant')}
                                    className="scale-125 accent-[#25D366]"
                                />
                            </div>
                            <div className="text-lg font-bold mb-1">Launch Instantly</div>
                            <div className="text-sm text-[var(--text-secondary)]">Begin processing and sending immediately after targeting is matched.</div>
                        </label>

                        {/* Scheduled Option */}
                        <label className={`flex flex-col p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all ${scheduleType === 'scheduled' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${scheduleType === 'scheduled' ? 'bg-[#25D366] text-white' : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]'
                                    }`}>
                                    <Clock size={22} />
                                </div>
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleType === 'scheduled'}
                                    onChange={() => setScheduleType('scheduled')}
                                    className="scale-125 accent-[#25D366]"
                                />
                            </div>
                            <div className="text-lg font-bold mb-1">Schedule Queue</div>
                            <div className="text-sm text-[var(--text-secondary)]">Set a future automated date and time for maximum engagement.</div>
                        </label>
                    </div>

                    <AnimatePresence>
                        {scheduleType === 'scheduled' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-5 bg-[var(--bg-base)] p-6 rounded-[1.5rem] border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                    <div className="space-y-3">
                                        <label className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                                            <Calendar size={16} className="text-[var(--text-secondary)]" />
                                            Target Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#25D366]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                                            <Clock size={16} className="text-[var(--text-secondary)]" />
                                            Target Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#25D366]"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 4. ACTION BENTO (RIGHT, 4 Cols) */}
                <motion.button
                    type="submit"
                    onMouseEnter={() => setIsHoveringSubmit(true)}
                    onMouseLeave={() => setIsHoveringSubmit(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-4 bg-[#25D366] text-white rounded-[2rem] p-8 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all flex flex-col justify-end relative overflow-hidden group min-h-[250px]"
                >
                    {/* Pulsing background effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    <motion.div
                        animate={{
                            scale: isHoveringSubmit ? 1.15 : 1,
                            rotate: isHoveringSubmit ? 10 : 0
                        }}
                        className="absolute right-8 top-10 opacity-40 group-hover:opacity-100 transition-opacity"
                    >
                        <Send size={100} strokeWidth={1} fill="currentColor" />
                    </motion.div>

                    <div className="relative z-10 text-left w-full mt-auto">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                            <Send size={20} fill="currentColor" />
                        </div>
                        <h3 className="text-3xl font-display font-extrabold leading-tight mb-2 drop-shadow-sm">
                            {scheduleType === 'instant' ? 'Deploy Blast' : 'Initialize Queue'}
                        </h3>
                        <p className="font-semibold text-green-100 flex items-center gap-2">
                            Finalize and confirm &rarr;
                        </p>
                    </div>
                </motion.button>
            </form>
        </div>
    )
}
