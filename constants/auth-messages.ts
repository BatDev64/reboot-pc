import { AuthErrorCode } from "@/types/auth"

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  [AuthErrorCode.UNAUTHENTICATED]: "You must log in to access this section.",

  [AuthErrorCode.USER_INACTIVE]:
    "Your account is disabled. Contact the administrator.",

  [AuthErrorCode.FORBIDDEN_ROLE]:
    "You don't have permission to access this section.",

  [AuthErrorCode.USER_NOT_FOUND]: "User account not found.",

  [AuthErrorCode.AUTH_PROVIDER_ERROR]:
    "Authentication error. Please try again.",

  [AuthErrorCode.INVALID_CREDENTIALS]: "Invalid email or password.",

  [AuthErrorCode.LOGIN_SUCCESS]: "Sign-in successful.",

  [AuthErrorCode.VALIDATION_FAILED]: "Invalid form input.",
}
