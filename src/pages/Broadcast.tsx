import { useState } from "react"
import { motion } from "framer-motion"
import {
    Users,
    FileSpreadsheet,
    Phone,
    Calendar,
    Send,
    MessageSquare,
    Clock,
    ArrowRight,
    Zap
} from "lucide-react"

type TargetType = 'list' | 'excel' | 'manual'
type ScheduleType = 'instant' | 'scheduled'

export default function Broadcast() {
    const [targetType, setTargetType] = useState<TargetType>('manual')
    const [scheduleType, setScheduleType] = useState<ScheduleType>('instant')
    const [selectedTemplate, setSelectedTemplate] = useState("")

    // Mock template list
    const templates = [
        { id: "tmpl_1", name: "Welcome Message", category: "MARKETING" },
        { id: "tmpl_2", name: "Order Confirmation", category: "UTILITY" },
        { id: "tmpl_3", name: "Promo Offer", category: "MARKETING" }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Broadcast submission logic goes here (calling the backend)
        alert("Broadcast submitted to the backend!")
    }

    return (
        <div className="p-6 max-w-4xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-6 shadow-sm"
            >
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                    <Send className="text-[#25D366]" size={22} />
                    New Broadcast Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Target Audience Section */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                            1. Who receives this message?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setTargetType('manual')}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${targetType === 'manual'
                                    ? 'border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]'
                                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/50'
                                    }`}
                            >
                                <Phone size={24} className="mb-2" />
                                <span className="font-medium text-sm">Manual Numbers</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTargetType('list')}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${targetType === 'list'
                                    ? 'border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]'
                                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/50'
                                    }`}
                            >
                                <Users size={24} className="mb-2" />
                                <span className="font-medium text-sm">Select Contacts List</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setTargetType('excel')}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${targetType === 'excel'
                                    ? 'border-[#25D366] bg-[#25D366]/5 text-[var(--text-primary)]'
                                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#25D366]/50'
                                    }`}
                            >
                                <FileSpreadsheet size={24} className="mb-2" />
                                <span className="font-medium text-sm">Upload Excel</span>
                            </button>
                        </div>

                        {/* Dynamic Input based on Choice */}
                        <div className="bg-[var(--bg-base)] p-4 rounded-xl border border-[var(--border)]">
                            {targetType === 'manual' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--text-primary)]">Enter Phone Numbers</label>
                                    <textarea
                                        className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#25D366] min-h-[100px]"
                                        placeholder="Enter numbers separated by commas (e.g. 1234567890, 0987654321)"
                                    />
                                </div>
                            )}
                            {targetType === 'list' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--text-primary)]">Select User Group</label>
                                    <select className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#25D366]">
                                        <option>All Customers</option>
                                        <option>VIP Customers</option>
                                        <option>Recent Buyers</option>
                                    </select>
                                </div>
                            )}
                            {targetType === 'excel' && (
                                <div className="text-center py-6 border-2 border-dashed border-[var(--border)] rounded-lg">
                                    <FileSpreadsheet className="mx-auto text-[var(--text-muted)] mb-2" size={32} />
                                    <p className="text-sm font-medium text-[var(--text-primary)]">Drag & drop your Excel or CSV file</p>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">Make sure it has a "phone" column.</p>
                                    <button type="button" className="mt-4 px-4 py-2 bg-[var(--bg-active)] text-[#25D366] text-sm font-medium rounded-lg hover:bg-[#25D366]/20 transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Message Template Section */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                            2. What do you want to send?
                        </h3>
                        <div className="bg-[var(--bg-base)] p-4 rounded-xl border border-[var(--border)] space-y-2">
                            <label className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                                <MessageSquare size={16} /> Select Approved Meta Template
                            </label>
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#25D366]"
                                required
                            >
                                <option value="" disabled>-- Select a template --</option>
                                {templates.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                                ))}
                            </select>
                            <p className="text-xs text-[var(--text-muted)]">Only Meta-approved templates can be used for broadcasting.</p>
                        </div>
                    </section>

                    {/* Delivery Schedule Section */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                            3. When should it be delivered?
                        </h3>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${scheduleType === 'instant'
                                ? 'border-[#25D366] bg-[#25D366]/5'
                                : 'border-[var(--border)] hover:border-[#25D366]/50'
                                }`}>
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleType === 'instant'}
                                    onChange={() => setScheduleType('instant')}
                                    className="hidden"
                                />
                                <Zap size={20} className={scheduleType === 'instant' ? "text-[#25D366]" : "text-[var(--text-muted)]"} />
                                <div>
                                    <div className="text-sm font-semibold text-[var(--text-primary)]">Send Instantly</div>
                                    <div className="text-xs text-[var(--text-muted)]">Start sending immediately</div>
                                </div>
                            </label>

                            <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${scheduleType === 'scheduled'
                                ? 'border-[#25D366] bg-[#25D366]/5'
                                : 'border-[var(--border)] hover:border-[#25D366]/50'
                                }`}>
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleType === 'scheduled'}
                                    onChange={() => setScheduleType('scheduled')}
                                    className="hidden"
                                />
                                <Clock size={20} className={scheduleType === 'scheduled' ? "text-[#25D366]" : "text-[var(--text-muted)]"} />
                                <div>
                                    <div className="text-sm font-semibold text-[var(--text-primary)]">Schedule for Later</div>
                                    <div className="text-xs text-[var(--text-muted)]">Pick a date and time</div>
                                </div>
                            </label>
                        </div>

                        {scheduleType === 'scheduled' && (
                            <div className="bg-[var(--bg-base)] p-4 rounded-xl border border-[var(--border)] flex items-center gap-4">
                                <Calendar size={20} className="text-[var(--text-secondary)]" />
                                <input
                                    type="datetime-local"
                                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#25D366]"
                                />
                            </div>
                        )}
                    </section>

                    {/* Submit Action */}
                    <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm"
                        >
                            Confirm & {scheduleType === 'instant' ? 'Send Now' : 'Schedule'}
                            <ArrowRight size={18} />
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    )
}
