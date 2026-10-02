import API_BASE from "../lib/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL, // points to our Express backend
  plugins: [
    adminClient()
  ]
});

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  category?: string
  features?: string[]
  company?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pass: string) => Promise<boolean>
  loginWithOtp: (phone: string, otp: string) => Promise<boolean>
  signup: (
    name: string,
    email: string,
    pass: string,
    company: string,
  ) => Promise<boolean>
  adminCreateUser: (name: string, email: string, pass: string, category: string, features: string[], role?: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const DEFAULT_USER: User = {
  id: "usr_101",
  name: "Arjun Sharma",
  email: "arjun@whatsapi.io",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format",
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
        return null
      }
    }
    // Default to NOT logged in to enforce login page
    return null
  })

  const isAuthenticated = !!user

  useEffect(() => {
    if (user) {
      localStorage.setItem("whatsapi_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("whatsapi_user")
    }
  }, [user])

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signIn.email({ email, password: pass });

      if (error) {
        throw new Error(error?.message || "Invalid email or password")
      }

      // Fetch the custom category and features for this agent from our Express database
      let category = undefined;
      let features: string[] = [];
      let isAgent = false;

      try {
        const profileRes = await fetch(`${API_BASE}/api/agents/me?email=${encodeURIComponent(email)}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.data?.profile) {
            category = profileData.data.profile.category;
            features = profileData.data.profile.features;
            isAgent = true; // They exist in agent collection
          }
        }
      } catch (err) {
        console.warn("Could not fetch detailed agent profile", err);
      }

      const loggedUser: User = {
        id: data?.user?.id || "usr_" + Math.random().toString(36).substr(2, 6),
        name: data?.user?.name || email.split("@")[0],
        email: email,
        avatar: data?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        role: isAgent ? "agent" : "Administrator",
        category,
        features,
        company: "WhatsApi Enterprise",
        phone: "+91 98765 43210",
      }
      setUser(loggedUser)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const loginWithOtp = async (phone: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const loggedUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 6),
      name: "Verified WhatsApp User",
      email: "user@whatsapi.io",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
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
    pass: string,
    company: string,
  ): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signUp.email({ name, email, password: pass });

      if (error) {
        throw new Error(error?.message || "Signup failed. User may already exist.")
      }

      const newUser: User = {
        id: data?.user?.id || "usr_" + Math.random().toString(36).substr(2, 6),
        name,
        email,
        avatar: data?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        role: "Owner / Admin",
        company: company || "New Organization",
      }
      setUser(newUser)
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    }
  }

  const adminCreateUser = async (
    name: string,
    email: string,
    pass: string,
    category: string,
    features: string[],
    role: string = "agent"
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/api/agents/provision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}` // If standard JWT is used
        },
        body: JSON.stringify({ name, email, password: pass, category, features, role }),
      });

      if (!response.ok) {
        let errMsg = "Failed creating agent.";
        try {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } catch (e) {
          errMsg = await response.text() || errMsg;
        }
        throw new Error(errMsg);
      }

      return true;
    } catch (error) {
      console.error("Agent user creation failed:", error);
      throw error;
    }
  }

  const logout = async () => {
    await authClient.signOut();
    setUser(null)
    localStorage.removeItem("whatsapi_user")
    localStorage.removeItem("authToken")
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
        adminCreateUser,
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





