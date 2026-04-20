export default function HistoryBar({ history, onSelect }) {
  return (
    <div className="history-bar">
      <span className="history-label">History:</span>
      {history.length === 0 ? (
        <span style={{ color: '#999', fontSize: 12 }}>No pitches yet</span>
      ) : (
        history.map((pitch) => (
          <button
            key={pitch.id}
            className="history-chip"
            onClick={() => onSelect(pitch)}
          >
            {pitch.productName} — {pitch.style}
          </button>
        ))
      )}
    </div>
  );
}