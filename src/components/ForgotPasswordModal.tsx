import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, CheckCircle2, ArrowRight, KeyRound } from "lucide-react"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  const handleResetState = () => {
    setSubmitted(false)
    setEmail("")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetState}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* Close button */}
            <button
              onClick={handleResetState}
              className="absolute top-4 right-4 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#25D366] flex items-center justify-center mb-4">
                  <KeyRound size={24} />
                </div>

                <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Reset Password
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6 leading-relaxed">
                  Enter your registered work email address. We'll send you a
                  password reset link and a WhatsApp confirmation code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arjun@company.com"
                        className="w-full h-11 pl-10 pr-4 bg-[var(--bg-input)] rounded-xl border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#25D366] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-[#25D366] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Check your inbox!
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 mb-6 leading-relaxed max-w-xs mx-auto">
                  We sent a recovery link to{" "}
                  <span className="font-medium text-[var(--text-primary)]">
                    {email}
                  </span>
                  . Please check your email and WhatsApp notifications.
                </p>

                <button
                  onClick={handleResetState}
                  className="w-full h-11 bg-[var(--bg-hover)] text-[var(--text-primary)] font-semibold text-sm rounded-xl border border-[var(--border)] hover:border-[#25D366] transition-colors"
                >
                  Return to Login
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
