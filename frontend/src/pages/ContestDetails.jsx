import { Link, useParams } from 'react-router-dom'
import contests from '../data/contests'

function ContestDetails() {
  const { id } = useParams()

  const contest = contests.find(
    (item) => item.id === Number(id),
  )

  if (!contest) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
            !
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Contest Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            The contest you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            to="/contests"
            className="mt-7 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            ← Back to Contests
          </Link>
        </div>
      </div>
    )
  }

  const startTime = new Date(contest.start_time)

  const platformStyles = {
    Codeforces: 'bg-blue-50 text-blue-700 ring-blue-600/10',
    AtCoder: 'bg-slate-100 text-slate-700 ring-slate-500/10',
    CodeChef: 'bg-orange-50 text-orange-700 ring-orange-600/10',
    LeetCode: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  }

  const platformStyle =
    platformStyles[contest.platform] ||
    'bg-indigo-50 text-indigo-700 ring-indigo-600/10'

  const statusStyles = {
    upcoming: 'bg-emerald-50 text-emerald-700',
    past: 'bg-slate-100 text-slate-600',
  }

  const statusStyle =
    statusStyles[contest.status] ||
    'bg-slate-100 text-slate-600'

  return (
    <div className="space-y-8">
      {/* Back navigation */}
      <Link
        to="/contests"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <span>←</span>
        Back to Contests
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-9 shadow-xl sm:px-10 sm:py-12">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${platformStyle}`}
            >
              {contest.platform}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusStyle}`}
            >
              {contest.status}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {contest.name}
          </h1>

          {contest.category && (
            <p className="mt-4 text-sm font-medium text-slate-300">
              {contest.category}
            </p>
          )}
        </div>
      </section>

      {/* Key information */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
              ◷
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Start Time
            </p>
          </div>

          <p className="mt-4 text-sm font-bold leading-6 text-slate-900">
            {startTime.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg">
              ◴
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Duration
            </p>
          </div>

          <p className="mt-4 text-lg font-bold text-slate-900">
            {contest.duration_minutes} minutes
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg">
              ◆
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Category
            </p>
          </div>

          <p className="mt-4 text-lg font-bold text-slate-900">
            {contest.category || 'Not specified'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
              ●
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </p>
          </div>

          <p className="mt-4 text-lg font-bold capitalize text-slate-900">
            {contest.status}
          </p>
        </div>
      </section>

      {/* Contest information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="border-b border-slate-100 pb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contest Information
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            About this contest
          </h2>
        </div>

        <dl className="divide-y divide-slate-100">
          <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm font-medium text-slate-500">
              Platform
            </dt>

            <dd className="text-sm font-semibold text-slate-900">
              {contest.platform}
            </dd>
          </div>

          <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm font-medium text-slate-500">
              Source ID
            </dt>

            <dd className="font-mono text-sm font-medium text-slate-700">
              {contest.source_id}
            </dd>
          </div>

          <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm font-medium text-slate-500">
              Contest URL
            </dt>

            <dd className="max-w-xl truncate text-sm text-slate-700">
              {contest.url}
            </dd>
          </div>
        </dl>

        {/* CTA */}
        <div className="mt-2 rounded-2xl bg-slate-50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Ready to compete?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Open the original platform and participate in
                the contest.
              </p>
            </div>

            <a
              href={contest.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Visit Contest
              <span className="ml-2">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContestDetails