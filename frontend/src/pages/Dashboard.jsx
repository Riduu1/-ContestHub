import ContestCard from '../components/ContestCard'
import SummaryCard from '../components/SummaryCard'
import contests from '../data/contests'

function Dashboard() {
  const upcomingContests = contests.filter(
    (contest) => contest.status === 'upcoming',
  )

  const platforms = new Set(
    contests.map((contest) => contest.platform),
  )

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-600">
          Competitive Programming
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          ContestHub
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Track competitive programming contests from multiple
          platforms in one place.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Upcoming Contests"
          value={upcomingContests.length}
        />

        <SummaryCard
          label="Today's Contests"
          value={0}
        />

        <SummaryCard
          label="Tracked Contests"
          value={0}
        />

        <SummaryCard
          label="Platforms"
          value={platforms.size}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Contests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently scheduled programming contests.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingContests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard