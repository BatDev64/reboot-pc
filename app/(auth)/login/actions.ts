"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logAuthEvent } from "@/lib/loggers/loggers"
import { loginSchema, type LoginSchema } from "@/schemas/auth"
import { AuthErrorCode } from "@/types/auth"
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages"
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { validateForm } from "@/lib/utils/validate-form"
import { type ActionResult } from "@/types/action-result"
import { login } from "@/lib/domain/auth-service"
import { AuthError } from "@/lib/errors/errors"

export async function loginAction(
  prevState: ActionResult<null, keyof LoginSchema> | null,
  formData: FormData,
): Promise<ActionResult<null, keyof LoginSchema>> {
  const result = validateForm({ formData, schema: loginSchema })

  if (!result.success) {
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES[AuthErrorCode.VALIDATION_FAILED],
      fieldErrors: result.errors,
    }
  }

  const { email, password } = result.data

  try {
    await login({ email, password })
  } catch (err) {
    if (err instanceof AuthError) {
      logAuthEvent({
        level: "warn",
        code: err.code,
        context: {
          details: {
            error: err.message,
            details: err.details,
          },
        },
      })

      return {
        success: false,
        error: AUTH_ERROR_MESSAGES[err.code],
        fieldErrors: {},
      }
    }

    return {
      success: false,
      error: "Unexpected error",
      fieldErrors: {},
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
