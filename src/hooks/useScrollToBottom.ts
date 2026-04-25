import { useEffect, useRef } from 'react'

export function useScrollToBottom(dependency: unknown) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [dependency])

  return ref
}
