export function validProgress(progress: number | undefined) {
  if (!progress || progress < 0) {
    return 0
  }
  if (progress > 100) {
    return 100
  }
  return progress
}
