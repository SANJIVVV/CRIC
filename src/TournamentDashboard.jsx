import { useState } from "react";
import ScheduleManager from "./ScheduleManager";

const tournaments = [
  { id: 1, name: "Champions Cup" },
  { id: 2, name: "Interstate League" },
  { id: 3, name: "Summer Trophy" },
  { id: 4, name: "Legends Trophy" },
  { id: 5, name: "Winter Invitational" },
  { id: 6, name: "Pro League Finals" },
  { id: 7, name: "Rising Stars Championship" },
  { id: 8, name: "National Sports Fest" },
  { id: 9, name: "Ultimate Showdown" }
];

const TournamentDashboard = () => {
  const [selectedTournament, setSelectedTournament] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100 p-8 font-sans">
      {!selectedTournament ? (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-green-800 drop-shadow-sm">
            🏆 Select a Tournament
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                onClick={() => setSelectedTournament(tournament)}
                className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-green-200 hover:border-green-400 transition transform hover:scale-105 duration-200 text-center"
              >
                <h2 className="text-2xl font-semibold text-green-700">
                  {tournament.name}
                </h2>
                <p className="text-sm text-green-500 mt-2">Click to manage schedule</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedTournament(null)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to Tournaments</span>
          </button>
          <ScheduleManager tournamentId={selectedTournament.name} />
        </div>
      )}
    </div>
  );
};

export default TournamentDashboard;