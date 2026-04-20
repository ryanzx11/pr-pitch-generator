function PreviewPanel({ pitch }) {
  const handleCopy = () => {
    if (!pitch) return
    const text = `Subject: ${pitch.subject}\n\n${pitch.body}`
    navigator.clipboard.writeText(text)
  }

  if (!pitch) {
    return (
      <div className="empty-state">
        Your pitch preview will appear here after generation.
      </div>
    )
  }

  return (
    <div className="preview-content">
      <div className="preview-subject">{pitch.subject}</div>
      <div className="preview-body">
        <pre>{pitch.body}</pre>
      </div>
      <button className="copy-btn" onClick={handleCopy}>
        Copy
      </button>
    </div>
  )
}

export default PreviewPanel