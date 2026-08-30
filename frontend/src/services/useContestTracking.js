import { useState } from 'react'
import {
  getTrackedContests,
  saveTrackedContests,
} from './tracking'

function useContestTracking() {
  const [trackedContests, setTrackedContests] = useState(
    getTrackedContests,
  )

  const updateStatus = (contestId, status) => {
    const updated = {
      ...trackedContests,
      [contestId]: status,
    }

    setTrackedContests(updated)
    saveTrackedContests(updated)
  }

  const removeTracking = (contestId) => {
    const updated = { ...trackedContests }

    delete updated[contestId]

    setTrackedContests(updated)
    saveTrackedContests(updated)
  }

  return {
    trackedContests,
    updateStatus,
    removeTracking,
  }
}

export default useContestTracking