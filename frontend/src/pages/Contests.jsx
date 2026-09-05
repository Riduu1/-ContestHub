import { useEffect, useState } from 'react'
import ContestCard from '../components/ContestCard'
import { fetchContests } from '../services/api'
import useContestTracking from '../services/useContestTracking'

function Contests() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('all')
  const [status, setStatus] = useState('upcoming')

  const [contests, setContests] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const contestsPerPage = 100

  const { trackedContests, updateStatus } =
    useContestTracking()

  // Load contests from FastAPI
  useEffect(() => {
    async function loadContests() {
      try {
        setLoading(true)
        setError('')

        const data = await fetchContests({
          platform:
            platform === 'all' ? undefined : platform,
          status:
            status === 'all' ? undefined : status,
          search,
          limit: contestsPerPage,
          offset: (page - 1) * contestsPerPage,
        })

        setContests(data.contests || [])
        setTotal(data.total || 0)
      } catch (err) {
        console.error(err)
        setError(
          'Unable to load contests from the server.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadContests()
  }, [search, platform, status, page])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [search, platform, status])

  const clearFilters = () => {
    setSearch('')
    setPlatform('all')
    setStatus('all')
    setPage(1)
  }

  const hasActiveFilters =
    search !== '' ||
    platform !== 'all' ||
    status !== 'all'

  const totalPages = Math.ceil(
    total / contestsPerPage
  )

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

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

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
              <option value="Codeforces">Codeforces</option>
              <option value="CodeChef">CodeChef</option>
              <option value="Toph">Toph</option>
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
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
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

          {!loading && (
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
              {contests.length}{' '}
              {contests.length === 1
                ? 'contest'
                : 'contests'}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading contests...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && contests.length > 0 && (
          <div className="space-y-4">
            {contests.map((contest) => (
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
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                setPage((current) => current - 1)
              }
              disabled={page === 1}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  page === pageNumber
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setPage((current) => current + 1)
              }
              disabled={page === totalPages}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && contests.length === 0 && !error && (
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