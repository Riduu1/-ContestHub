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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {contest.name}
            </h3>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {contest.platform}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            <span>
              {new Date(contest.start_time).toLocaleString()}
            </span>

            <span>
              {contest.duration_minutes} minutes
            </span>

            {contest.category && (
              <span>{contest.category}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={trackingStatus || ''}
            onChange={(event) =>
              onTrackingChange(
                contest.id,
                event.target.value,
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContestCard