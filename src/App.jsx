import { useState } from 'react'
import './App.css'
import InputPanel from './components/InputPanel'
import PreviewPanel from './components/PreviewPanel'
import HistoryBar from './components/HistoryBar'
import { usePitchHistory } from './hooks/usePitchHistory'
import { generatePitch } from './services/minimax'

function App() {
  const [currentPitch, setCurrentPitch] = useState('')
  const [loading, setLoading] = useState(false)
  const { history, addPitch } = usePitchHistory()

  const handleGenerate = async ({ product, intro, bullets, style }) => {
    setLoading(true)
    try {
      const { subject, body } = await generatePitch({ product, intro, bullets, style })
      const pitch = `Subject: ${subject}\n\n${body}`
      setCurrentPitch(pitch)
      addPitch(pitch)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (pitch) => {
    setCurrentPitch(pitch)
  }

  return (
    <div className="app">
      <HistoryBar history={history} onSelect={handleSelect} />
      <main className="main">
        <InputPanel onGenerate={handleGenerate} />
        <PreviewPanel pitch={currentPitch} />
      </main>
    </div>
  )
}

export default App
