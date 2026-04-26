function SearchModal({
  modalSearchInput,
  searchFilter,
  onChangeInput,
  onChangeFilter,
  onClose,
  onSubmit,
}) {
  return (
    <div className="overlay">
      <div className="custom-modal search-modal compact-search">
        <button className="modal-close-x left-close" onClick={onClose}>
          ×
        </button>

        <div className="search-top compact-search-top">
          <div className="search-input-wrapper">
            <input
              value={modalSearchInput}
              onChange={(e) => onChangeInput(e.target.value)}
              placeholder="Vyhledávání..."
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="search-results">
          <button
            className={`search-result-row ${searchFilter === "list" ? "search-active" : ""}`}
            onClick={() => onChangeFilter("list")}
          >
            Název Nákupního seznamu
          </button>

          <button
            className={`search-result-row ${searchFilter === "item" ? "search-active" : ""}`}
            onClick={() => onChangeFilter("item")}
          >
            Položka v nákupním seznamu
          </button>

          <button
            className={`search-result-row ${searchFilter === "member" ? "search-active" : ""}`}
            onClick={() => onChangeFilter("member")}
          >
            Člen nákupního seznamu
          </button>

          <button className="search-result-row search-submit-row" onClick={onSubmit}>
            Vyhledat
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
