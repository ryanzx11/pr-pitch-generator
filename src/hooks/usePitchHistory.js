import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pr_pitch_history'

export function usePitchHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      setHistory(stored ? JSON.parse(stored) : [])
    } catch {
      setHistory([])
    }
  }, [])

  const addPitch = (pitch) => {
    const newPitch = {
      ...pitch,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    const updated = [newPitch, ...history].slice(0, 20)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return { history, addPitch, clearHistory }
}
