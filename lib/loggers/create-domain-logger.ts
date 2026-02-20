import { baseLogger, type BaseLogPayload } from "./base-logger"

export function createDomainLogger<TCode extends string>(domain: string) {
  return function logEvent(args: Omit<BaseLogPayload<TCode>, "domain">) {
    baseLogger({
      ...args,
      domain,
    })
  }
}
