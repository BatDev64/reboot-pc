// types/auth.ts

import { USER_ROLES } from "@/constants/roles"

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export interface Session {
  userId: string
  email: string
}

export interface UserProfile {
  id: string
  role: UserRole
  email: string
  isActive: boolean
}

export enum AuthErrorCode {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  USER_INACTIVE = "USER_INACTIVE",
  FORBIDDEN_ROLE = "FORBIDDEN_ROLE",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  AUTH_PROVIDER_ERROR = "AUTH_PROVIDER_ERROR",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}

export type AuthResult =
  | { ok: true; profile: UserProfile }
  | { ok: false; error: AuthErrorCode }
