import type { Order } from "./order";
import type { Address } from "./order";

// ─────────────────────────────────────────────────────────────
// User Role
// ─────────────────────────────────────────────────────────────

export type UserRole = "CUSTOMER" | "ADMIN" | "STAFF" | "GUEST";

// ─────────────────────────────────────────────────────────────
// User
// ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;

  // ─── Relations ────────────────────────────────────────────
  orders?: Order[];
  addresses?: Address[];
  wishlist?: string[];           // product ids

  // ─── Preferences ──────────────────────────────────────────
  currency?: string;
  newsletter?: boolean;
  marketingConsent?: boolean;

  // ─── Dates ────────────────────────────────────────────────
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;

  // ─── Auth ─────────────────────────────────────────────────
  emailVerified?: boolean;
  provider?: "credentials" | "google" | "facebook";
}

// ─────────────────────────────────────────────────────────────
// Auth Session (NextAuth)
// ─────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

// ─────────────────────────────────────────────────────────────
// Sign-in / Sign-up forms
// ─────────────────────────────────────────────────────────────

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter?: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

// ─────────────────────────────────────────────────────────────
// Profile update
// ─────────────────────────────────────────────────────────────

export interface UpdateProfileFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  currency?: string;
  newsletter?: boolean;
}

export interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}