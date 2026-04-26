function AddListModal({ newListTitle, onChangeTitle, onClose, onCreate }) {
  return (
    <div className="overlay">
      <div className="custom-modal compact-modal">
        <button className="modal-close-x left-close" onClick={onClose}>
          ×
        </button>

        <div className="compact-modal-body">
          <div className="single-input-box neutral">
            <div className="floating-label small-label">Název seznamu</div>
            <input
              value={newListTitle}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Zadejte název seznamu"
              autoFocus
            />
          </div>
        </div>

        <div className="modal-bottom-one">
          <button
            className="modal-main-action compact-action"
            onClick={onCreate}
            disabled={!newListTitle.trim()}
          >
            Vytvořit seznam
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddListModal;
