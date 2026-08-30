import { Link } from 'react-router-dom'

function ContestCard({
  contest,
  trackingStatus,
  onTrackingChange,
}) {
  const statusOptions = [
    'interested',
    'registered',
    'participated',
    'missed',
  ]

  const platformStyles = {
    Codeforces: 'bg-blue-50 text-blue-700 ring-blue-600/10',
    AtCoder: 'bg-slate-100 text-slate-700 ring-slate-500/10',
    CodeChef: 'bg-orange-50 text-orange-700 ring-orange-600/10',
    LeetCode: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  }

  const platformStyle =
    platformStyles[contest.platform] ||
    'bg-indigo-50 text-indigo-700 ring-indigo-600/10'

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-6">
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Contest information */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {contest.name}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${platformStyle}`}
            >
              {contest.platform}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">◷</span>
              {new Date(contest.start_time).toLocaleString()}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">◴</span>
              {contest.duration_minutes} min
            </span>

            {contest.category && (
              <span className="inline-flex items-center gap-1.5">
                <span className="text-base">◆</span>
                {contest.category}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
          <select
            value={trackingStatus || ''}
            onChange={(event) =>
              onTrackingChange(
                contest.id,
                event.target.value,
              )
            }
            className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Track contest</option>

            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <Link
            to={`/contests/${contest.id}`}
            className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            View Details
            <span className="ml-2 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ContestCard