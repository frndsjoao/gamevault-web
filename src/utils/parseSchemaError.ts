type ValidationErrors = Record<
  string,
  {
    message: string
    type: string
    ref: { name: string }
  }
>

export function parseSchemaErrors(errors: ValidationErrors): string[] {
  return Object.entries(errors).map(
    ([key, value]) => `${key}: ${value.message}`,
  )
}
