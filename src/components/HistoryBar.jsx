export default function HistoryBar({ history, onSelect, onClear }) {
  const formatTime = (isoString) => {
    const date = new Date(isoString)
    const now = new Date()
    const diff = now - date
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="history-bar">
      <span className="history-label">History</span>

      {history.length === 0 ? (
        <span className="empty-history">No pitches yet</span>
      ) : (
        <>
          <div className="history-scroll">
            {history.map((pitch) => (
              <button
                key={pitch.id}
                className="history-chip"
                onClick={() => onSelect(pitch)}
                title={`${pitch.product}\n${pitch.subject}`}
              >
                <span>{pitch.product}</span>
                <span className="history-chip-time">{formatTime(pitch.createdAt)}</span>
              </button>
            ))}
          </div>
          <button className="clear-btn" onClick={onClear}>
            Clear All
          </button>
        </>
      )}
    </div>
  )
}
