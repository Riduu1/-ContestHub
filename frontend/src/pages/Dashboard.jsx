import ContestCard from '../components/ContestCard'
import SummaryCard from '../components/SummaryCard'
import contests from '../data/contests'
import useContestTracking from '../services/useContestTracking'

function Dashboard() {
  const { trackedContests, updateStatus } = useContestTracking()

  const upcomingContests = contests.filter(
    (contest) => contest.status === 'upcoming',
  )

  const platforms = new Set(
    contests.map((contest) => contest.platform),
  )

  const trackedCount = Object.keys(trackedContests).length

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 shadow-xl sm:px-10 sm:py-14">
        {/* Decorative background */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-sm font-medium text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Competitive Programming
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Never miss your
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              next contest.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Discover, track, and organize competitive programming
            contests from multiple platforms — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/contests"
              className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              Explore Contests
              <span className="ml-2">→</span>
            </a>

            <a
              href="/my-contests"
              className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              My Contests
            </a>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Upcoming Contests
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {upcomingContests.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
              📅
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-blue-600">
            Scheduled ahead
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Today's Contests
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                0
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
              ⚡
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-violet-600">
            Happening today
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Tracked Contests
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {trackedCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
              ✓
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-emerald-600">
            In your list
          </p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Platforms
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {platforms.size}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">
              ◈
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-orange-600">
            Contest sources
          </p>
        </div>
      </section>

      {/* Upcoming Contests */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Schedule
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Upcoming Contests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Stay ahead of the competition and plan your next challenge.
            </p>
          </div>

          <a
            href="/contests"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all contests →
          </a>
        </div>

        <div className="space-y-4">
          {upcomingContests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              trackingStatus={trackedContests[contest.id]}
              onTrackingChange={updateStatus}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard