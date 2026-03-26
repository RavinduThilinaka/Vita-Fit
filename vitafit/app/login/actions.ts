// app/actions.ts

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number | null;
  gender: string | null;
  role: "user" | "admin" | "trainer";
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Login action
export async function login(credentials: LoginCredentials): Promise<{ 
  success: boolean; 
  error?: string; 
  user?: User;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      if (typeof data === "string") {
        return { success: false, error: data };
      }
      if (data.error) {
        return { success: false, error: data.error };
      }
      if (data.non_field_errors) {
        return { success: false, error: data.non_field_errors[0] };
      }
      return { success: false, error: "Invalid email or password. Please try again." };
    }

    // Store the token in cookies
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return { 
      success: true, 
      user: data.user,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
}

// Register action
export async function register(userData: any): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.email) {
        return { success: false, error: data.email[0] };
      }
      if (data.password) {
        return { success: false, error: data.password[0] };
      }
      if (data.non_field_errors) {
        return { success: false, error: data.non_field_errors[0] };
      }
      return { success: false, error: "Registration failed. Please try again." };
    }

    // Auto-login after registration
    const loginResult = await login({
      email: userData.email,
      password: userData.password,
    });

    return loginResult;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
}

// Logout action
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  
  // Call logout endpoint if your backend has one
  const token = cookieStore.get("auth_token")?.value;
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout API error:", error);
    }
  }

  // Clear cookies
  cookieStore.delete("auth_token");
  cookieStore.delete("user");
  
  redirect("/login");
}

// Get current user (server-side)
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  
  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

// Get auth token (server-side)
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}

// Check if user is authenticated (server-side)
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("auth_token");
}