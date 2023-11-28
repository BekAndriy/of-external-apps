type AnyFunction = (...args: any[]) => any

export const debounce = <T extends AnyFunction>(func: T, delay: number): T => {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return ((...args: Parameters<T>) => {
    const later = () => {
      timeoutId = null
      func.apply(func, args)
    }

    clearTimeout(timeoutId as ReturnType<typeof setTimeout>)
    timeoutId = setTimeout(later, delay)
  }) as T
}
