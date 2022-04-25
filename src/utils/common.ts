export function storePathHistory() {
  const storage = window?.sessionStorage;
  if (!storage) return;

  const previousPath = storage.getItem('currentPath') || '';
  storage.setItem('previousPath', previousPath);
  storage.setItem('currentPath', window.location.pathname);
}

export function getPathHistory() {
  const storage = window?.sessionStorage;

  const previousPath = storage?.getItem('previousPath') || '';
  const currentPath = storage?.getItem('currentPath') || '';

  return [previousPath, currentPath];
}
