import { useState } from 'react'

function PreviewPanel({ pitch, loading, error, onDismissError }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!pitch) return
    const text = `Subject: ${pitch.subject}\n\n${pitch.body}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="preview-panel">
        <div className="preview-header">
          <h2>Email Preview</h2>
        </div>
        <div className="skeleton-card">
          <div className="skeleton skeleton-line" style={{ width: '40%' }}></div>
          <div className="skeleton skeleton-line" style={{ width: '100%' }}></div>
          <div className="skeleton skeleton-line" style={{ width: '95%' }}></div>
          <div className="skeleton skeleton-line" style={{ width: '88%' }}></div>
          <div className="skeleton skeleton-line" style={{ width: '70%' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2>Email Preview</h2>
        {pitch && (
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
      </div>

      {error && (
        <div className="error-alert">
          <span className="error-alert-icon">⚠</span>
          <div className="error-alert-content">
            <div className="error-alert-title">Generation Failed</div>
            <div className="error-alert-message">{error.message}</div>
          </div>
          <button className="error-alert-close" onClick={onDismissError}>×</button>
        </div>
      )}

      {!pitch && !error && (
        <div className="empty-state">
          <div className="empty-state-icon">✉</div>
          <p>Fill in the form and click Generate to create your personalized pitch email.</p>
        </div>
      )}

      {pitch && (
        <div className="preview-card">
          <div className="preview-subject">
            <span>Subject Line</span>
            <p>{pitch.subject}</p>
          </div>
          <div className="preview-body">
            <pre>{pitch.body}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviewPanel
