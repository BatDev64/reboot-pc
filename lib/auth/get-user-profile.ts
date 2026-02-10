import { AuthErrorCode, type AuthResult } from "@/types/auth"
import { type UserProfile } from "@/types/auth"
import { type Database } from "@/types/database.types"
import { type SupabaseClient } from "@supabase/supabase-js"

interface GetUserProfileArgs {
  supabaseClient: SupabaseClient<Database>
}

export async function getUserProfile({
  supabaseClient,
}: GetUserProfileArgs): Promise<AuthResult> {
  const { data, error } = await supabaseClient.auth.getUser()

  if (error) {
    return { ok: false, error: AuthErrorCode.AUTH_PROVIDER_ERROR }
  }

  if (!data?.user?.id || !data.user.email) {
    return { ok: false, error: AuthErrorCode.UNAUTHENTICATED }
  }

  const userId = data.user.id

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, is_active, role")
    .eq("id", userId)
    .single()

  if (profileError || !profile) {
    return { ok: false, error: AuthErrorCode.PROFILE_NOT_FOUND }
  }

  return {
    ok: true,
    profile: {
      id: profile.id,
      email: data.user.email,
      isActive: profile.is_active,
      role: profile.role as UserProfile["role"],
    },
  }
}
