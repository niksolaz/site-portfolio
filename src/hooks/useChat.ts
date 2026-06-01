import { useState } from 'react'
import type { Locale } from '../types'

export type MessageCategory = 'spam' | 'info' | 'lead'

export interface AnalysisResult {
  category: MessageCategory
  reply: string
}

interface AnalyzeInput {
  name: string
  email: string
  message: string
  locale: Locale
}

/**
 * Hook che incapsula la chiamata all'endpoint agentico /api/chat.
 * Restituisce la categoria del messaggio (spam | info | lead) e, per le
 * richieste di informazioni, la risposta FAQ generata dall'AI.
 */
const useContactAgent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const analyze = async ({ name, email, message, locale }: AnalyzeInput): Promise<AnalysisResult> => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale }),
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = (await res.json()) as AnalysisResult
      return data
    } catch (err) {
      const normalized = err instanceof Error ? err : new Error('Unknown error')
      setError(normalized)
      throw normalized
    } finally {
      setIsLoading(false)
    }
  }

  return { analyze, isLoading, error }
}

export default useContactAgent
