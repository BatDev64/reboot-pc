export const PROTECTED_ROUTES = {
  DASHBOARD: "/",
  PROFILE: "/profile",
  ADMIN: "/admin",
  DISABLED: "/account-disabled",
  FORBIDDEN: "/forbidden",
} as const

export const PUBLIC_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
} as const
