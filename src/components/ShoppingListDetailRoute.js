import TopBar from "./TopBar";

function ShoppingListDetailRoute({
  currentUser,
  selectedList,
  isOwner,
  isEditingTitle,
  editedTitle,
  visibleItems,
  showOnlyMissing,
  isDeleteMode,
  selectedItemIds,
  onToggleDarkMode,
  onGoHome,
  onOpenMembers,
  onArchiveList,
  onDeleteList,
  onStartEditTitle,
  onChangeEditedTitle,
  onRenameList,
  onCancelEditTitle,
  onOpenAddItem,
  onStartDeleteMode,
  onDeleteSelectedItems,
  onCancelDeleteMode,
  onToggleSelectItemForDelete,
  onOpenEditBought,
  onToggleItemDone,
  onToggleMissingFilter,
}) {

  return (
    <>
      <TopBar
        currentUser={currentUser}
        onToggleDarkMode={onToggleDarkMode}
        centerContent={
          <button className="icon-button" title="Home" onClick={onGoHome}>
            🏠
          </button>
        }
        rightContent={
          <>
            {isOwner && (
              <button
                className={`icon-button archive-toggle detail-archive-toggle ${selectedList.archived ? "active-icon is-open" : ""}`}
                title={selectedList.archived ? "Vrátit z archivu" : "Archivovat seznam"}
                aria-pressed={selectedList.archived}
                onClick={onArchiveList}
              >
                <span className="archive-icon">🗃</span>
                <span className="archive-label">{selectedList.archived ? "Archivováno" : "Archiv"}</span>
              </button>
            )}

            {isOwner && (
              <button className="icon-button" title="Delete list" onClick={onDeleteList}>
                🗑
              </button>
            )}

            <button className="icon-button" title="Members" onClick={onOpenMembers}>
              👥
            </button>
          </>
        }
      />

      <div className="content-area">
        <div className="section-title-bar">
          <span>{selectedList.title}</span>
          {isOwner && !isEditingTitle && (
            <button className="mini-icon-button" onClick={onStartEditTitle}>
              ✎
            </button>
          )}
        </div>



        {isEditingTitle && (
          <div className="mini-form">
            <input
              value={editedTitle}
              onChange={(e) => onChangeEditedTitle(e.target.value)}
              placeholder="Nový název seznamu"
            />
            <button className="small-action-button" onClick={onRenameList}>
              Uložit
            </button>
            <button className="small-action-button muted" onClick={onCancelEditTitle}>
              Zrušit
            </button>
          </div>
        )}

        <div className="action-row">
          <button className="action-button" onClick={onOpenAddItem}>
            Přidat položku
          </button>

          <button
            className={`action-button ${isDeleteMode ? "danger-mode" : ""}`}
            onClick={isDeleteMode ? onDeleteSelectedItems : onStartDeleteMode}
          >
            {isDeleteMode ? "Smazat" : "Odebrat položku"}
          </button>
        </div>

        {isDeleteMode && (
          <div className="helper-bar">
            <span>Vyber položky ke smazání.</span>
            <button className="tiny-button" onClick={onCancelDeleteMode}>
              Zrušit
            </button>
          </div>
        )}

        <div className="items-list">
          {visibleItems.map((item) => {
            const done = item.bought >= item.required;
            const selectedForDelete = selectedItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`item-row ${done ? "done-item" : ""} ${
                  selectedForDelete ? "delete-selected" : ""
                }`}
                onClick={() => {
                  if (isDeleteMode) onToggleSelectItemForDelete(item.id);
                }}
              >
                <div className="item-name">{item.name}</div>

                <button
                  className="mini-icon-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenEditBought(item.id);
                  }}
                >
                  ✎
                </button>

                <div className="item-count">
                  {item.bought} / {item.required}
                </div>

                <button
                  className="mini-icon-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItemDone(item.id);
                  }}
                >
                  🧺
                </button>
              </div>
            );
          })}
        </div>

        <div className="bottom-filter">
          <div className="bottom-filter-text">Zobrazit pouze chybějící</div>
          <button
            className={`toggle-button ${showOnlyMissing ? "toggle-on" : ""}`}
            onClick={onToggleMissingFilter}
          >
            {showOnlyMissing ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ShoppingListDetailRoute;
