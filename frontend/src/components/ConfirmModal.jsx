function ConfirmModal({
  title = "Confirm Delete",
  message,
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-modal-actions">
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="delete-confirm-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;