function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="custom-modal confirm-modal compact-modal">
        <button className="modal-close-x left-close" onClick={onCancel}>
          ×
        </button>

        <div className="confirm-content compact-confirm-content">
          <div className="confirm-title">{title}</div>
          <div className="confirm-message">{message}</div>
        </div>

        <div className="confirm-actions">
          <button className="confirm-half" onClick={onConfirm}>
            Ano
          </button>
          <button className="confirm-half" onClick={onCancel}>
            Ne
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
