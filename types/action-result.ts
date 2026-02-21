export type ActionResult<TData, TFields extends string = string> =
  | {
      success: true
      data: TData | null
    }
  | {
      success: false
      error: string | null
      fieldErrors?: Partial<Record<TFields, string[] | null>> | null
    }
