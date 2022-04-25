export function storePathHistory() {
  const storage = window?.sessionStorage;
  if (!storage) return;

  const previousPath = storage.getItem('currentPath') || '';
  storage.setItem('previousPath', previousPath);
  storage.setItem('currentPath', window.location.pathname);
}
