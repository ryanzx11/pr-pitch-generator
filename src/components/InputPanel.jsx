import { useState } from 'react'
import '../App.css'

function InputPanel({ onGenerate }) {
  const [product, setProduct] = useState('')
  const [intro, setIntro] = useState('')
  const [sellingPoints, setSellingPoints] = useState('')
  const [style, setStyle] = useState('Formal')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const bullets = sellingPoints
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    await onGenerate({ product, intro, bullets, style })
    setLoading(false)
  }

  return (
    <div className="input-panel">
      <div className="form-group">
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="briefIntro">Brief Intro</label>
        <textarea
          id="briefIntro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="Enter brief introduction"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="sellingPoints">Selling Points</label>
        <textarea
          id="sellingPoints"
          value={sellingPoints}
          onChange={(e) => setSellingPoints(e.target.value)}
          placeholder="Enter one bullet per line"
          rows={5}
        />
      </div>

      <div className="form-group">
        <label>Style</label>
        <div className="style-selector">
          {['Formal', 'Friendly', 'Concise'].map((s) => (
            <button
              key={s}
              type="button"
              className={`style-btn ${style === s ? 'active' : ''}`}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="generate-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Pitch'}
      </button>
    </div>
  )
}

export default InputPanel
