// lib/auth/guards/require-dashboard-user.ts

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { type AuthResult, UserProfile } from "@/types/auth"
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
    redirect(PUBLIC_ROUTES.LOGIN)
  }

  const profile = result.profile

  if (requirements.requireActive && !profile.isActive) {
    redirect(PROTECTED_ROUTES.DISABLED)
  }

  if (
    requirements.allowedRoles?.length &&
    !requirements.allowedRoles.includes(profile.role)
  ) {
    redirect(PROTECTED_ROUTES.FORBIDDEN)
  }
}
