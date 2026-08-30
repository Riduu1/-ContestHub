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

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-600">
          Personal Tracking
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          My Contests
        </h1>

        <p className="mt-2 text-gray-600">
          Keep track of contests you are interested in,
          registered for, or participated in.
        </p>
      </section>

      {tracked.length > 0 ? (
        <section className="space-y-4">
          {tracked.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              trackingStatus={trackedContests[contest.id]}
              onTrackingChange={updateStatus}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No tracked contests
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Go to the contests page and track a contest to see
            it here.
          </p>
        </section>
      )}
    </div>
  )
}

export default MyContests