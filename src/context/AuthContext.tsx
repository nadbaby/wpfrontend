import API_BASE from "../lib/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  category?: string;
  features?: string[];
  company?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithOtp: (phone: string, otp: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    pass: string,
    company: string
  ) => Promise<boolean>;
  adminCreateUser: (
    name: string,
    email: string,
    pass: string,
    category: string,
    features: string[],
    role?: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // --------------------------------------------------
  // LOAD SAVED USER
  // --------------------------------------------------

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("whatsapi_user");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }

    return null;
  });

  const isAuthenticated = !!user;

  // --------------------------------------------------
  // SAVE USER TO LOCAL STORAGE
  // --------------------------------------------------

  useEffect(() => {
    if (user) {
      localStorage.setItem("whatsapi_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("whatsapi_user");
    }
  }, [user]);

  // --------------------------------------------------
  // LOGIN
  // Better Auth
  // POST /api/auth/sign-in/email
  // --------------------------------------------------

  const login = async (
    email: string,
    pass: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `${API_BASE}/api/auth/sign-in/email`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // IMPORTANT:
          // Better Auth uses cookies for sessions.
          credentials: "include",

          body: JSON.stringify({
            email: email.trim(),
            password: pass,
            rememberMe: true,
          }),
        }
      );

      // Safely read response
      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      console.log("Better Auth login response:", data);

      // Login failed
      if (!res.ok) {
        throw new Error(
          data?.message ||
            data?.error?.message ||
            "Invalid email or password"
        );
      }

      // --------------------------------------------------
      // GET AGENT PROFILE
      // --------------------------------------------------

      let category: string | undefined = undefined;
      let features: string[] = [];
      let isAgent = false;

      try {
        const profileRes = await fetch(
          `${API_BASE}/api/agents/me?email=${encodeURIComponent(
            email.trim()
          )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();

          console.log(
            "Agent profile response:",
            profileData
          );

          if (profileData?.data?.profile) {
            category =
              profileData.data.profile.category;

            features =
              profileData.data.profile.features || [];

            isAgent = true;
          }
        }
      } catch (error) {
        console.warn(
          "Could not load agent profile:",
          error
        );
      }

      // --------------------------------------------------
      // CREATE FRONTEND USER OBJECT
      // --------------------------------------------------

      const loggedUser: User = {
        id: String(
          data?.user?.id ||
            "usr_" +
              Math.random()
                .toString(36)
                .substring(2, 8)
        ),

        name:
          data?.user?.name ||
          email.split("@")[0],

        email:
          data?.user?.email ||
          email,

        avatar:
          data?.user?.image ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            email
          )}`,

        role: isAgent
          ? "agent"
          : "Administrator",

        category,
        features,

        company: "WhatsApi Enterprise",

        phone: "",
      };

      // Save logged-in user
      setUser(loggedUser);

      return true;
    } catch (error: any) {
      console.error("Login error:", error);

      throw new Error(
        error?.message ||
          "Unable to login. Please try again."
      );
    }
  };

  // --------------------------------------------------
  // LOGIN WITH OTP
  // --------------------------------------------------

  const loginWithOtp = async (
    phone: string,
    otp: string
  ): Promise<boolean> => {
    // Currently simulated.
    // Replace this later with your real OTP API.

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    const loggedUser: User = {
      id:
        "usr_" +
        Math.random()
          .toString(36)
          .substring(2, 8),

      name: "Verified WhatsApp User",

      email: "user@whatsapi.io",

      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",

      role: "Business Manager",

      company: "WhatsApp Verified Suite",

      phone,
    };

    setUser(loggedUser);

    return true;
  };

  // --------------------------------------------------
  // SIGNUP
  // --------------------------------------------------

  const signup = async (
    name: string,
    email: string,
    pass: string,
    company: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `${API_BASE}/api/auth/sign-up/email`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: pass,
          }),
        }
      );

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      console.log("Better Auth signup response:", data);

      if (!res.ok) {
        throw new Error(
          data?.message ||
            data?.error?.message ||
            "Unable to create account"
        );
      }

      // Better Auth may return the user after signup.
      const createdUser = data?.user;

      const newUser: User = {
        id: String(
          createdUser?.id ||
            "usr_" +
              Math.random()
                .toString(36)
                .substring(2, 8)
        ),

        name:
          createdUser?.name ||
          name,

        email:
          createdUser?.email ||
          email,

        avatar:
          createdUser?.image ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            email
          )}`,

        role: "Administrator",

        company:
          company || "WhatsApi Enterprise",

        phone: "",
      };

      setUser(newUser);

      return true;
    } catch (error: any) {
      console.error("Signup error:", error);

      throw new Error(
        error?.message ||
          "Unable to create account."
      );
    }
  };

  // --------------------------------------------------
  // ADMIN CREATE AGENT
  // --------------------------------------------------

  const adminCreateUser = async (
    name: string,
    email: string,
    pass: string,
    category: string,
    features: string[],
    role: string = "agent"
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE}/api/agents/provision`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // IMPORTANT:
          // Better Auth uses session cookies.
          // Do NOT send authToken anymore.
          credentials: "include",

          body: JSON.stringify({
            name,
            email,
            password: pass,
            category,
            features,
            role,
          }),
        }
      );

      let data: any = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error?.message ||
            "Failed creating agent."
        );
      }

      console.log(
        "Agent created successfully:",
        data
      );

      return true;
    } catch (error: any) {
      console.error(
        "Admin create user error:",
        error
      );

      throw new Error(
        error?.message ||
          "Failed creating agent."
      );
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // Better Auth
  // POST /api/auth/sign-out
  // --------------------------------------------------

  const logout = () => {
    // Tell Better Auth to destroy the server session.
    fetch(`${API_BASE}/api/auth/sign-out`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    }).catch((error) => {
      console.warn(
        "Better Auth logout request failed:",
        error
      );
    });

    // Clear frontend state
    setUser(null);

    localStorage.removeItem("whatsapi_user");

    // Remove this if it exists from an older version.
    localStorage.removeItem("authToken");
  };

  // --------------------------------------------------
  // UPDATE PROFILE
  // --------------------------------------------------

  const updateProfile = (
    data: Partial<User>
  ) => {
    if (user) {
      setUser({
        ...user,
        ...data,
      });
    }
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

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
  );
}

// --------------------------------------------------
// USE AUTH HOOK
// --------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}