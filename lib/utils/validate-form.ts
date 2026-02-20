import { flattenError, type ZodType, z } from "zod"

interface ValidateFormArgs<TSchema extends ZodType> {
  formData: FormData
  schema: TSchema
}

type ValidationResult<TSchema extends ZodType> =
  | {
      success: true
      data: z.infer<TSchema>
    }
  | {
      success: false
      errors: Partial<Record<keyof z.infer<TSchema>, string[] | undefined>>
    }

export function validateForm<TSchema extends ZodType>({
  formData,
  schema,
}: ValidateFormArgs<TSchema>): ValidationResult<TSchema> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return {
      success: false,
      errors: flattenError(parsed.error).fieldErrors,
    }
  }

  return {
    success: true,
    data: parsed.data,
  }
}
