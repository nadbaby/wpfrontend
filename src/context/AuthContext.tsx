import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  company?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pass: string) => Promise<boolean>
  loginWithOtp: (phone: string, otp: string) => Promise<boolean>
  signup: (name: string, email: string, pass: string, company: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const DEFAULT_USER: User = {
  id: "usr_101",
  name: "Arjun Sharma",
  email: "arjun@whatsapi.io",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format",
  role: "Administrator",
  company: "WhatsApi Enterprise",
  phone: "+91 98765 43210",
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("whatsapi_user")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_USER
      }
    }
    // Default to logged in for smooth demo experience, but can log out anytime
    return DEFAULT_USER
  })

  const isAuthenticated = !!user

  useEffect(() => {
    if (user) {
      localStorage.setItem("whatsapi_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("whatsapi_user")
    }
  }, [user])

  const login = async (email: string): Promise<boolean> => {
    // Simulate API network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    const loggedUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 6),
      name: email.includes("agent") ? "Priya Verma" : "Arjun Sharma",
      email: email,
      avatar: email.includes("agent")
        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format"
        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format",
      role: email.includes("agent") ? "Support Lead" : "Administrator",
      company: "WhatsApi Enterprise",
      phone: "+91 98765 43210",
    }
    setUser(loggedUser)
    return true
  }

  const loginWithOtp = async (phone: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const loggedUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 6),
      name: "Verified WhatsApp User",
      email: "user@whatsapi.io",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
      role: "Business Manager",
      company: "WhatsApp Verified Suite",
      phone: phone,
    }
    setUser(loggedUser)
    return true
  }

  const signup = async (
    name: string,
    email: string,
    _pass: string,
    company: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 6),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      role: "Owner / Admin",
      company: company || "New Organization",
    }
    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("whatsapi_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithOtp,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
