export function validateValue<T>(value: unknown, acceptValues: T[], fallbackValue: T): T {
  return acceptValues.find((v) => v === value) ?? fallbackValue
}
