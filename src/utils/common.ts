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

export function calculatePercentage(partialValue: number, totalValue: number) {
  return Math.round((partialValue / totalValue) * 100);
}

export function toLocaleFixed(number: number, n: number = 2) {
  return number.toLocaleString(undefined, { minimumFractionDigits: n, maximumFractionDigits: n });
}

export function onlyPositiveInteger(value: string) {
  return /^\d*$/.test(value);
}

export function onlyWhitespace(string: string) {
  return /^\s*$/.test(string);
}
