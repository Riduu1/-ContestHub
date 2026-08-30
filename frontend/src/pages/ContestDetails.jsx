import { Link, useParams } from 'react-router-dom'
import contests from '../data/contests'

function ContestDetails() {
  const { id } = useParams()

  const contest = contests.find(
    (item) => item.id === Number(id),
  )

  if (!contest) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Contest Not Found
        </h1>

        <p className="text-gray-600">
          The contest you are looking for does not exist.
        </p>

        <Link
          to="/contests"
          className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to Contests
        </Link>
      </div>
    )
  }

  const startTime = new Date(contest.start_time)

  return (
    <div className="space-y-8">
      <Link
        to="/contests"
        className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        ← Back to Contests
      </Link>

      <section>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {contest.name}
          </h1>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {contest.platform}
          </span>
        </div>

        {contest.category && (
          <p className="mt-2 text-gray-500">
            {contest.category}
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Start Time
          </p>

          <p className="mt-2 font-semibold text-gray-900">
            {startTime.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Duration
          </p>

          <p className="mt-2 font-semibold text-gray-900">
            {contest.duration_minutes} minutes
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Category
          </p>

          <p className="mt-2 font-semibold text-gray-900">
            {contest.category || 'Not specified'}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Status
          </p>

          <p className="mt-2 font-semibold capitalize text-gray-900">
            {contest.status}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Contest Information
        </h2>

        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-500">
              Source ID
            </dt>

            <dd className="text-gray-900">
              {contest.source_id}
            </dd>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-500">
              Contest URL
            </dt>

            <dd>
              <a
                href={contest.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {contest.url}
              </a>
            </dd>
          </div>
        </dl>

        <a
          href={contest.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Visit Contest
        </a>
      </section>
    </div>
  )
}

export default ContestDetails