import { AuthErrorCode } from "@/types/auth"
import { createDomainLogger } from "./create-domain-logger"

export const logAuthEvent = createDomainLogger<AuthErrorCode>("auth")
