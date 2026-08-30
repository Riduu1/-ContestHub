import { useMemo, useState } from 'react'
import ContestCard from '../components/ContestCard'
import contests from '../data/contests'
import useContestTracking from '../services/useContestTracking'

function Contests() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('all')
  const [status, setStatus] = useState('all')
  const {
  trackedContests,
  updateStatus,
} = useContestTracking()

  const platforms = [
    ...new Set(contests.map((contest) => contest.platform)),
  ]

  const filteredContests = useMemo(() => {
    return contests.filter((contest) => {
      const matchesSearch =
        contest.name.toLowerCase().includes(search.toLowerCase())

      const matchesPlatform =
        platform === 'all' || contest.platform === platform

      const matchesStatus =
        status === 'all' || contest.status === status

      return (
        matchesSearch &&
        matchesPlatform &&
        matchesStatus
      )
    })
  }, [search, platform, status])

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-600">
          Browse
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          All Contests
        </h1>

        <p className="mt-2 text-gray-600">
          Find competitive programming contests across
          multiple platforms.
        </p>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search contests..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="platform"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Platform
            </label>

            <select
              id="platform"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Platforms</option>

              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Contests
          </h2>

          <span className="text-sm text-gray-500">
            {filteredContests.length} result
            {filteredContests.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredContests.length > 0 ? (
          <div className="space-y-4">
            {filteredContests.map((contest) => (
             <ContestCard
  key={contest.id}
  contest={contest}
  trackingStatus={trackedContests[contest.id]}
  onTrackingChange={updateStatus}
/>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No contests found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Contests