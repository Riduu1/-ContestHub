const STORAGE_KEY = 'contesthub-tracked-contests'

export function getTrackedContests() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return {}
  }

  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

export function saveTrackedContests(trackedContests) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trackedContests),
  )
}