import { LoginSchema } from "@/schemas/auth"
import { createClient } from "../supabase/server"
import { AuthError } from "../errors/errors"
import { AuthErrorCode } from "@/types/auth"
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages"

export async function login({ email, password }: LoginSchema) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new AuthError(
      AuthErrorCode.INVALID_CREDENTIALS,
      AUTH_ERROR_MESSAGES[AuthErrorCode.INVALID_CREDENTIALS],
      error,
    )
  }

  if (!data.user) {
    throw new AuthError(
      AuthErrorCode.USER_NOT_FOUND,
      AUTH_ERROR_MESSAGES[AuthErrorCode.USER_NOT_FOUND],
    )
  }

  return data.user
}
