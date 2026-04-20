import { useState } from 'react'

function InputPanel({ onGenerate, loading }) {
  const [product, setProduct] = useState('')
  const [intro, setIntro] = useState('')
  const [sellingPoints, setSellingPoints] = useState('')
  const [style, setStyle] = useState('formal')

  const handleSubmit = () => {
    const bullets = sellingPoints
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    onGenerate({ product, intro, bullets, style })
  }

  return (
    <div className="input-panel">
      <h2>Product Info</h2>

      <div className="form-group">
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. Govee TV Backlight 3 Pro"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="briefIntro">Brief Introduction</label>
        <textarea
          id="briefIntro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="One sentence description of the product"
          rows={2}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="sellingPoints">Key Selling Points</label>
        <textarea
          id="sellingPoints"
          value={sellingPoints}
          onChange={(e) => setSellingPoints(e.target.value)}
          placeholder="One bullet per line&#10;RGBIC tech with 16M colors&#10;AI music sync&#10;CES 2026 Award"
          rows={5}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Email Style</label>
        <div className="style-selector">
          {['formal', 'friendly', 'concise'].map((s) => (
            <button
              key={s}
              type="button"
              className={`style-btn ${style === s ? 'active' : ''}`}
              onClick={() => setStyle(s)}
              disabled={loading}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
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
        {loading ? (
          <>
            <span className="spinner"></span>
            Generating...
          </>
        ) : (
          'Generate Pitch'
        )}
      </button>
    </div>
  )
}

export default InputPanel
