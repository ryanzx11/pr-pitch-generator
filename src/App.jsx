import { useState } from 'react'
import './App.css'
import InputPanel from './components/InputPanel'
import PreviewPanel from './components/PreviewPanel'
import HistoryBar from './components/HistoryBar'
import { usePitchHistory } from './hooks/usePitchHistory'
import { generatePitch } from './services/minimax'

function App() {
  const [currentPitch, setCurrentPitch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { history, addPitch, clearHistory } = usePitchHistory()

  const handleGenerate = async ({ product, intro, bullets, style }) => {
    if (!product.trim() || !intro.trim() || bullets.length === 0) {
      setError({ type: 'validation', message: 'Please fill in all fields before generating.' })
      setTimeout(() => setError(null), 5000)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const { subject, body } = await generatePitch({ product, intro, bullets, style })
      const pitch = { subject, body }
      setCurrentPitch(pitch)
      addPitch({ ...pitch, product, intro, bullets, style })
    } catch (err) {
      const msg = err.message || ''
      if (msg.includes('401') || msg.includes('invalid') || msg.includes('Unauthorized')) {
        setError({ type: 'auth', message: 'API key is invalid or expired. Please check your key.' })
      } else if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
        setError({ type: 'quota', message: 'API quota exceeded. Please try again later.' })
      } else if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to')) {
        setError({ type: 'network', message: 'Network error. Please check your connection.' })
      } else {
        setError({ type: 'unknown', message: `Generation failed: ${msg}` })
      }
      setTimeout(() => setError(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (pitch) => {
    setCurrentPitch(pitch)
    setError(null)
  }

  const handleClearHistory = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearHistory()
      setCurrentPitch(null)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI PR Pitch Generator</h1>
        <span className="header-badge">Powered by OpenRouter</span>
      </header>

      <main className="main">
        <InputPanel onGenerate={handleGenerate} loading={loading} />
        <PreviewPanel pitch={currentPitch} loading={loading} error={error} onDismissError={() => setError(null)} />
      </main>

      <HistoryBar history={history} onSelect={handleSelect} onClear={handleClearHistory} />
    </div>
  )
}

export default App
