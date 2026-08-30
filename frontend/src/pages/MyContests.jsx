import ContestCard from '../components/ContestCard'
import contests from '../data/contests'
import useContestTracking from '../services/useContestTracking'

function MyContests() {
  const {
    trackedContests,
    updateStatus,
  } = useContestTracking()

  const tracked = contests.filter(
    (contest) => trackedContests[contest.id],
  )

  const statusGroups = [
    {
      key: 'interested',
      label: 'Interested',
      description: 'Contests you want to join',
      icon: '☆',
      style: 'bg-blue-50 text-blue-700',
    },
    {
      key: 'registered',
      label: 'Registered',
      description: 'Contests you signed up for',
      icon: '✓',
      style: 'bg-violet-50 text-violet-700',
    },
    {
      key: 'participated',
      label: 'Participated',
      description: 'Contests you completed',
      icon: '◆',
      style: 'bg-emerald-50 text-emerald-700',
    },
    {
      key: 'missed',
      label: 'Missed',
      description: 'Contests you missed',
      icon: '×',
      style: 'bg-red-50 text-red-700',
    },
  ]

  const getContestsByStatus = (status) =>
    tracked.filter(
      (contest) => trackedContests[contest.id] === status,
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
            Personal Tracking
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your contest journey.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Keep your upcoming challenges, registrations, and
            participation history organized in one place.
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statusGroups.map((group) => {
          const count = getContestsByStatus(group.key).length

          return (
            <div
              key={group.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {group.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {count}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${group.style}`}
                >
                  {group.icon}
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {group.description}
              </p>
            </div>
          )
        })}
      </section>

      {/* Tracked contests */}
      {tracked.length > 0 ? (
        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />

                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Your List
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Tracked Contests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the contests you are following.
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
              {tracked.length}{' '}
              {tracked.length === 1
                ? 'contest'
                : 'contests'}
            </div>
          </div>

          <div className="space-y-4">
            {tracked.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                trackingStatus={trackedContests[contest.id]}
                onTrackingChange={updateStatus}
              />
            ))}
          </div>
        </section>
      ) : (
        /* Empty state */
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
            ☆
          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-900">
            Your contest list is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Start building your contest schedule by marking
            contests as interested, registered, or participated.
          </p>

          <a
            href="/contests"
            className="mt-6 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Browse Contests
            <span className="ml-2">→</span>
          </a>
        </section>
      )}
    </div>
  )
}

export default MyContests