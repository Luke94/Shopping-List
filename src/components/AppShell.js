function AppShell({ children, previewMode = "desktop" }) {
  return (
    <main className={`app-shell preview-${previewMode}`}>
      <div className="screen">{children}</div>
    </main>
  );
}

export default AppShell;
