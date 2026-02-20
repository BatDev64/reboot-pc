"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logAuthEvent } from "@/lib/loggers/loggers"
import { loginSchema, type LoginSchema } from "@/schemas/auth"
import { AuthErrorCode } from "@/types/auth"
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages"
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { validateForm } from "@/lib/utils/validate-form"

interface PrevState {
  message: string | null
  errors: Partial<Record<keyof LoginSchema, string[] | undefined>>
}

export async function loginAction(
  prevState: PrevState | null,
  formData: FormData,
): Promise<PrevState> {
  const result = validateForm({ formData, schema: loginSchema })

  if (!result.success) {
    logAuthEvent({
      level: "warn",
      code: AuthErrorCode.VALIDATION_FAILED,
      context: {
        details: {
          errors: result.errors,
        },
      },
    })

    return {
      message: AUTH_ERROR_MESSAGES[AuthErrorCode.VALIDATION_FAILED],
      errors: result.errors,
    }
  }

  const { email, password } = result.data

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      logAuthEvent({
        level: "warn",
        code: AuthErrorCode.INVALID_CREDENTIALS,
        context: { details: { email, error: error.message } },
      })

      return {
        message: AUTH_ERROR_MESSAGES[AuthErrorCode.INVALID_CREDENTIALS],
        errors: {},
      }
    }

    if (!data.user) {
      logAuthEvent({
        level: "error",
        code: AuthErrorCode.USER_NOT_FOUND,
        context: { details: { email } },
      })

      return {
        message: AUTH_ERROR_MESSAGES[AuthErrorCode.USER_NOT_FOUND],
        errors: {},
      }
    }
  } catch (err) {
    logAuthEvent({
      level: "error",
      code: AuthErrorCode.AUTH_PROVIDER_ERROR,
      context: { details: { error: err } },
    })

    return {
      message: AUTH_ERROR_MESSAGES[AuthErrorCode.AUTH_PROVIDER_ERROR],
      errors: {},
    }
  }

  redirect(PROTECTED_ROUTES.DASHBOARD)
}

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (error) {
    logAuthEvent({
      level: "error",
      code: AuthErrorCode.AUTH_PROVIDER_ERROR,
      context: { details: { error } },
    })
  } finally {
    redirect(PUBLIC_ROUTES.LOGIN)
  }
}
