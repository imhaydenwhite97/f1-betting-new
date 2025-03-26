export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to F1 Betting Platform</h1>
        <p className="text-xl mb-8">
          A race-by-race betting platform where you can invite friends to private wagers and bet on placement of F1 racers.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Create Private Wagers</h2>
            <p>Invite friends to join your private betting groups and compete against each other.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Bet on F1 Races</h2>
            <p>Place bets on driver positions, fastest laps, and DNFs for each race of the season.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Track Your Performance</h2>
            <p>See your standings on the leaderboard and review your betting history.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
