export function handleUnknownError(error: unknown) {
  return new Error('An unexpected error has occured. Please try again later.');
}
