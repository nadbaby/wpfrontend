import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
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
  Image as ImageIcon,
  FileText,
  Check,
  CheckCheck,
  X,
  Tag,
  User,
  Filter,
  ArrowUp,
  ArrowLeft,
  Menu,
  Trash2,
  Camera,
  UserSquare,
  MapPin,
  Play,
  Pause,
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
  text?: string
  time: string
  status?: "sending" | "sent" | "delivered" | "read"
  isTemplate?: boolean;
  templateButtons?: string[];
  media?: {
    type: "image" | "video" | "audio" | "document"
    url: string
    name?: string
  }
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
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const colors = {
    bgApp: isDark ? "var(--bg-base)" : "#efeae2",
    bgChatPanel: isDark ? "var(--bg-base)" : "#ffffff",
    bgChat: isDark ? "var(--bg-base)" : "#efeae2",
    bgHeader: isDark ? "var(--bg-card)" : "#f0f2f5",
    border: isDark ? "var(--border)" : "#d1d7db",
    textPrimary: isDark ? "var(--text-primary)" : "#111b21",
    textSecondary: isDark ? "var(--text-muted)" : "#54656f",
    bgIn: isDark ? "var(--bg-card)" : "#ffffff",
    bgOut: isDark ? "var(--bg-hover)" : "#dcf8c6",
    bgComposer: isDark ? "var(--bg-card)" : "#f0f2f5",
    bgComposerInput: isDark ? "var(--bg-input)" : "#ffffff",
    bgHover: isDark ? "var(--bg-hover)" : "#f5f6f6",
    bgActive: isDark ? "var(--bg-input)" : "#ebebeb",
    bgSearch: isDark ? "var(--bg-input)" : "#f0f2f5",
    bgFilterActive: isDark ? "var(--bg-hover)" : "#dcf8c6",
    textFilterActive: isDark ? "var(--text-primary)" : "#005c4b",
    bgFilter: isDark ? "var(--bg-input)" : "#f0f2f5",
  }

  const [convs, setConvs] = useState(conversations)
  const [selectedConvId, setSelectedConvId] = useState(conversations[0].id)
  const selectedConv = convs.find(c => c.id === selectedConvId) || convs[0]

  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({
    [conversations[0].id]: initialMessages
  })
  const messages = chatMessages[selectedConv.id] || []

  const setMessages = (setter: (msgs: Message[]) => Message[]) => {
    setChatMessages(prev => ({
      ...prev,
      [selectedConv.id]: setter(prev[selectedConv.id] || [])
    }))
  }

  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCustomerPanel, setShowCustomerPanel] = useState(true)
  const [mobileView, setMobileView] = useState<"list" | "chat" | "profile">(
    "list",
  )
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [noteText, setNoteText] = useState("")

  // Media / Attachment states
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [mediaPreview, setMediaPreview] = useState<{
    file: File
    url: string
    type: "image" | "video" | "document"
  } | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const emojiRef = useRef<HTMLDivElement>(null)
  const attachRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  )
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
    triggerAutoReply(newMsg.id)
  }

  const triggerAutoReply = (msgId: number) => {
    // Simulate sent → delivered
    setTimeout(() => {
      setMessages((m) =>
        m.map((x) => (x.id === msgId ? { ...x, status: "delivered" } : x)),
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
          x.id === msgId ? { ...x, status: "read" as const } : x,
        )
        return [...updated, reply]
      })
    }, 3000)
  }

  const assignAgent = (agentName: string) => {
    setConvs(prev => prev.map(c =>
      c.id === selectedConv.id ? { ...c, agent: agentName } : c
    ));

    // Send a system message that the chat was re-assigned
    const sysMsg: Message = {
      id: Date.now(),
      type: "date",
      text: `Chat automatically assigned to ${agentName}`,
      time: getTime()
    };
    setMessages(m => [...m, sysMsg]);
  }

  const simulateCustomerTemplateClick = (option: string) => {
    // Customer clicks the button
    const replyMsg: Message = {
      id: Date.now(),
      type: "in",
      text: `${option}`,
      time: getTime(),
      status: "read"
    };
    setMessages(m => [...m, replyMsg]);

    // System detects the payload and routes to agent automatically
    setTimeout(() => {
      let routeTarget = "Arjun S."; // Default
      if (option === "Sales") routeTarget = "Sales Team";
      if (option === "Marketing") routeTarget = "Marketing Dept";
      assignAgent(routeTarget);
    }, 600);
  }

  const sendDemoTemplate = () => {
    const templateMsg: Message = {
      id: Date.now(),
      type: "out",
      text: "Welcome to WhatsApi! Please select the department you would like to speak with:",
      isTemplate: true,
      templateButtons: ["Sales", "Marketing", "Support"],
      time: getTime(),
      status: "read"
    };
    setMessages(m => [...m, templateMsg]);
    setShowAttachMenu(false);
  }

  // --- Microphone Recording ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
          const url = URL.createObjectURL(blob)
          sendMediaMessage(url, "audio")
        }
      }

      recorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      recordingIntervalRef.current = setInterval(
        () => setRecordingTime((t) => t + 1),
        1000,
      )
    } catch (err) {
      console.error("Microphone access denied", err)
      alert("Microphone access is required to send voice messages.")
    }
  }

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      audioChunksRef.current = [] // clear so onstop doesn't send
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingIntervalRef.current)
        clearInterval(recordingIntervalRef.current)
    }
  }

  const sendRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingIntervalRef.current)
        clearInterval(recordingIntervalRef.current)
    }
  }

  const formatRecTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  // --- Attachments ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    let type: "image" | "video" | "document" = "document"
    if (file.type.startsWith("image/")) type = "image"
    else if (file.type.startsWith("video/")) type = "video"
    setMediaPreview({ file, url, type })
    setShowAttachMenu(false)
    e.target.value = ""
  }

  const sendMediaPreview = () => {
    if (mediaPreview) {
      sendMediaMessage(
        mediaPreview.url,
        mediaPreview.type,
        mediaPreview.file.name,
      )
      setMediaPreview(null)
    }
  }

  const sendMediaMessage = (
    url: string,
    type: "image" | "video" | "audio" | "document",
    name?: string,
  ) => {
    const newMsg: Message = {
      id: Date.now(),
      type: "out",
      text: type === "document" ? name : undefined,
      time: getTime(),
      status: "sending",
      media: { type, url, name },
    }
    setMessages((m) => [...m, newMsg])
    setMessage("")
    triggerAutoReply(newMsg.id)
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

  const cardClasses = "bg-[var(--bg-card)] border-[var(--border)] border"

  return (
    <div
      className="flex h-full overflow-hidden w-full relative"
      style={{ backgroundColor: colors.bgApp }}
    >
      {/* Left: Conversation list */}
      <div
        className={`${mobileView === "list" ? "flex" : "hidden"
          } md:flex w-full md:w-[350px] lg:w-[400px] flex-shrink-0 border-r flex-col`}
        style={{
          backgroundColor: colors.bgChatPanel,
          borderColor: colors.border,
        }}
      >
        <div
          className="px-3 pb-2 border-b"
          style={{
            paddingTop: "max(env(safe-area-inset-top), 12px)",
            backgroundColor: colors.bgChatPanel,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 -ml-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textPrimary }}
                onClick={() => window.dispatchEvent(new Event("openSidebar"))}
              >
                <Menu size={20} />
              </button>
              <h2
                className="font-bold text-[22px] tracking-tight"
                style={{ color: colors.textPrimary }}
              >
                Chats
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewChatModal(true)}
                className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textPrimary }}
                title="New chat"
              >
                <Plus size={20} />
              </button>
              <button
                className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textPrimary }}
                title="Menu"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div
            className="flex items-center rounded-lg px-3 h-9 transition-colors focus-within:shadow-sm"
            style={{ backgroundColor: colors.bgSearch }}
          >
            <Search size={16} style={{ color: colors.textSecondary }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start new chat"
              className="flex-1 bg-transparent text-[14px] ml-4 outline-none placeholder:text-[14px]"
              style={{ color: colors.textPrimary }}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor:
                    activeFilter === f
                      ? colors.bgFilterActive
                      : colors.bgFilter,
                  color:
                    activeFilter === f
                      ? colors.textFilterActive
                      : colors.textSecondary,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {filteredConvs.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setSelectedConvId(conv.id)
                setMobileView("chat")
              }}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors relative"
              style={{
                background:
                  selectedConv.id === conv.id ? colors.bgActive : "transparent",
              }}
              onMouseEnter={(e) => {
                if (selectedConv.id !== conv.id)
                  e.currentTarget.style.background = colors.bgHover
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
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
              </div>

              <div
                className="flex-1 min-w-0 pr-2 py-1 border-b"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className="text-[16px] font-medium truncate"
                    style={{ color: colors.textPrimary }}
                  >
                    {conv.name}
                  </span>
                  <span
                    className="text-[12px] flex-shrink-0 ml-2"
                    style={{
                      color: conv.unread > 0 ? "#25D366" : colors.textSecondary,
                    }}
                  >
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[13.5px] truncate flex-1 leading-snug"
                    style={{
                      color: colors.textSecondary,
                      fontWeight: conv.unread > 0 ? 500 : 400,
                    }}
                  >
                    {conv.lastMsg}
                  </span>
                  {conv.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 min-w-[20px] h-[20px] rounded-full bg-[#25D366] text-[var(--bg-card)] text-[11px] font-bold flex items-center justify-center px-1">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat */}
      <div
        className={`${mobileView === "chat" ? "flex" : "hidden"
          } md:flex flex-1 flex-col min-w-0 relative`}
      >
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-4 border-b z-10"
          style={{
            paddingTop: "max(env(safe-area-inset-top), 10px)",
            paddingBottom: "10px",
            background: colors.bgHeader,
            borderColor: colors.border,
          }}
        >
          <button
            onClick={() => setMobileView("list")}
            className="md:hidden p-2 -ml-2 mr-1 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: colors.textSecondary }}
          >
            <ArrowLeft size={18} />
          </button>
          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
            onClick={() => {
              setShowCustomerPanel(true)
              setMobileView("profile")
            }}
          >
            <div className="relative">
              <img
                src={selectedConv.avatar}
                alt={selectedConv.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${selectedConv.online ? "bg-[#25D366]" : "bg-gray-400"
                  }`}
                style={{ borderColor: colors.bgHeader }}
              />
            </div>
            <div className="flex-1 min-w-0 group-hover:opacity-80 transition-opacity">
              <div
                className="font-semibold text-[15px]"
                style={{ color: colors.textPrimary }}
              >
                {selectedConv.name}
              </div>
              <div
                className="text-[13px] truncate whitespace-nowrap"
                style={{ color: isTyping ? "#25D366" : colors.textSecondary }}
              >
                {isTyping
                  ? "typing..."
                  : selectedConv.online
                    ? "online"
                    : "last seen today at 10:24 AM"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: colors.textSecondary }}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 relative z-10"
          style={{ backgroundColor: colors.bgChat }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: isDark
                ? "url('https://static.whatsapp.net/rsrc.php/v3/yO/r/1ZzOesQYntu.png')"
                : "url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r2qE66J-vDq.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "initial",
              backgroundPosition: "center",
              opacity: isDark ? 0.05 : 0.4,
            }}
          />

          {/* Scrollable Messages */}
          <div className="absolute inset-0 overflow-y-auto p-4 space-y-3 z-10">
            {messages.map((msg) => {
              if (msg.type === "date") {
                return (
                  <div
                    key={msg.id}
                    className="flex items-center justify-center mb-4 relative z-10"
                  >
                    <span
                      className="px-3 py-1 rounded-lg text-[12px] shadow-sm font-medium"
                      style={{
                        backgroundColor: isDark ? "#182229" : "#ffffff",
                        color: colors.textSecondary,
                      }}
                    >
                      {msg.text}
                    </span>
                  </div>
                )
              }
              if (msg.type === "in") {
                return (
                  <div
                    key={msg.id}
                    className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%] relative z-10"
                  >
                    <div
                      className="rounded-lg rounded-tl-none px-2 py-1.5 shadow-sm relative"
                      style={{ backgroundColor: colors.bgIn }}
                    >
                      {msg.id === messages.find((m) => m.type === "in")?.id && (
                        <div
                          className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-transparent"
                          style={{ borderTopColor: colors.bgIn }}
                        ></div>
                      )}
                      <span className="text-[#d81b60] text-[12.5px] font-medium block mb-0.5">
                        {selectedConv.name}
                      </span>

                      {msg.media && msg.media.type === "image" && (
                        <img
                          src={msg.media.url}
                          className="rounded-lg max-w-full max-h-[250px] object-cover mb-1"
                          alt="attachment"
                        />
                      )}
                      {msg.media && msg.media.type === "video" && (
                        <video
                          src={msg.media.url}
                          controls
                          className="rounded-lg max-w-full max-h-[250px] object-cover mb-1"
                        />
                      )}
                      {msg.media && msg.media.type === "audio" && (
                        <audio
                          src={msg.media.url}
                          controls
                          className="h-10 w-[240px] mb-1"
                        />
                      )}
                      {msg.media && msg.media.type === "document" && (
                        <div className="flex items-center gap-2 p-3 bg-black/5 dark:bg-white/5 rounded-lg mb-1 cursor-pointer">
                          <FileText size={24} className="text-[#00a884]" />
                          <span
                            className="text-[13px] font-medium truncate max-w-[150px]"
                            style={{ color: colors.textPrimary }}
                          >
                            {msg.media.name || "Document"}
                          </span>
                        </div>
                      )}

                      {msg.text && (
                        <p
                          className="text-[14.2px] leading-snug break-words inline-block pr-12"
                          style={{ color: colors.textPrimary }}
                        >
                          {msg.text}
                        </p>
                      )}
                      <span
                        className="text-[10px] float-right mt-1 -mr-0.5 relative top-1"
                        style={{ color: colors.textSecondary }}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={msg.id}
                  className="flex items-start justify-end gap-2 max-w-[85%] sm:max-w-[70%] ml-auto relative z-10"
                >
                  <div
                    className="rounded-lg rounded-tr-none px-2 py-1.5 shadow-sm relative"
                    style={{ backgroundColor: colors.bgOut }}
                  >
                    {msg.id ===
                      messages.filter((m) => m.type === "out").pop()?.id && (
                        <div
                          className="absolute top-0 -right-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-transparent"
                          style={{ borderTopColor: colors.bgOut }}
                        ></div>
                      )}

                    {msg.media && msg.media.type === "image" && (
                      <img
                        src={msg.media.url}
                        className="rounded-lg max-w-full max-h-[250px] object-cover mb-1"
                        alt="attachment"
                      />
                    )}
                    {msg.media && msg.media.type === "video" && (
                      <video
                        src={msg.media.url}
                        controls
                        className="rounded-lg max-w-full max-h-[250px] object-cover mb-1"
                      />
                    )}
                    {msg.media && msg.media.type === "audio" && (
                      <audio
                        src={msg.media.url}
                        controls
                        className="h-10 w-[240px] mb-1"
                      />
                    )}
                    {msg.media && msg.media.type === "document" && (
                      <div className="flex items-center gap-2 p-3 bg-black/5 dark:bg-white/5 rounded-lg mb-1 cursor-pointer">
                        <FileText size={24} className="text-[#00a884]" />
                        <span
                          className="text-[13px] font-medium truncate max-w-[150px]"
                          style={{ color: colors.textPrimary }}
                        >
                          {msg.media.name || "Document"}
                        </span>
                      </div>
                    )}

                    {msg.text && (
                      <p
                        className="text-[14.2px] leading-snug break-words inline-block pr-16 relative z-10"
                        style={{ color: colors.textPrimary }}
                      >
                        {msg.text}
                      </p>
                    )}

                    {msg.isTemplate && msg.templateButtons && (
                      <div className="mt-2 flex flex-col gap-1.5 border-t pt-2" style={{ borderColor: colors.border }}>
                        <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: colors.textSecondary }}>Interactive Template (Click to Simulate)</div>
                        <div className="flex gap-2">
                          {msg.templateButtons.map(btn => (
                            <button
                              key={btn}
                              onClick={() => simulateCustomerTemplateClick(btn)}
                              className="bg-white dark:bg-gray-800 border border-[#25d366] text-[#25d366] rounded-lg px-4 py-1.5 text-sm font-semibold hover:bg-[#25d366] hover:text-white transition-colors"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`${!msg.text
                          ? "float-right mt-1 ml-2"
                          : "float-right ml-2 mt-1"
                        } flex items-center gap-1 relative top-1 z-10`}
                    >
                      <span
                        className="text-[10px]"
                        style={{ color: colors.textSecondary }}
                      >
                        {msg.time}
                      </span>
                      {msg.status === "sending" && (
                        <Check
                          size={12}
                          style={{ color: colors.textSecondary }}
                        />
                      )}
                      {msg.status === "sent" && (
                        <Check
                          size={12}
                          style={{ color: colors.textSecondary }}
                        />
                      )}
                      {msg.status === "delivered" && (
                        <CheckCheck
                          size={13}
                          style={{ color: colors.textSecondary }}
                        />
                      )}
                      {msg.status === "read" && (
                        <CheckCheck size={13} className="text-[#53bdeb]" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 max-w-[70%]">
                <div
                  className="rounded-lg rounded-tl-none px-4 py-3 shadow-sm relative"
                  style={{ backgroundColor: colors.bgIn }}
                >
                  <div
                    className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-transparent"
                    style={{ borderTopColor: colors.bgIn }}
                  ></div>
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full inline-block"
                        style={{
                          backgroundColor: colors.textSecondary,
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
        </div>

        {/* Composer */}
        {/* Composer */}
        <div
          className="px-4 pt-3 flex items-end gap-3 z-10 relative"
          style={{
            paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
            backgroundColor: colors.bgComposer,
          }}
        >
          {/* Emoji picker */}
          {showEmoji && (
            <div
              ref={emojiRef}
              className="absolute bottom-[60px] left-3 mb-2 p-3 rounded-xl border shadow-xl grid grid-cols-6 gap-1.5 z-20 w-[240px]"
              style={{
                backgroundColor: colors.bgComposerInput,
                borderColor: colors.border,
              }}
            >
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  onClick={() => addEmoji(e)}
                  className="text-[20px] hover:scale-125 transition-transform leading-none p-1"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          {!isRecording && (
            <div
              className="flex items-center gap-3 transition-colors relative"
              style={{ color: colors.textSecondary }}
            >
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className="hover:text-[#00a884]"
              >
                <Smile
                  size={24}
                  className={showEmoji ? "text-[#00a884]" : ""}
                />
              </button>

              <div className="relative" ref={attachRef}>
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="hover:text-[#00a884] transition-colors"
                >
                  <Paperclip
                    size={24}
                    className={showAttachMenu ? "text-[#00a884]" : ""}
                  />
                </button>
                {showAttachMenu && (
                  <div
                    className="absolute bottom-12 left-0 mb-2 p-2 rounded-2xl shadow-xl flex flex-col gap-2 z-50 w-48 border"
                    style={{
                      backgroundColor: colors.bgChatPanel,
                      borderColor: colors.border,
                    }}
                  >
                    <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                      <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <FileText size={20} />
                      </span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        Document
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                      <span className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                        <ImageIcon size={20} />
                      </span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        Photos & Videos
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                      <span className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                        <Camera size={20} />
                      </span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        Camera
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <div
                      className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                      onClick={() => {
                        alert("Contact selection not mock-supported")
                        setShowAttachMenu(false)
                      }}
                    >
                      <span className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                        <UserSquare size={20} />
                      </span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        Contact
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                      onClick={() => {
                        alert("Location tracking not configured in UI demo")
                        setShowAttachMenu(false)
                      }}
                    >
                      <span className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <MapPin size={20} />
                      </span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        Location
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                      onClick={() => {
                        sendDemoTemplate();
                      }}
                    >
                      <span className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <CheckCheck size={20} />
                      </span>
                      <span className="text-[14px] font-medium" style={{ color: colors.textPrimary }}>
                        Send Template Router
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isRecording ? (
            <div
              className="flex-1 rounded-lg px-4 py-2 shadow-sm flex items-center justify-between"
              style={{ backgroundColor: colors.bgComposerInput }}
            >
              <button
                onClick={cancelRecording}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
              <div className="flex items-center gap-2 text-red-500 font-mono text-[14px] px-4 font-bold">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {formatRecTime(recordingTime)}
              </div>
              <button
                onClick={sendRecording}
                className="text-[#00a884] hover:text-[#00c298] transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          ) : (
            <div
              className="flex-1 rounded-lg px-4 py-2 border-none shadow-sm flex items-end"
              style={{ backgroundColor: colors.bgComposerInput }}
            >
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                rows={1}
                className="flex-1 bg-transparent text-[15px] outline-none resize-none max-h-[120px] pt-1 placeholder-gray-500"
                style={{ color: colors.textPrimary, minHeight: "26px" }}
              />
            </div>
          )}

          {!isRecording &&
            (message.trim() ? (
              <button
                onClick={sendMessage}
                className="p-1.5 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textSecondary }}
              >
                <Send size={24} />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="p-1.5 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textSecondary }}
              >
                <Mic size={24} />
              </button>
            ))}
        </div>

        {/* Media Preview Overlay */}
        {mediaPreview && (
          <div
            className="absolute inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: colors.bgChatPanel }}
          >
            <div
              className="border-b flex items-center px-4 gap-4 min-h-[60px]"
              style={{
                paddingTop: "env(safe-area-inset-top)",
                borderColor: colors.border,
                backgroundColor: colors.bgHeader,
              }}
            >
              <button
                onClick={() => setMediaPreview(null)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{ color: colors.textPrimary }}
              >
                <X size={24} />
              </button>
              <div
                className="text-[16px] font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Preview File
              </div>
            </div>

            <div
              className="flex-1 overflow-hidden p-8 flex items-center justify-center relative shadow-inner"
              style={{ backgroundColor: colors.bgApp }}
            >
              {mediaPreview.type === "document" ? (
                <div className="flex flex-col items-center justify-center p-12 bg-black/5 dark:bg-white/5 border rounded-2xl shadow-xl gap-4 border-[var(--border)]">
                  <FileText size={64} className="text-[#00a884]" />
                  <span
                    className="text-[16px] font-semibold text-center break-words max-w-[300px]"
                    style={{ color: colors.textPrimary }}
                  >
                    {mediaPreview.file.name}
                  </span>
                </div>
              ) : mediaPreview.type === "video" ? (
                <video
                  src={mediaPreview.url}
                  controls
                  className="max-w-full max-h-full rounded-[4px] shadow-2xl"
                />
              ) : (
                <img
                  src={mediaPreview.url}
                  className="max-w-full max-h-full object-contain rounded-[4px] shadow-2xl"
                />
              )}
            </div>

            <div
              className="p-4 flex items-center justify-center border-t shadow-2xl"
              style={{
                paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
                backgroundColor: colors.bgComposer,
                borderColor: colors.border,
              }}
            >
              <div className="max-w-[700px] w-full flex justify-end">
                <button
                  onClick={sendMediaPreview}
                  className="w-[50px] h-[50px] rounded-full bg-[#00a884] text-white flex flex-shrink-0 items-center justify-center hover:bg-[#00c298] transition-colors shadow-lg active:scale-95"
                >
                  <Send size={22} className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Customer info */}
      {showCustomerPanel && (
        <div
          className={`${mobileView === "profile"
              ? "flex absolute inset-y-0 right-0 z-30 shadow-2xl"
              : "hidden"
            } xl:flex xl:relative xl:shadow-none w-full md:w-[320px] flex-shrink-0 border-l flex-col overflow-y-auto cursor-default`}
          style={{
            backgroundColor: colors.bgChatPanel,
            borderColor: colors.border,
          }}
        >
          <div
            className="p-4 border-b flex items-center justify-between"
            style={{
              paddingTop: "max(env(safe-area-inset-top), 16px)",
              backgroundColor: colors.bgHeader,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileView("chat")}
                className="xl:hidden p-1.5 -ml-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: colors.textSecondary }}
              >
                <ArrowLeft size={16} />
              </button>
              <div
                className="font-display font-semibold text-[14px]"
                style={{ color: colors.textPrimary }}
              >
                Customer Info
              </div>
            </div>
            <button
              onClick={() => {
                setShowCustomerPanel(false)
                setMobileView("chat")
              }}
              className="p-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: colors.textSecondary }}
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="p-4 text-center border-b"
            style={{ borderColor: colors.border }}
          >
            <img
              src={selectedConv.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
            />
            <div
              className="font-semibold text-[15px]"
              style={{ color: colors.textPrimary }}
            >
              {selectedConv.name}
            </div>
            <div
              className="text-[13px] mt-0.5"
              style={{ color: colors.textSecondary }}
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
                  style={{ color: colors.textSecondary }}
                >
                  {label}
                </div>
                <div
                  className="text-[13px] font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {value}
                </div>
              </div>
            ))}

            <div>
              <div
                className="text-[11px] uppercase tracking-wider font-semibold mb-2"
                style={{ color: colors.textSecondary }}
              >
                Notes
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="w-full rounded-xl px-3 py-2 text-[12.5px] outline-none resize-none border transition-colors focus-within:shadow-sm"
                style={{
                  backgroundColor: colors.bgComposerInput,
                  color: colors.textPrimary,
                  borderColor: colors.border,
                }}
                rows={3}
              />
            </div>

            <div
              className="space-y-2 pb-4"
              style={{
                paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
              }}
            >
              <div className="relative group">
                <select
                  value={selectedConv.agent}
                  onChange={(e) => assignAgent(e.target.value)}
                  className="w-full py-2.5 rounded-xl bg-[#F0FDF4] text-[#25D366] text-[13px] font-bold hover:bg-[#DCFCE7] transition-colors outline-none text-center appearance-none cursor-pointer"
                >
                  <optgroup label="Categories">
                    <option value="Sales Team">Assign to Sales Team</option>
                    <option value="Marketing Dept">Assign to Marketing</option>
                  </optgroup>
                  <optgroup label="Specific Agents">
                    <option value="Rahul K.">Rahul K.</option>
                    <option value="Arjun S.">Arjun S.</option>
                    <option value="Sneha P.">Sneha P.</option>
                  </optgroup>
                  <option value="Unassigned">Mark Unassigned</option>
                </select>
              </div>

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

      {/* New Chat Modal Overlays */}
      <AnimatePresence>
        {showNewChatModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewChatModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    Start New Chat
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                    Enter a phone number to begin
                  </p>
                </div>
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setShowNewChatModal(false)
                    alert("A new chat has been created! (Demo)")
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Phone size={16} className="text-[var(--text-muted)]" />
                      Phone Number
                    </label>
                    <div className="flex bg-[var(--bg-input)] border border-[var(--border)] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#25D366]">
                      <span className="flex items-center justify-center pl-4 pr-3 text-[var(--text-muted)] font-medium text-sm border-r border-[var(--border)]">
                        +91
                      </span>
                      <input
                        type="text"
                        placeholder="98765 43210"
                        required
                        className="flex-1 bg-transparent border-none p-3.5 text-[var(--text-primary)] text-sm outline-none font-medium"
                      />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1 ml-1">
                      Make sure you include the full number.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Send size={16} className="text-[var(--text-muted)]" />
                      Initial Message
                    </label>
                    <textarea
                      placeholder="Say hello..."
                      className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-2xl p-4 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[#25D366] resize-none h-24 font-medium"
                    ></textarea>
                  </div>
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNewChatModal(false)}
                      className="flex-1 py-3.5 bg-[var(--bg-hover)] text-[var(--text-primary)] font-bold text-[14px] rounded-xl hover:bg-[var(--border)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-[#25D366] text-white font-bold text-[14px] rounded-xl hover:bg-[#20bd5a] shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Open Chat
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}
