import { Link } from 'react-router-dom'

function ContestCard({ contest }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

        <Link
          to={`/contests/${contest.id}`}
          className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default ContestCard