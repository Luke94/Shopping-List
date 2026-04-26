import TopBar from "./TopBar";

function MembersRoute({
  currentUser,
  ownerUser,
  memberUsers,
  isOwner,
  currentUserId,
  onToggleDarkMode,
  onGoHome,
  onReturnToDetail,
  onOpenAddMember,
  onRemoveMember,
  onLeaveList,
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
          isOwner ? (
            <button className="icon-button" title="Add member" onClick={onOpenAddMember}>
              ➕
            </button>
          ) : null
        }
      />

      <div className="content-area">
        <button className="section-title-bar back-bar" onClick={onReturnToDetail}>
          <span>Zpět na nákupní seznam</span>
        </button>

        {ownerUser && (
          <div className="member-card owner-member-card">
            <div className="member-name">{ownerUser.name}</div>
          </div>
        )}

        {memberUsers.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-name">{member.name}</div>

            {isOwner && (
              <button className="mini-icon-button" onClick={() => onRemoveMember(member.id)}>
                👤-
              </button>
            )}

            {!isOwner && member.id === currentUserId && (
              <button className="mini-icon-button" onClick={onLeaveList}>
                👤-
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MembersRoute;
