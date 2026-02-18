import { AuthErrorCode, type AuthResult } from "@/types/auth"
import { type UserProfile } from "@/types/auth"
import { type Database } from "@/types/database.types"
import { type SupabaseClient } from "@supabase/supabase-js"
import { logAuthEvent } from "../logger/server-auth-logger"

interface GetUserProfileArgs {
  supabaseClient: SupabaseClient<Database>
}

export async function getUserProfile({
  supabaseClient,
}: GetUserProfileArgs): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.getUser()

  if (error) {
    if (error.name === "AuthSessionMissingError") {
      return { ok: false, error: AuthErrorCode.UNAUTHENTICATED }
    }

    logAuthEvent({
      level: "error",
      code: AuthErrorCode.AUTH_PROVIDER_ERROR,
      context: {
        details: {
          providerMessage: error.message,
        },
      },
    })

    return { ok: false, error: AuthErrorCode.AUTH_PROVIDER_ERROR }
  }

  if (!data?.user) {
    return { ok: false, error: AuthErrorCode.UNAUTHENTICATED }
  }

  const { id: userId, email } = data.user

  if (!userId || !email) {
    logAuthEvent({
      level: "error",
      code: AuthErrorCode.AUTH_PROVIDER_ERROR,
      context: {
        details: {
          reason: "Provider returned user without id or email",
          receivedUserId: userId ?? null,
          receivedEmail: email ?? null,
        },
      },
    })

    return { ok: false, error: AuthErrorCode.AUTH_PROVIDER_ERROR }
  }

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, is_active, role")
    .eq("id", userId)
    .single()

  if (profileError || !profile) {
    logAuthEvent({
      level: "error",
      code: AuthErrorCode.USER_NOT_FOUND,
      context: {
        userId,
        details: {
          dbError: profileError?.message ?? null,
        },
      },
    })

    return { ok: false, error: AuthErrorCode.USER_NOT_FOUND }
  }

  return {
    ok: true,
    profile: {
      id: profile.id,
      email,
      isActive: profile.is_active,
      role: profile.role as UserProfile["role"],
    },
  }
}
