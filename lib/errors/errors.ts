import { AuthErrorCode } from "@/types/auth"
import { BaseError } from "./base-error"

export class AuthError extends BaseError<AuthErrorCode> {}
