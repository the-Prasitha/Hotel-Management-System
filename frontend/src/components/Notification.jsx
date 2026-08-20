function Notification({ message, type = "success", onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      <span>
        {type === "success" ? "✓" : "✕"}
      </span>

      <p>{message}</p>

      <button onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Notification;