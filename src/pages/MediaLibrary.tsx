import { useState, useRef, useEffect } from "react"
import API_BASE from "../lib/api"
import {
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Image,
  Film,
  FileText,
  Music,
  MoreHorizontal,
  Download,
  Trash2,
  Copy,
  Eye,
  X,
  HardDrive,
  Plus,
  CheckCircle,
} from "lucide-react"

interface MediaItem {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  author: string;
  url: string | null;
}

const typeFilters = ["All", "Images", "Videos", "Documents", "Audio"]
const typeIcons: Record<string, typeof Image> = {
  image: Image,
  video: Film,
  document: FileText,
  audio: Music,
}
const typeColors: Record<string, string> = {
  image: "#3B82F6",
  video: "#8B5CF6",
  document: "#F59E0B",
  audio: "#EC4899",
}

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selected, setSelected] = useState<number[]>([])
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<MediaItem | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch(" + API_BASE + "/api/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("media_file", files[i]);

      try {
        const res = await fetch(" + API_BASE + "/api/media/upload", {
          method: "POST",
          body: formData
        });
        if (res.ok) {
          await fetchMedia(); // Re-fetch to get newest files with presigned URLs
        }
      } catch (err) {
        console.error("Failed to upload", err);
      }
    }
    setUploading(false);

    // Clear input
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this media file?")) {
      try {
        const res = await fetch(`${API_BASE}/api/media/${id}`, { method: "DELETE" });
        if (res.ok) {
          setMediaList(prev => prev.filter(m => m.id !== id));
          setSelected(prev => prev.filter(s => s !== id));
          if (preview?.id === id) setPreview(null);
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const filtered = mediaList.filter((m) => {
    const matchType =
      filter === "All" ||
      (filter === "Images" && m.type === "image") ||
      (filter === "Videos" && m.type === "video") ||
      (filter === "Documents" && m.type === "document") ||
      (filter === "Audio" && m.type === "audio")
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const toggleSelect = (id: number) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    )
  }

  const usedGB = 7.4
  const totalGB = 20

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="font-display font-bold text-[22px]"
            style={{ color: "var(--text-primary)" }}
          >
            Media Library
          </h1>
          <p
            className="text-[13.5px] mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your images, videos, documents and audio files
          </p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={`flex items-center gap-2 px-4 py-2 ${uploading ? "bg-gray-400" : "bg-[#25D366] hover:bg-[#22C55E]"} text-white rounded-xl text-[13px] font-semibold transition-colors`}
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          {uploading ? "Uploading..." : "Upload Media"}
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf"
          onChange={handleFileUpload}
        />
      </div>

      {/* Storage bar */}
      <div
        className="rounded-2xl border p-4 mb-5 flex items-center gap-4"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg-active)" }}
        >
          <HardDrive size={18} className="text-[#25D366]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Storage Used
            </span>
            <span
              className="text-[12.5px] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {usedGB} GB{" "}
              <span
                className="font-normal"
                style={{ color: "var(--text-secondary)" }}
              >
                / {totalGB} GB
              </span>
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "var(--bg-input)" }}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#25D366] to-[#22C55E] transition-all duration-700"
              style={{ width: `${(usedGB / totalGB) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
          {((usedGB / totalGB) * 100).toFixed(0)}% used
        </div>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div
          className="flex items-center gap-2 rounded-xl border px-3 h-10 flex-1 max-w-[360px]"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <Search size={15} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="flex-1 bg-transparent text-[13px] placeholder-[#94A3B8] outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-1.5 flex-1 overflow-x-auto">
          {typeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-2 rounded-xl text-[12.5px] font-medium whitespace-nowrap border transition-colors"
              style={{
                background:
                  filter === f ? "var(--bg-active)" : "var(--bg-card)",
                color: filter === f ? "#25D366" : "var(--text-secondary)",
                borderColor: filter === f ? "#25D366" : "var(--border)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div
          className="flex items-center gap-1 rounded-xl border p-1"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-[#F0FDF4] text-[#25D366]" : ""
              }`}
            style={view !== "grid" ? { color: "var(--text-muted)" } : {}}
          >
            <Grid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-[#F0FDF4] text-[#25D366]" : ""
              }`}
            style={view !== "list" ? { color: "var(--text-muted)" } : {}}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
        }}
        className={`mb-5 border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer
          ${dragging ? "border-[#25D366]" : "hover:border-[#25D366]/40"}`}
        style={{
          borderColor: dragging ? "#25D366" : undefined,
          background: dragging ? "var(--bg-active)" : "var(--bg-card)",
        }}
        onClick={() => fileRef.current?.click()}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
          style={{ background: "var(--bg-active)" }}
        >
          <Plus size={18} className="text-[#25D366]" />
        </div>
        <div
          className="text-[13.5px] font-semibold mb-0.5"
          style={{ color: "var(--text-primary)" }}
        >
          Drop files here or click to upload
        </div>
        <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>
          Supports: JPG, PNG, MP4, PDF, MP3 · Max 50MB per file
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((item) => {
            const Icon = typeIcons[item.type]
            const color = typeColors[item.type]
            const isSelected = selected.includes(item.id)
            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-150
                  ${isSelected
                    ? "border-[#25D366] shadow-md shadow-[#25D366]/15"
                    : "hover:border-[#25D366]/40 hover:shadow-md hover:shadow-black/5"
                  }`}
                style={{
                  background: "var(--bg-card)",
                  borderColor: isSelected ? "#25D366" : "var(--border)",
                }}
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ background: "var(--bg-input)" }}
                >
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={32} style={{ color }} />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#25D366]/20 flex items-center justify-center">
                      <CheckCircle size={24} className="text-[#25D366]" />
                    </div>
                  )}
                  {/* Hover actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreview(item)
                      }}
                      className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:text-[#25D366]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Eye size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:text-red-500 shadow-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-2.5">
                  <div
                    className="text-[12px] font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className="text-[10.5px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.size}
                    </span>
                    <span
                      className="text-[10.5px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                {["File", "Type", "Size", "Uploaded", "By", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11.5px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const Icon = typeIcons[item.type]
                const color = typeColors[item.type]
                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-[var(--bg-hover)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          {item.url ? (
                            <img
                              src={item.url}
                              alt=""
                              className="w-9 h-9 rounded-xl object-cover"
                            />
                          ) : (
                            <Icon size={16} style={{ color }} />
                          )}
                        </div>
                        <span
                          className="text-[13px] font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-lg text-[11px] font-medium capitalize"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-[12.5px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.size}
                    </td>
                    <td
                      className="px-4 py-3 text-[12.5px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.date}
                    </td>
                    <td
                      className="px-4 py-3 text-[12.5px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.author}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg hover:bg-[#F0FDF4] hover:text-[#25D366] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Download size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setPreview(null)}
        >
          <div
            className="rounded-2xl overflow-hidden max-w-[700px] w-full shadow-2xl"
            style={{ background: "var(--bg-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="font-medium text-[14px]"
                style={{ color: "var(--text-primary)" }}
              >
                {preview.name}
              </div>
              <button
                onClick={() => setPreview(null)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={15} />
              </button>
            </div>
            {preview.url && (
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full max-h-[480px] object-contain"
                style={{ background: "var(--bg-input)" }}
              />
            )}
            <div
              className="px-5 py-3 flex items-center justify-between border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="text-[12.5px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {preview.size} · {preview.date} · {preview.author}
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12.5px] font-semibold hover:bg-[#DCFCE7] transition-colors text-[#25D366]"
                style={{ background: "var(--bg-active)" }}
              >
                <Download size={13} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





