function DevPanel({ users, currentUserId, onChangeUser, previewMode, onChangePreviewMode }) {
  const isMobilePreview = previewMode === "mobile";

  const setMobile = () => onChangePreviewMode("mobile");
  const setDesktop = () => onChangePreviewMode("desktop");

  return (
    <aside className="dev-panel">
      <div className="dev-title">Santa&apos;s lil helper</div>

      <div className="dev-row">
        <span>Aktuální uživatel:</span>
        <select
          value={currentUserId}
          onChange={(e) => onChangeUser(Number(e.target.value))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="dev-preview-card">
        <div className="dev-preview-header">
          <span className="dev-preview-title">Přepínač zobrazení</span>
        </div>

        <div className="preview-switch" role="group" aria-label="Přepnutí náhledu aplikace">
          <button
            type="button"
            className={`preview-switch-button ${isMobilePreview ? "active" : ""}`}
            onClick={setMobile}
          >
            📱 Mobil
          </button>
          <button
            type="button"
            className={`preview-switch-button ${!isMobilePreview ? "active" : ""}`}
            onClick={setDesktop}
          >
            💻 PC
          </button>
        </div>


      </div>

      <div className="dev-note">
        Tento panel slouží jen pro testování uživatelů a responzivního zobrazení.
      </div>
    </aside>
  );
}

export default DevPanel;
