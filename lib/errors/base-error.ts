export abstract class BaseError<TCode extends string> extends Error {
  constructor(
    public readonly code: TCode,
    message?: string,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = new.target.name
  }
}
