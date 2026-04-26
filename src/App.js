import React, { useMemo, useState } from "react";
import "./App.css";
import { initialLists, initialUsers } from "./data/initialData";
import AddItemModal from "./components/AddItemModal";
import AddListModal from "./components/AddListModal";
import AddMemberModal from "./components/AddMemberModal";
import ConfirmModal from "./components/ConfirmModal";
import DevPanel from "./components/DevPanel";
import EditBoughtModal from "./components/EditBoughtModal";
import HomeRoute from "./components/HomeRoute";
import MembersRoute from "./components/MembersRoute";
import AppShell from "./components/AppShell";
import SearchModal from "./components/SearchModal";
import ShoppingListDetailRoute from "./components/ShoppingListDetailRoute";

function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [lists, setLists] = useState(initialLists);
  const [users] = useState(initialUsers);

  const [screen, setScreen] = useState("home");
  const [selectedListId, setSelectedListId] = useState(1);

  const [showArchived, setShowArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("list");
  const [darkMode, setDarkMode] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");

  const [showOnlyMissing, setShowOnlyMissing] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const [showAddListForm, setShowAddListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberSearchInput, setMemberSearchInput] = useState("");

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearchInput, setModalSearchInput] = useState("");

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemRequired, setNewItemRequired] = useState("");

  const [showEditBoughtModal, setShowEditBoughtModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingBoughtValue, setEditingBoughtValue] = useState("");

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirmType: null,
    payload: null,
  });

  const currentUser = users.find((user) => user.id === currentUserId);
  const selectedList = lists.find((list) => list.id === selectedListId);
  const isOwner = selectedList ? selectedList.ownerId === currentUserId : false;

  const visibleHomeLists = useMemo(() => {
    return lists
      .filter((list) => list.memberIds.includes(currentUserId))
      .filter((list) => (showArchived ? true : !list.archived))
      .filter((list) => {
        if (!searchTerm.trim()) return true;

        const search = searchTerm.toLowerCase();

        if (searchFilter === "list") {
          return list.title.toLowerCase().includes(search);
        }

        if (searchFilter === "item") {
          return list.items.some((item) => item.name.toLowerCase().includes(search));
        }

        if (searchFilter === "member") {
          return users
            .filter((user) => list.memberIds.includes(user.id))
            .some((user) => user.name.toLowerCase().includes(search));
        }

        return true;
      });
  }, [lists, currentUserId, showArchived, searchTerm, searchFilter, users]);

  const visibleItems = useMemo(() => {
    if (!selectedList) return [];
    if (!showOnlyMissing) return selectedList.items;
    return selectedList.items.filter((item) => item.bought < item.required);
  }, [selectedList, showOnlyMissing]);

  const ownerUser = selectedList
    ? users.find((user) => user.id === selectedList.ownerId)
    : null;

  const memberUsers = selectedList
    ? users.filter(
        (user) =>
          selectedList.memberIds.includes(user.id) && user.id !== selectedList.ownerId
      )
    : [];

  const addMemberMatch = useMemo(() => {
    if (!selectedList || !memberSearchInput.trim()) return null;

    const normalizedInput = memberSearchInput.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.name.toLowerCase() === normalizedInput ||
        u.name.toLowerCase().includes(normalizedInput)
    );

    if (!user) return { status: "not-found", user: null };
    if (selectedList.memberIds.includes(user.id)) {
      return { status: "already-member", user };
    }

    return { status: "found", user };
  }, [memberSearchInput, users, selectedList]);

  const resolvedSummary = (list) => {
    const done = list.items.filter((item) => item.bought >= item.required).length;
    return `${done} / ${list.items.length}`;
  };

  const openConfirmModal = ({ title, message, onConfirmType, payload = null }) => {
    setConfirmModal({ open: true, title, message, onConfirmType, payload });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      open: false,
      title: "",
      message: "",
      onConfirmType: null,
      payload: null,
    });
  };

  const handleConfirmAction = () => {
    const { onConfirmType, payload } = confirmModal;

    if (onConfirmType === "deleteSelectedItems") {
      setLists((prev) =>
        prev.map((list) =>
          list.id !== selectedListId
            ? list
            : {
                ...list,
                items: list.items.filter((item) => !selectedItemIds.includes(item.id)),
              }
        )
      );
      setSelectedItemIds([]);
      setIsDeleteMode(false);
    }

    if (onConfirmType === "deleteList") {
      const listIdToDelete = payload ?? selectedListId;
      setLists((prev) => prev.filter((list) => list.id !== listIdToDelete));
      if (selectedListId === listIdToDelete) setScreen("home");
    }

    if (onConfirmType === "removeMember") {
      setLists((prev) =>
        prev.map((list) =>
          list.id !== selectedListId
            ? list
            : { ...list, memberIds: list.memberIds.filter((id) => id !== payload) }
        )
      );
    }

    if (onConfirmType === "leaveList") {
      setLists((prev) =>
        prev.map((list) =>
          list.id !== selectedListId
            ? list
            : { ...list, memberIds: list.memberIds.filter((id) => id !== currentUserId) }
        )
      );
      setScreen("home");
    }

    closeConfirmModal();
  };

  const openListDetail = (listId) => {
    setSelectedListId(listId);
    setScreen("detail");
    setShowOnlyMissing(false);
    setIsDeleteMode(false);
    setSelectedItemIds([]);
    setIsEditingTitle(false);
    setShowAddItemModal(false);
    setShowEditBoughtModal(false);
  };

  const goHome = () => {
    setScreen("home");
    setIsDeleteMode(false);
    setSelectedItemIds([]);
    setIsEditingTitle(false);
    setShowAddMemberModal(false);
    setShowAddItemModal(false);
    setShowEditBoughtModal(false);
  };

  const returnToDetail = () => {
    setScreen("detail");
    setShowAddMemberModal(false);
  };

  const openMembersScreen = () => {
    setScreen("members");
    setShowAddMemberModal(false);
  };

  const toggleItemDone = (itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id !== selectedListId
          ? list
          : {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, bought: item.required } : item
              ),
            }
      )
    );
  };

  const openEditBoughtModal = (itemId) => {
    if (!selectedList) return;
    const item = selectedList.items.find((i) => i.id === itemId);
    if (!item) return;

    setEditingItemId(itemId);
    setEditingBoughtValue(String(item.bought));
    setShowEditBoughtModal(true);
  };

  const closeEditBoughtModal = () => {
    setShowEditBoughtModal(false);
    setEditingItemId(null);
    setEditingBoughtValue("");
  };

  const saveBoughtCount = () => {
    if (!selectedList || editingItemId === null) return;

    const item = selectedList.items.find((i) => i.id === editingItemId);
    if (!item) return;

    const parsed = Number(editingBoughtValue);
    if (Number.isNaN(parsed)) return;

    const safeValue = Math.max(0, Math.min(item.required, parsed));

    setLists((prev) =>
      prev.map((list) =>
        list.id !== selectedListId
          ? list
          : {
              ...list,
              items: list.items.map((currentItem) =>
                currentItem.id === editingItemId
                  ? { ...currentItem, bought: safeValue }
                  : currentItem
              ),
            }
      )
    );

    closeEditBoughtModal();
  };

  const toggleSelectItemForDelete = (itemId) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleDeleteSelectedItems = () => {
    if (selectedItemIds.length === 0) {
      window.alert("Nejprve vyber položky ke smazání.");
      return;
    }

    openConfirmModal({
      title: "Smazat",
      message: "Upravdu si přejete odstranit položku?",
      onConfirmType: "deleteSelectedItems",
    });
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const required = Number(newItemRequired);
    const safeRequired = Number.isNaN(required) || required <= 0 ? 1 : required;

    const newItem = {
      id: Date.now(),
      name: newItemName.trim(),
      required: safeRequired,
      bought: 0,
    };

    setLists((prev) =>
      prev.map((list) =>
        list.id !== selectedListId ? list : { ...list, items: [...list.items, newItem] }
      )
    );

    setNewItemName("");
    setNewItemRequired("");
    setShowAddItemModal(false);
  };

  const handleRenameList = () => {
    if (!editedTitle.trim()) return;

    setLists((prev) =>
      prev.map((list) => (list.id === selectedListId ? { ...list, title: editedTitle.trim() } : list))
    );

    setIsEditingTitle(false);
  };

  const handleArchiveList = () => {
    if (!isOwner) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const handleDeleteList = () => {
    if (!isOwner || !selectedList) return;

    openConfirmModal({
      title: "Smazat",
      message: "Upravdu si přejete odstranit nákupní seznam?",
      onConfirmType: "deleteList",
      payload: selectedList.id,
    });
  };

  const handleDeleteListFromOverview = (listId) => {
    const list = lists.find((currentList) => currentList.id === listId);
    if (!list || list.ownerId !== currentUserId) return;

    openConfirmModal({
      title: "Smazat",
      message: `Upravdu si přejete odstranit nákupní seznam „${list.title}“?`,
      onConfirmType: "deleteList",
      payload: listId,
    });
  };

  const handleAddList = () => {
    if (!newListTitle.trim()) return;

    const newList = {
      id: Date.now(),
      title: newListTitle.trim(),
      ownerId: currentUserId,
      ownerName: currentUser?.name || "Unknown",
      memberIds: [currentUserId],
      archived: false,
      items: [],
    };

    setLists((prev) => [newList, ...prev]);
    setNewListTitle("");
    setShowAddListForm(false);
  };

  const removeMember = (memberId) => {
    openConfirmModal({
      title: "Smazat",
      message: "Upravdu si přejete odstranit člena?",
      onConfirmType: "removeMember",
      payload: memberId,
    });
  };

  const leaveList = () => {
    openConfirmModal({
      title: "Smazat",
      message: "Upravdu si přejete odstranit člena?",
      onConfirmType: "leaveList",
    });
  };

  const handleAddMember = () => {
    if (!selectedList || !addMemberMatch || addMemberMatch.status !== "found") return;

    setLists((prev) =>
      prev.map((list) =>
        list.id !== selectedListId
          ? list
          : { ...list, memberIds: [...list.memberIds, addMemberMatch.user.id] }
      )
    );

    setMemberSearchInput("");
    setShowAddMemberModal(false);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <AppShell previewMode={previewMode}>
        {screen === "home" && (
          <HomeRoute
            currentUser={currentUser}
            currentUserId={currentUserId}
            visibleHomeLists={visibleHomeLists}
            showArchived={showArchived}
            searchTerm={searchTerm}
            searchFilter={searchFilter}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
            onToggleArchived={() => setShowArchived((prev) => !prev)}
            onOpenSearch={() => {
              setModalSearchInput(searchTerm);
              setShowSearchModal(true);
            }}
            onOpenAddList={() => {
              setNewListTitle("");
              setShowAddListForm(true);
            }}
            onClearSearch={() => {
              setSearchTerm("");
              setSearchFilter("list");
            }}
            onOpenListDetail={openListDetail}
            onDeleteList={handleDeleteListFromOverview}
            getResolvedSummary={resolvedSummary}
          />
        )}

        {screen === "detail" && selectedList && (
          <ShoppingListDetailRoute
            currentUser={currentUser}
            selectedList={selectedList}
            isOwner={isOwner}
            isEditingTitle={isEditingTitle}
            editedTitle={editedTitle}
            visibleItems={visibleItems}
            showOnlyMissing={showOnlyMissing}
            isDeleteMode={isDeleteMode}
            selectedItemIds={selectedItemIds}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
            onGoHome={goHome}
            onOpenMembers={openMembersScreen}
            onArchiveList={handleArchiveList}
            onDeleteList={handleDeleteList}
            onStartEditTitle={() => {
              setEditedTitle(selectedList.title);
              setIsEditingTitle(true);
            }}
            onChangeEditedTitle={setEditedTitle}
            onRenameList={handleRenameList}
            onCancelEditTitle={() => setIsEditingTitle(false)}
            onOpenAddItem={() => {
              setShowAddItemModal(true);
              setIsDeleteMode(false);
              setSelectedItemIds([]);
            }}
            onStartDeleteMode={() => {
              setIsDeleteMode(true);
              setSelectedItemIds([]);
            }}
            onDeleteSelectedItems={handleDeleteSelectedItems}
            onCancelDeleteMode={() => {
              setIsDeleteMode(false);
              setSelectedItemIds([]);
            }}
            onToggleSelectItemForDelete={toggleSelectItemForDelete}
            onOpenEditBought={openEditBoughtModal}
            onToggleItemDone={toggleItemDone}
            onToggleMissingFilter={() => setShowOnlyMissing((prev) => !prev)}
          />
        )}

        {screen === "members" && selectedList && (
          <MembersRoute
            currentUser={currentUser}
            ownerUser={ownerUser}
            memberUsers={memberUsers}
            isOwner={isOwner}
            currentUserId={currentUserId}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
            onGoHome={goHome}
            onReturnToDetail={returnToDetail}
            onOpenAddMember={() => {
              setMemberSearchInput("");
              setShowAddMemberModal(true);
            }}
            onRemoveMember={removeMember}
            onLeaveList={leaveList}
          />
        )}
      </AppShell>

      <DevPanel
        users={users}
        currentUserId={currentUserId}
        onChangeUser={setCurrentUserId}
        previewMode={previewMode}
        onChangePreviewMode={setPreviewMode}
      />

      {showAddListForm && (
        <AddListModal
          newListTitle={newListTitle}
          onChangeTitle={setNewListTitle}
          onClose={() => setShowAddListForm(false)}
          onCreate={handleAddList}
        />
      )}

      {showAddMemberModal && (
        <AddMemberModal
          memberSearchInput={memberSearchInput}
          addMemberMatch={addMemberMatch}
          onChangeInput={setMemberSearchInput}
          onClose={() => setShowAddMemberModal(false)}
          onAddMember={handleAddMember}
        />
      )}

      {showAddItemModal && (
        <AddItemModal
          newItemName={newItemName}
          newItemRequired={newItemRequired}
          onChangeName={setNewItemName}
          onChangeRequired={setNewItemRequired}
          onClose={() => setShowAddItemModal(false)}
          onAddItem={handleAddItem}
        />
      )}

      {showEditBoughtModal && (
        <EditBoughtModal
          editingBoughtValue={editingBoughtValue}
          onChangeValue={setEditingBoughtValue}
          onClose={closeEditBoughtModal}
          onSave={saveBoughtCount}
        />
      )}

      {showSearchModal && (
        <SearchModal
          modalSearchInput={modalSearchInput}
          searchFilter={searchFilter}
          onChangeInput={setModalSearchInput}
          onChangeFilter={setSearchFilter}
          onClose={() => setShowSearchModal(false)}
          onSubmit={() => {
            setSearchTerm(modalSearchInput);
            setShowSearchModal(false);
            setScreen("home");
          }}
        />
      )}

      {confirmModal.open && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={handleConfirmAction}
          onCancel={closeConfirmModal}
        />
      )}
    </div>
  );
}

export default App;
