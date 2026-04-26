function TopBar({
  currentUser,
  onToggleDarkMode,
  centerContent,
  rightContent,
}) {
  return (
    <div className="top-icons">
      <div className="top-icons-left">
        <button className="icon-button" title="Settings" onClick={onToggleDarkMode}>
          ⚙
        </button>

        <button
          className="icon-button"
          title="User"
          onClick={() => window.alert(`Aktuální uživatel: ${currentUser?.name}`)}
        >
          👤
        </button>
      </div>

      <div className="top-icons-center">{centerContent}</div>

      <div className="top-icons-right">{rightContent}</div>
    </div>
  );
}

export default TopBar;