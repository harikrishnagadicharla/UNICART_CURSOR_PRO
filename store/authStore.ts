import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuth: () => void;
}

// Default admin credentials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin@123";

// Storage keys
const USERS_STORAGE_KEY = "unicart_users";
const CURRENT_USER_KEY = "unicart_current_user";

// Initialize admin user if not exists
const initializeAdmin = () => {
  if (typeof window === "undefined") return;
  
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];
  
  const adminExists = users.some((u: any) => u.email === ADMIN_EMAIL);
  
  if (!adminExists) {
    const adminUser = {
      id: "admin-001",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      firstName: "Admin",
      lastName: "User",
      role: "admin" as const,
      emailVerified: true,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        try {
          // Get users from localStorage
          const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
          const users = usersJson ? JSON.parse(usersJson) : [];
          
          // Find user
          const user = users.find(
            (u: any) => u.email === email && u.password === password
          );
          
          if (!user) {
            return { success: false, message: "Invalid email or password" };
          }
          
          // Create user object without password
          const { password: _, ...userWithoutPassword } = user;
          
          // Store current user
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
          
          // Update state
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true 
          });
          
          return { success: true, message: "Login successful" };
        } catch (error) {
          return { success: false, message: "Login failed" };
        }
      },

      register: async (data) => {
        try {
          const { email, password, firstName, lastName } = data;
          
          // Prevent admin re-registration
          if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            return { 
              success: false, 
              message: "This email is reserved. Please use a different email address." 
            };
          }
          
          // Get existing users
          const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
          const users = usersJson ? JSON.parse(usersJson) : [];
          
          // Check if user already exists
          const userExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
          
          if (userExists) {
            return { success: false, message: "An account with this email already exists" };
          }
          
          // Create new user
          const newUser = {
            id: `user-${Date.now()}`,
            email,
            password,
            firstName: firstName || "",
            lastName: lastName || "",
            role: "customer" as const,
            emailVerified: false,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          
          users.push(newUser);
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
          
          // Auto-login after registration
          const { password: _, ...userWithoutPassword } = newUser;
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
          
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true 
          });
          
          return { success: true, message: "Registration successful" };
        } catch (error) {
          return { success: false, message: "Registration failed" };
        }
      },

      logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        if (typeof window === "undefined") return;
        
        initializeAdmin();
        
        const currentUserJson = localStorage.getItem(CURRENT_USER_KEY);
        if (currentUserJson) {
          const user = JSON.parse(currentUserJson);
          set({ user, isAuthenticated: true });
        }
      },
    }),
    {
      name: "unicart_auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

