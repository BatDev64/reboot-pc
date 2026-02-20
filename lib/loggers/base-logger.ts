import "server-only"

export type LogLevel = "info" | "warn" | "error"

interface BaseLogContext {
  userId?: string
  route?: string
  details?: Record<string, unknown>
}

export interface BaseLogPayload<TCode extends string> {
  level: LogLevel
  domain: string
  code: TCode
  context?: BaseLogContext
}

export function baseLogger<TCode extends string>({
  level,
  domain,
  code,
  context,
}: BaseLogPayload<TCode>) {
  const payload = {
    level,
    domain,
    code,
    timeStamp: new Date().toISOString(),
    context: context || null,
  }

  console[level](payload)
}
