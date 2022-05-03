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

export function count_days(start_datetime: number, end_datetime: number) {
  const timestamp_difference = end_datetime - start_datetime;
  if (timestamp_difference <= 0) return 0;

  const secs_per_day = 24 * 60 * 60;

  return Math.floor(timestamp_difference / secs_per_day);
}

export function calculate_percentage(partialValue: number, totalValue: number) {
  return Math.round((partialValue / totalValue) * 100);
}

export function onlyPositiveInteger(value: string) {
  return /^\d*$/.test(value);
}

export function onlyWhitespace(string: string) {
  return /^\s*$/.test(string);
}
