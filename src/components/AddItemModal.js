function AddItemModal({
  newItemName,
  newItemRequired,
  onChangeName,
  onChangeRequired,
  onClose,
  onAddItem,
}) {
  return (
    <div className="overlay">
      <div className="custom-modal compact-modal">
        <button className="modal-close-x left-close" onClick={onClose}>
          ×
        </button>

        <div className="compact-modal-body two-fields">
          <div className="single-input-box neutral">
            <div className="floating-label small-label">Název</div>
            <input
              value={newItemName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Zadejte název položky"
            />
          </div>

          <div className="single-input-box neutral">
            <div className="floating-label small-label">Počet</div>
            <input
              type="number"
              min="1"
              value={newItemRequired}
              onChange={(e) => onChangeRequired(e.target.value)}
              placeholder="Zadejte počet k zakoupení"
            />
          </div>
        </div>

        <div className="modal-bottom-one">
          <button className="modal-main-action compact-action" onClick={onAddItem}>
            Přidat položku
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
