import { useState, useRef, useEffect } from "react"
import {
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  Mic,
  Image,
  FileText,
  Check,
  CheckCheck,
  X,
  Tag,
  User,
  Filter,
  ArrowUp,
  ArrowLeft,
} from "lucide-react"

const EMOJIS = [
  "😊",
  "😂",
  "❤️",
  "👍",
  "🙏",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "👏",
  "🔥",
  "✅",
  "🎉",
  "💯",
  "😢",
  "😮",
  "😴",
  "🤝",
  "👀",
  "💪",
  "🚀",
  "⭐",
  "💬",
  "📞",
  "✨",
  "🌟",
  "💡",
  "📦",
  "🎁",
  "🛒",
]

interface Message {
  id: number
  type: "in" | "out" | "date"
  text: string
  time: string
  status?: "sending" | "sent" | "delivered" | "read"
}

const conversations = [
  {
    id: 1,
    name: "Priya Singh",
    phone: "+91 98765 43210",
    lastMsg: "Thank you for the quick response!",
    time: "2m",
    unread: 2,
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=48&h=48&fit=crop",
    agent: "Rahul K.",
    status: "open",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    phone: "+91 87654 32109",
    lastMsg: "When will my order be delivered?",
    time: "15m",
    unread: 0,
    online: false,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop",
    agent: "Sneha P.",
    status: "open",
  },
  {
    id: 3,
    name: "Ananya Patel",
    phone: "+91 76543 21098",
    lastMsg: "I need help with my account",
    time: "1h",
    unread: 1,
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop",
    agent: "Arjun S.",
    status: "pending",
  },
  {
    id: 4,
    name: "Vikram Shah",
    phone: "+91 65432 10987",
    lastMsg: "Please send the invoice again",
    time: "3h",
    unread: 0,
    online: false,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
    agent: "Rahul K.",
    status: "resolved",
  },
  {
    id: 5,
    name: "Meera Nair",
    phone: "+91 54321 09876",
    lastMsg: "Got it, thanks!",
    time: "5h",
    unread: 0,
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop",
    agent: "Sneha P.",
    status: "open",
  },
  {
    id: 6,
    name: "Kiran Reddy",
    phone: "+91 43210 98765",
    lastMsg: "I'll check and get back",
    time: "1d",
    unread: 0,
    online: false,
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=48&h=48&fit=crop",
    agent: "Arjun S.",
    status: "open",
  },
]

const initialMessages: Message[] = [
  { id: 1, type: "date", text: "Today", time: "" },
  {
    id: 2,
    type: "in",
    text: "Hi, I wanted to ask about my recent order #ORD-2847",
    time: "10:22 AM",
    status: "read",
  },
  {
    id: 3,
    type: "out",
    text: "Hello Priya! I'd be happy to help you with order #ORD-2847. Let me check the details for you right away.",
    time: "10:23 AM",
    status: "read",
  },
  {
    id: 4,
    type: "in",
    text: "Thank you! I was expecting it yesterday but it hasn't arrived yet",
    time: "10:24 AM",
    status: "read",
  },
  {
    id: 5,
    type: "out",
    text: "I apologize for the delay. Our records show your order is currently out for delivery and should arrive within the next 2–3 hours.",
    time: "10:26 AM",
    status: "read",
  },
  {
    id: 6,
    type: "in",
    text: "Oh great! That's a relief. Can you also confirm my delivery address?",
    time: "10:27 AM",
    status: "read",
  },
  {
    id: 7,
    type: "out",
    text: "Of course! The delivery address on file is: 42 Green Valley, Koramangala, Bangalore - 560034. Is this correct?",
    time: "10:28 AM",
    status: "read",
  },
  {
    id: 8,
    type: "in",
    text: "Yes that's correct! Thank you for the quick response! 😊",
    time: "10:30 AM",
    status: "read",
  },
]

