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
    CheckCircle2,
    ChevronLeft,
    MoreVertical,
    Video,
    Phone as PhoneCall
} from "lucide-react"

type TargetType = 'manual' | 'list' | 'excel'
type ScheduleType = 'instant' | 'scheduled'

// Mock Templates mapping to real message preview data
const templatesList = [
    {
        id: "tmpl_1",
        name: "Welcome Onboarding",
        category: "MARKETING",
        previewText: "Hey there! 👋 Welcome to WhatsApi. We're thrilled to have you on board. Reply 'HELP' if you need anything to get started!"
    },
    {
        id: "tmpl_2",
        name: "Order Confirmation",
        category: "UTILITY",
        previewText: "Order Confirmed ✅\n\nYour order #12894 has been successfully placed. We will notify you once it ships. Track it here: https://link.cc"
    },
    {
        id: "tmpl_3",
        name: "Flash Sale Promo",
        category: "MARKETING",
        previewText: "🚨 FLASH SALE LIVE 🚨\n\nGet 50% off all premium plans for the next 24 hours. Use code BLACKFRIDAY at checkout.\n\nShop now!"
    }
]

export default function Broadcast() {
    const [targetType, setTargetType] = useState<TargetType>('manual')
    const [scheduleType, setScheduleType] = useState<ScheduleType>('instant')
    const [selectedTemplate, setSelectedTemplate] = useState("tmpl_1")
    const [isHoveringSubmit, setIsHoveringSubmit] = useState(false)

    const activeTemplate = templatesList.find(t => t.id === selectedTemplate)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Broadcast queued!")
    }

    return (
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full min-h-[calc(100vh-64px)] flex flex-col text-[var(--text-primary)]">
            {/* Header Area */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl tracking-tight font-display font-extrabold flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Send className="text-white" size={26} strokeWidth={2.5} />
                        </div>
                        Broadcast Studio
                    </h2>
                    <p className="text-[var(--text-secondary)] mt-3 text-lg max-w-xl">
                        Design and deploy high-conversion WhatsApp campaigns to your audience.
                    </p>
                </div>
            </div>

            {/* Split Layout: Left Form (Bento), Right Phone Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-20">

                {/* LEFT SIDE: BENTO CARDS */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">

                    {/* BENTO 1: AUDIENCE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-8 border border-[var(--border)] shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Users size={160} strokeWidth={1} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold tracking-tight mb-1">Target Audience</h3>
                            <p className="text-[var(--text-secondary)] mb-6 text-sm">Select the recipients for this campaign broadcast.</p>

                            <div className="flex bg-[var(--bg-base)] p-1.5 rounded-2xl border border-[var(--border)] mb-6 overflow-x-auto hide-scrollbar">
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

                            <div className="bg-[var(--bg-base)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300">
                                {targetType === 'manual' && (
                                    <div className="p-6">
                                        <label className="block text-sm font-bold mb-3 text-[var(--text-primary)]">Paste Phone Numbers</label>
                                        <textarea
                                            className="w-full bg-[var(--bg-card)] border-none rounded-xl p-4 text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[#25D366] min-h-[120px] shadow-sm resize-y placeholder:text-[var(--text-muted)]"
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
                                    <div className="p-8 flex flex-col items-center justify-center text-center">
                                        <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-3 text-[#25D366]">
                                            <FileSpreadsheet size={28} />
                                        </div>
                                        <p className="text-[15px] font-bold mb-1">Drag and drop your CSV</p>
                                        <p className="text-xs text-[var(--text-secondary)] max-w-xs mb-5">File must contain a column designated for phone numbers.</p>
                                        <button type="button" className="px-5 py-2 bg-[var(--bg-card)] border border-[#25D366]/50 text-[#25D366] text-xs font-bold rounded-full hover:bg-[#25D366] hover:text-white transition-colors shadow-sm">
                                            Browse Computer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* TWO COLUMN INNER GRID: Template & Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* BENTO 2: TEMPLATE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-8 border border-[var(--border)] shadow-sm flex flex-col relative overflow-hidden"
                        >
                            <h3 className="text-xl font-bold tracking-tight mb-1 relative z-10">Message Template</h3>
                            <p className="text-[var(--text-secondary)] mb-6 text-sm relative z-10">Select an approved Meta layout.</p>

                            <div className="flex flex-col flex-1 gap-2 relative z-10">
                                {templatesList.map(tmpl => (
                                    <label key={tmpl.id} className={`group flex items-start gap-4 p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${selectedTemplate === tmpl.id ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="template"
                                            value={tmpl.id}
                                            checked={selectedTemplate === tmpl.id}
                                            onChange={(e) => setSelectedTemplate(e.target.value)}
                                            className="hidden"
                                        />
                                        <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTemplate === tmpl.id ? 'border-[#25D366] bg-[#25D366]' : 'border-[var(--text-muted)] bg-transparent group-hover:border-[#25D366]/50'
                                            }`}>
                                            {selectedTemplate === tmpl.id && <CheckCircle2 size={10} className="text-white" strokeWidth={3} />}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold truncate mb-0.5">{tmpl.name}</div>
                                            <div className="text-[9px] font-extrabold tracking-wider text-[var(--text-muted)] uppercase flex items-center gap-1">
                                                <Sparkles size={10} className={tmpl.category === 'MARKETING' ? 'text-amber-500' : 'text-blue-500'} />
                                                {tmpl.category}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </motion.div>

                        {/* BENTO 3: SCHEDULE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-[var(--bg-card)] rounded-[2rem] p-6 sm:p-8 border border-[var(--border)] shadow-sm flex flex-col"
                        >
                            <h3 className="text-xl font-bold tracking-tight mb-1">Delivery Time</h3>
                            <p className="text-[var(--text-secondary)] mb-6 text-sm">When should this campaign blast?</p>

                            <div className="flex flex-col gap-3 mb-2">
                                <label className={`flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${scheduleType === 'instant' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        checked={scheduleType === 'instant'}
                                        onChange={() => setScheduleType('instant')}
                                        className="mt-1 scale-110 accent-[#25D366]"
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-[var(--text-primary)] mb-0.5 flex items-center gap-2">
                                            <Zap size={14} className={scheduleType === 'instant' ? 'text-[#25D366]' : 'text-[var(--text-muted)]'} />
                                            Launch Instantly
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)] leading-snug">Process campaign immediately.</div>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${scheduleType === 'scheduled' ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[var(--border)] bg-[var(--bg-base)] hover:border-[#25D366]/40'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        checked={scheduleType === 'scheduled'}
                                        onChange={() => setScheduleType('scheduled')}
                                        className="mt-1 scale-110 accent-[#25D366]"
                                    />
                                    <div className="flex-1 w-full min-w-0">
                                        <div className="text-sm font-bold text-[var(--text-primary)] mb-0.5 flex items-center gap-2">
                                            <Clock size={14} className={scheduleType === 'scheduled' ? 'text-[#25D366]' : 'text-[var(--text-muted)]'} />
                                            Schedule for Later
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)] leading-snug">Pick a specific date & time.</div>

                                        <AnimatePresence>
                                            {scheduleType === 'scheduled' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden mt-3 pt-3 border-t border-[var(--border)]"
                                                >
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-[var(--text-secondary)]">Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#25D366]"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-[var(--text-secondary)]">Time</label>
                                                            <input
                                                                type="time"
                                                                className="w-full bg-[var(--bg-card)] border-none shadow-sm rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#25D366]"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    {/* BENTO 4: ACTION */}
                    <motion.button
                        type="submit"
                        onMouseEnter={() => setIsHoveringSubmit(true)}
                        onMouseLeave={() => setIsHoveringSubmit(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full bg-[#25D366] text-white rounded-[2rem] p-6 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all flex items-center justify-between relative overflow-hidden group min-h-[100px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                        <div className="text-left relative z-10 flex flex-col justify-center">
                            <h3 className="text-2xl font-display font-extrabold leading-tight">
                                {scheduleType === 'instant' ? 'Deploy Blast' : 'Initialize Queue'}
                            </h3>
                            <p className="font-medium text-green-100/90 text-sm mt-0.5">
                                Ensure preview to the right is correct &rarr;
                            </p>
                        </div>

                        <motion.div
                            animate={{
                                scale: isHoveringSubmit ? 1.05 : 1,
                            }}
                            className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md relative z-10"
                        >
                            <Send size={24} fill="currentColor" className={isHoveringSubmit ? "translate-x-0.5 -translate-y-0.5 transition-transform" : "transition-transform"} />
                        </motion.div>
                    </motion.button>
                </form>

                {/* RIGHT SIDE: PHONE PREVIEW */}
                <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-4 h-fit pb-8 lg:pb-0">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative mx-auto w-[320px] h-[650px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-900 overflow-hidden flex flex-col"
                    >
                        {/* Phone Notch/Dynamic Island */}
                        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                            <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
                        </div>

                        {/* WhatsApp Headers inside phone screen */}
                        <div className="flex-1 bg-[#EFEAE2] flex flex-col rounded-[2.5rem] overflow-hidden relative border border-gray-800">

                            {/* WhatsApp App Header */}
                            <div className="bg-[#008069] text-white px-4 pt-10 pb-3 flex items-center justify-between shadow-md z-10 relative">
                                <div className="flex items-center gap-2">
                                    <ChevronLeft size={24} />
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex flex-shrink-0 items-center justify-center p-0.5 overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-[15px] truncate max-w-[120px]">Target User</h4>
                                        <p className="text-[11px] text-white/80 shrink-0">online</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Video size={18} />
                                    <PhoneCall size={18} />
                                    <MoreVertical size={20} />
                                </div>
                            </div>

                            {/* Chat Area */}
                            {/* SVG Chat Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('https://i.ibb.co/F4Zp84K/whatsapp-bg.png')", backgroundSize: '400px' }} />

                            <div className="flex-1 p-4 overflow-y-auto flex flex-col pt-6 z-10 relative gap-2">

                                {/* Timestamp bubble */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-[#FFF3C2] text-[#4A5D6A] text-[10.5px] px-3 py-1 rounded-lg uppercase tracking-wide shadow-sm font-semibold">
                                        Today
                                    </div>
                                </div>

                                {/* Incoming Message (Mock User) */}
                                <div className="max-w-[85%] self-start bg-white rounded-2xl rounded-tl-sm p-2.5 pb-2 shadow-sm text-[14.2px] leading-snug relative">
                                    <span className="absolute -left-2 top-0 text-white w-4 h-4">
                                        <svg viewBox="0 0 8 13" width="8" height="13" className=""><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg>
                                    </span>
                                    Hi! I wanted to check my account.
                                    <div className="text-[10px] text-right text-gray-400 mt-1 uppercase">
                                        10:41 AM
                                    </div>
                                </div>

                                {/* Outgoing Message (Broadcast Template Preview) */}
                                <div className="max-w-[90%] self-end bg-[#D9FDD3] rounded-2xl rounded-tr-sm p-3 pb-2 shadow-sm text-[14.2px] leading-snug relative mt-2">
                                    <span className="absolute -right-2 top-0 text-[#D9FDD3] w-4 h-4">
                                        <svg viewBox="0 0 8 13" width="8" height="13" className=""><path opacity=".13" fill="#000000" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
                                    </span>
                                    <div className="whitespace-pre-wrap text-[#111B21]">
                                        {activeTemplate?.previewText || "Select a template..."}
                                    </div>
                                    <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-[#667781] uppercase font-medium">
                                        10:42 AM
                                        <span className="text-[#53bdeb] ml-0.5">
                                            <svg viewBox="0 0 16 15" width="16" height="15" className=""><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Input area mockup */}
                            <div className="bg-[#F0F2F5] px-3 py-3 flex items-center gap-3 z-10 sticky bottom-0">
                                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="#54656F" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                </div>
                                <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center border border-gray-200">
                                    <span className="text-[#8696A0] text-sm">Message</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center shrink-0 shadow-sm text-white">
                                    <MessageSquare size={18} fill="currentColor" className="opacity-90" />
                                </div>
                            </div>
                        </div>

                        {/* Phone bottom bar */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
