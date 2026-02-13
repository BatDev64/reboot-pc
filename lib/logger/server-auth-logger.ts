import "server-only"

import { type AuthErrorCode } from "@/types/auth"

type AuthLogLevel = "info" | "warn" | "error"

interface AuthLogContext {
  userId?: string
  route?: string
  details?: Record<string, unknown>
}

interface AuthLoggerArgs {
  level: AuthLogLevel
  code: AuthErrorCode
  context?: AuthLogContext
}

export function logAuthEvent({ level, code, context }: AuthLoggerArgs) {
  const payload = {
    level,
    domain: "auth",
    code,
    timeStamp: new Date().toISOString(),
    context,
  }

  switch (level) {
    case "info":
      console.info(payload)
      break
    case "warn":
      console.warn(payload)
      break
    case "error":
      console.error(payload)
      break
  }
}