const AUTO_REPLIES = [
  "Got it! Let me check that for you 😊",
  "Sure, I'll look into this right away.",
  "Thanks for the info! One moment please.",
  "I understand. Let me connect you with the right team.",
  "Perfect, noted! Is there anything else I can help you with?",
]

function getTime() {
  const now = new Date()
  return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

const filters = ["All", "Unread", "Assigned to me", "Groups"]

export default function Chat() {
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCustomerPanel, setShowCustomerPanel] = useState(true)
  const [mobileView, setMobileView] = useState<"list" | "chat" | "profile">("list")
  const [noteText, setNoteText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const emojiRef = useRef<HTMLDivElement>(null)
  let autoReplyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredConvs = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Close emoji picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const sendMessage = () => {
    const text = message.trim()
    if (!text) return
    const newMsg: Message = {
      id: Date.now(),
      type: "out",
      text,
      time: getTime(),
      status: "sending",
    }
    setMessages((m) => [...m, newMsg])
    setMessage("")
    setShowEmoji(false)

    // Simulate sent → delivered
    setTimeout(() => {
      setMessages((m) =>
        m.map((x) => (x.id === newMsg.id ? { ...x, status: "delivered" } : x)),
      )
    }, 600)

    // Simulate typing indicator then auto reply
    setTimeout(() => setIsTyping(true), 1200)
    autoReplyTimer.current = setTimeout(() => {
      setIsTyping(false)
      const reply: Message = {
        id: Date.now() + 1,
        type: "in",
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: getTime(),
        status: "read",
      }
      setMessages((m) => {
        const updated = m.map((x) =>
          x.id === newMsg.id ? { ...x, status: "read" as const } : x,
        )
        return [...updated, reply]
      })
    }, 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const addEmoji = (emoji: string) => {
    setMessage((m) => m + emoji)
    inputRef.current?.focus()
  }

  const cardClasses = "bg-[var(--bg-card)] border-[var(--border)] border";

  return (
    <div
      className="flex h-[calc(100vh-64px)] overflow-hidden bg-[var(--bg-base)] w-full"
    >
      {/* Left: Conversation list */}
      <div
        className={`${mobileView === 'list' ? 'flex' : 'hidden'} md:flex w-full md:w-[280px] lg:w-[300px] flex-shrink-0 border-r flex-col bg-[var(--bg-card)] border-[var(--border)]`}
      >
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="font-display font-bold text-[16px]"
              style={{ color: "var(--text-primary)" }}
            >
              Conversations
            </h2>
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <Filter size={15} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded-xl text-[12px] font-semibold hover:bg-[#22C55E] transition-colors">
                <Plus size={14} />
                New
              </button>
            </div>
          </div>
          <div
            className="flex items-center gap-2 rounded-xl px-3 h-9 border"
            style={{
              background: "var(--bg-input)",
              borderColor: "var(--border)",
            }}
          >
            <Search size={14} style={{ color: "var(--text-muted)" }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="flex-1 bg-transparent text-[13px] outline-none"
              style={{ color: "var(--text-primary)" }}
            />
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex gap-1 px-3 py-2 overflow-x-auto border-b"
          style={{ borderColor: "var(--border)" }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors"
              style={{
                background:
                  activeFilter === f ? "var(--bg-active)" : "transparent",
                color: activeFilter === f ? "#25D366" : "var(--text-secondary)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setSelectedConv(conv)
                setMessages(initialMessages)
                setMobileView("chat")
              }}
              className="flex items-center gap-3 px-3 py-3 border-b cursor-pointer transition-colors"
              style={{
                borderColor: "var(--border)",
                background:
                  selectedConv.id === conv.id
                    ? "var(--bg-active)"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                if (selectedConv.id !== conv.id)
                  e.currentTarget.style.background = "var(--bg-hover)"
              }}
              onMouseLeave={(e) => {
                if (selectedConv.id !== conv.id)
                  e.currentTarget.style.background = "transparent"
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${conv.online ? "bg-[#25D366]" : "bg-gray-400"
                    }`}
                  style={{ borderColor: "var(--bg-card)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className="text-[13px] font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {conv.name}
                  </span>
                  <span
                    className="text-[11px] flex-shrink-0 ml-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] truncate flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {conv.lastMsg}
                  </span>
                  {conv.unread > 0 && (
                    <span className="ml-1.5 flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center px-1">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium ${conv.status === "open"
                      ? "bg-blue-500/10 text-blue-500"
                      : conv.status === "pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-[#25D366]/10 text-[#25D366]"
                      }`}
                  >
                    {conv.status}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    · {conv.agent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat */}
      <div
        className={`${mobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0`}
        style={{ background: "var(--bg-base)" }}
      >
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <button
            onClick={() => setMobileView('list')}
            className="md:hidden p-2 -ml-2 mr-1 rounded-xl transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="relative">
            <img
              src={selectedConv.avatar}
              alt={selectedConv.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${selectedConv.online ? "bg-[#25D366]" : "bg-gray-400"
                }`}
              style={{ borderColor: "var(--bg-card)" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="font-semibold text-[14px]"
              style={{ color: "var(--text-primary)" }}
            >
              {selectedConv.name}
            </div>
            <div
              className="text-[12px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {selectedConv.online ? "🟢 Online" : "Last seen recently"} ·{" "}
              {selectedConv.phone}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[Search, Phone, Video].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-xl transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Icon size={16} />
              </button>
            ))}
            <button
              onClick={() => {
                setShowCustomerPanel(!showCustomerPanel)
                if (!showCustomerPanel || mobileView !== 'profile') {
                  setMobileView('profile')
                } else {
                  setMobileView('chat')
                }
              }}
              className="p-2 rounded-xl transition-colors"
              style={{
                background: showCustomerPanel
                  ? "var(--bg-active)"
                  : "transparent",
                color: showCustomerPanel ? "#25D366" : "var(--text-secondary)",
              }}
            >
              <User size={16} />
            </button>
            <button
              className="p-2 rounded-xl transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{
            background: "var(--bg-base)",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        >
          {messages.map((msg) => {
            if (msg.type === "date") {
              return (
                <div key={msg.id} className="flex items-center justify-center">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] border"
                    style={{
                      background: "var(--bg-card)",
                      color: "var(--text-muted)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              )
            }
            if (msg.type === "in") {
              return (
                <div key={msg.id} className="flex items-end gap-2 max-w-[70%]">
                  <img
                    src={selectedConv.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
                  />
                  <div>
                    <div
                      className="rounded-2xl rounded-bl-sm px-4 py-2.5 border"
                      style={{
                        background: "var(--bg-card)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <p
                        className="text-[13.5px] leading-relaxed"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {msg.text}
                      </p>
                    </div>
                    <div
                      className="text-[10.5px] mt-1 ml-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div
                key={msg.id}
                className="flex items-end gap-2 max-w-[70%] ml-auto flex-row-reverse"
              >
                <div>
                  <div
                    className="rounded-2xl rounded-br-sm px-4 py-2.5"
                    style={{ background: "#DCF8C6" }}
                  >
                    <p className="text-[13.5px] leading-relaxed text-[#111827]">
                      {msg.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                    <span
                      className="text-[10.5px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {msg.time}
                    </span>
                    {msg.status === "sending" && (
                      <Check size={12} className="text-gray-400" />
                    )}
                    {msg.status === "sent" && (
                      <Check size={12} className="text-gray-400" />
                    )}
                    {msg.status === "delivered" && (
                      <CheckCheck size={13} className="text-gray-400" />
                    )}
                    {msg.status === "read" && (
                      <CheckCheck size={13} className="text-[#25D366]" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 max-w-[70%]">
              <img
                src={selectedConv.avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
              />
              <div
                className="rounded-2xl rounded-bl-sm px-4 py-3 border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#94A3B8] inline-block"
                      style={{
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer */}
        <div
          className="p-3 border-t relative"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {/* Emoji picker */}
          {showEmoji && (
            <div
              ref={emojiRef}
              className="absolute bottom-full left-3 mb-2 p-3 rounded-2xl border shadow-xl grid grid-cols-6 gap-1.5 z-20 w-[220px]"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  onClick={() => addEmoji(e)}
                  className="text-[20px] hover:scale-125 transition-transform leading-none p-0.5"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <div
              className="flex-1 flex items-end gap-2 rounded-2xl px-3 py-2 border"
              style={{
                background: "var(--bg-input)",
                borderColor: "var(--border)",
              }}
            >
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className="p-1 transition-colors flex-shrink-0"
                style={{ color: showEmoji ? "#25D366" : "var(--text-muted)" }}
              >
                <Smile size={20} />
              </button>
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="flex-1 bg-transparent text-[13.5px] outline-none resize-none max-h-[120px]"
                style={{ color: "var(--text-primary)", minHeight: "24px" }}
              />
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  className="p-1 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#25D366")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Paperclip size={18} />
                </button>
                <button
                  className="p-1 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#25D366")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Image size={18} />
                </button>
                <button
                  className="p-1 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#25D366")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <FileText size={18} />
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: message.trim() ? "#25D366" : "var(--bg-input)",
                color: message.trim() ? "white" : "var(--text-muted)",
              }}
            >
              {message.trim() ? <Send size={17} /> : <Mic size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Right: Customer info */}
      {showCustomerPanel && (
        <div
          className={`${mobileView === 'profile' ? 'flex' : 'hidden'} md:flex w-full md:w-[280px] flex-shrink-0 border-l flex-col overflow-y-auto`}
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div
            className="p-4 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileView('chat')}
                className="md:hidden p-1.5 -ml-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <ArrowLeft size={16} />
              </button>
              <div
                className="font-display font-semibold text-[14px]"
                style={{ color: "var(--text-primary)" }}
              >
                Customer Info
              </div>
            </div>
            <button
              onClick={() => setShowCustomerPanel(false)}
              className="p-1 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={14} />
            </button>
          </div>

          <div
            className="p-4 text-center border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <img
              src={selectedConv.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
            />
            <div
              className="font-semibold text-[15px]"
              style={{ color: "var(--text-primary)" }}
            >
              {selectedConv.name}
            </div>
            <div
              className="text-[13px] mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {selectedConv.phone}
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span className="text-[12px] text-[#25D366] font-medium">
                Online
              </span>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {[
              { label: "Email", value: "priya.singh@email.com" },
              { label: "Tags", value: "VIP, Premium" },
              { label: "Assigned", value: selectedConv.agent },
              { label: "Status", value: selectedConv.status },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-[11px] uppercase tracking-wider font-semibold mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </div>
                <div
                  className="text-[13px] font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {value}
                </div>
              </div>
            ))}

            <div>
              <div
                className="text-[11px] uppercase tracking-wider font-semibold mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Notes
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="w-full rounded-xl px-3 py-2 text-[12.5px] outline-none resize-none border transition-colors"
                style={{
                  background: "var(--bg-input)",
                  color: "var(--text-primary)",
                  borderColor: "var(--border)",
                }}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <button className="w-full py-2 rounded-xl bg-[#F0FDF4] text-[#25D366] text-[13px] font-semibold hover:bg-[#DCFCE7] transition-colors">
                Assign Agent
              </button>
              <button
                className="w-full py-2 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors border"
                style={{
                  background: "var(--bg-input)",
                  color: "var(--text-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <Tag size={14} />
                Add Tag
              </button>
              <button className="w-full py-2 rounded-xl bg-red-500/10 text-red-500 text-[13px] font-semibold hover:bg-red-500/20 transition-colors">
                Close Conversation
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}
