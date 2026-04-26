import TopBar from "./TopBar";

function HomeRoute({
  currentUser,
  currentUserId,
  visibleHomeLists,
  showArchived,
  searchTerm,
  searchFilter,
  onToggleDarkMode,
  onToggleArchived,
  onOpenSearch,
  onOpenAddList,
  onClearSearch,
  onOpenListDetail,
  onDeleteList,
  getResolvedSummary,
}) {
  return (
    <>
      <TopBar
        currentUser={currentUser}
        onToggleDarkMode={onToggleDarkMode}
        rightContent={
          <>
            <button
              className={`icon-button archive-toggle ${showArchived ? "active-icon is-open" : ""}`}
              title={showArchived ? "Skrýt archivované seznamy" : "Zobrazit archivované seznamy"}
              aria-pressed={showArchived}
              onClick={onToggleArchived}
            >
              <span className="archive-icon">🗃</span>
              <span className="archive-label">{showArchived ? "Archiv zapnutý" : "Archiv"}</span>
            </button>
            <button className="icon-button" title="Search" onClick={onOpenSearch}>
              🔍
            </button>
            <button className="icon-button" title="New list" onClick={onOpenAddList}>
              ➕
            </button>
          </>
        }
      />

      {searchTerm && (
        <div className="helper-bar">
          <span>
            Vyhledávání: {searchTerm} ({searchFilter})
          </span>
          <button className="tiny-button" onClick={onClearSearch}>
            Zrušit
          </button>
        </div>
      )}

      <div className="content-area">
        <div className="home-list">
          {visibleHomeLists.map((list) => {
            const canDeleteList = list.ownerId === currentUserId;

            return (
              <div
                key={list.id}
                className={`home-card ${list.id === 4 ? "highlight-card" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => onOpenListDetail(list.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onOpenListDetail(list.id);
                }}
              >
                <div className="home-card-header">
                  <div className="home-card-title">{list.title}</div>

                  {canDeleteList && (
                    <button
                      className="home-delete-button"
                      title="Smazat nákupní seznam"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteList(list.id);
                      }}
                    >
                      🗑
                    </button>
                  )}
                </div>

                <div className="home-card-meta">
                  <div>{list.ownerName}</div>
                  <div>Splněno: {getResolvedSummary(list)}</div>
                </div>
              </div>
            );
          })}

          {visibleHomeLists.length === 0 && (
            <div className="empty-message">Žádné seznamy k zobrazení.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeRoute;
