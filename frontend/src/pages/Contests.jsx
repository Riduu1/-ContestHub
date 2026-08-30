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
        contest.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesPlatform =
        platform === 'all' ||
        contest.platform === platform

      const matchesStatus =
        status === 'all' ||
        contest.status === status

      return (
        matchesSearch &&
        matchesPlatform &&
        matchesStatus
      )
    })
  }, [search, platform, status])

  const clearFilters = () => {
    setSearch('')
    setPlatform('all')
    setStatus('all')
  }

  const hasActiveFilters =
    search !== '' ||
    platform !== 'all' ||
    status !== 'all'

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 shadow-xl sm:px-10 sm:py-12">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-sm font-medium text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Contest Directory
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find your next challenge.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Browse competitive programming contests across
            multiple platforms and find the ones worth solving.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">
              Find contests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter the contest directory.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="self-start text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Search */}
          <div className="lg:col-span-6">
            <label
              htmlFor="search"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Search
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                id="search"
                type="text"
                placeholder="Search by contest name..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Platform */}
          <div className="lg:col-span-3">
            <label
              htmlFor="platform"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Platform
            </label>

            <select
              id="platform"
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">All Platforms</option>

              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="lg:col-span-3">
            <label
              htmlFor="status"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Results
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Contests
            </h2>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
            {filteredContests.length}{' '}
            {filteredContests.length === 1
              ? 'contest'
              : 'contests'}
          </div>
        </div>

        {filteredContests.length > 0 ? (
          <div className="space-y-4">
            {filteredContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                trackingStatus={
                  trackedContests[contest.id]
                }
                onTrackingChange={updateStatus}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              ⌕
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No contests found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find any contests matching your
              current search and filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Contests