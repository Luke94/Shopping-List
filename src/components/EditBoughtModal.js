function EditBoughtModal({ editingBoughtValue, onChangeValue, onClose, onSave }) {
  return (
    <div className="overlay">
      <div className="custom-modal compact-modal">
        <button className="modal-close-x left-close" onClick={onClose}>
          ×
        </button>

        <div className="compact-modal-body">
          <div className="single-input-box neutral">
            <div className="floating-label small-label">Zakoupeno</div>
            <input
              type="number"
              min="0"
              value={editingBoughtValue}
              onChange={(e) => onChangeValue(e.target.value)}
              placeholder="Zadejte počet zakoupených kusů"
            />
          </div>
        </div>

        <div className="modal-bottom-one">
          <button className="modal-main-action compact-action" onClick={onSave}>
            Uložit počet
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBoughtModal;
