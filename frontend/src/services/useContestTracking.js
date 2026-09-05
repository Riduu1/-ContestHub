import { useEffect, useState } from 'react'
import {
  getTrackedContests,
  saveTrackedContests,
} from './tracking'

function useContestTracking() {
  const [trackedContests, setTrackedContests] = useState(
    getTrackedContests()
  )

  // Keep tracking state synchronized between pages/components
  useEffect(() => {
    const handleTrackingChange = () => {
      setTrackedContests(getTrackedContests())
    }

    window.addEventListener(
      'contest-tracking-updated',
      handleTrackingChange
    )

    return () => {
      window.removeEventListener(
        'contest-tracking-updated',
        handleTrackingChange
      )
    }
  }, [])

  const updateStatus = (contestId, status) => {
    const updated = {
      ...trackedContests,
      [contestId]: status,
    }

    setTrackedContests(updated)
    saveTrackedContests(updated)

    window.dispatchEvent(
      new Event('contest-tracking-updated')
    )
  }

  const removeTracking = (contestId) => {
    const updated = { ...trackedContests }

    delete updated[contestId]

    setTrackedContests(updated)
    saveTrackedContests(updated)

    window.dispatchEvent(
      new Event('contest-tracking-updated')
    )
  }

  return {
    trackedContests,
    updateStatus,
    removeTracking,
  }
}

export default useContestTracking