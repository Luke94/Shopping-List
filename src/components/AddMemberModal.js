function AddMemberModal({
  memberSearchInput,
  addMemberMatch,
  onChangeInput,
  onClose,
  onAddMember,
}) {
  const hasInput = Boolean(memberSearchInput.trim());
  const isFound = addMemberMatch?.status === "found";

  return (
    <div className="overlay">
      <div className="custom-modal compact-modal">
        <button className="modal-close-x left-close" onClick={onClose}>
          ×
        </button>

        <div className="compact-modal-body">
          <div className={`single-input-box ${!hasInput ? "" : isFound ? "valid" : "invalid"}`}>
            <div className="floating-label small-label">Jméno</div>
            <input
              value={memberSearchInput}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder="Zadejte jméno uživatele"
            />
            <div className="input-status-icon">{!hasInput ? "" : "✓"}</div>
          </div>

          <div
            className={`validation-text compact-validation ${
              !hasInput ? "" : isFound ? "valid-text" : "invalid-text"
            }`}
          >
            {!hasInput
              ? ""
              : isFound
              ? "Uživatel nalezen"
              : addMemberMatch?.status === "already-member"
              ? "Uživatel už je členem"
              : "Uživatel nenalezen"}
          </div>
        </div>

        <div className="modal-bottom-one">
          <button
            className="modal-main-action compact-action"
            onClick={onAddMember}
            disabled={!addMemberMatch || addMemberMatch.status !== "found"}
          >
            Přidat člena
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
