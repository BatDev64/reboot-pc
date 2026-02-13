// lib/auth/guards/require-dashboard-user.ts

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { logAuthEvent } from "@/lib/logger/server-auth-logger"
import { AuthErrorCode, type AuthResult, UserProfile } from "@/types/auth"
import { redirect } from "next/navigation"

interface GuardRequirements {
  requireActive?: boolean
  allowedRoles?: UserProfile["role"][]
}

interface GuardProfileArgs {
  result: AuthResult
  requirements: GuardRequirements
}

export function guardProfile({ result, requirements }: GuardProfileArgs) {
  if (!result.ok) {
    logAuthEvent({
      level: "warn",
      code: result.error,
      context: {
        route: PROTECTED_ROUTES.DASHBOARD,
      },
    })
    redirect(PUBLIC_ROUTES.LOGIN)
  }

  const profile = result.profile

  if (requirements.requireActive && !profile.isActive) {
    logAuthEvent({
      level: "warn",
      code: AuthErrorCode.USER_INACTIVE,
      context: {
        userId: profile.id,
        route: PROTECTED_ROUTES.DASHBOARD,
      },
    })
    redirect(PROTECTED_ROUTES.DISABLED)
  }

  if (
    requirements.allowedRoles?.length &&
    !requirements.allowedRoles.includes(profile.role)
  ) {
    logAuthEvent({
      level: "warn",
      code: AuthErrorCode.FORBIDDEN_ROLE,
      context: {
        userId: profile.id,
        details: {
          route: PROTECTED_ROUTES.DASHBOARD,
          role: profile.role,
          allowedRoles: requirements.allowedRoles,
        },
      },
    })
    redirect(PROTECTED_ROUTES.FORBIDDEN)
  }
}
