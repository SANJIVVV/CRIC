import { useState } from "react";

function ManageTournament() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "PSG Premier League",
      location: "Coimbatore",
      date: "2025-07-10",
      teams: 8,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "City Super Cup",
      location: "Chennai",
      date: "2025-06-30",
      teams: 6,
      status: "Ongoing",
    },
  ]);

  const [editTournament, setEditTournament] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tournament?");
    if (confirmDelete) {
      setTournaments(tournaments.filter((t) => t.id !== id));
    }
  };

  const handleEditClick = (tournament) => {
    if (tournament.status === "Ongoing") {
      alert("You can only edit upcoming tournaments.");
      return;
    }
    setEditTournament(tournament);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTournament((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTournaments((prev) =>
      prev.map((t) => (t.id === editTournament.id ? editTournament : t))
    );
    setEditTournament(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-6 py-12">
      <h2 className="text-4xl font-bold text-green-800 text-center mb-10 font-serif">
        Manage Cricket Tournaments
      </h2>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Teams</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.id} className="border-b hover:bg-green-50">
                <td className="py-3 px-4">{tournament.name}</td>
                <td className="py-3 px-4">{tournament.location}</td>
                <td className="py-3 px-4">{tournament.date}</td>
                <td className="py-3 px-4">{tournament.teams}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tournament.status === "Upcoming"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {tournament.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEditClick(tournament)}
                    className={`px-3 py-1 text-sm rounded ${
                      tournament.status === "Upcoming"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={tournament.status !== "Upcoming"}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tournament.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTournament && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-green-700 mb-6 text-center font-serif">
            Edit Tournament
          </h3>
          <form
            onSubmit={handleEditSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[["name", "Tournament Name"], ["location", "Location"], ["date", "Date"], ["teams", "Number of Teams"]].map(
              ([field, label]) => (
                <div className="flex flex-col" key={field}>
                  <label className="text-sm text-gray-600 font-semibold mb-1">
                    {label}
                  </label>
                  <input
                    type={field === "date" ? "date" : "text"}
                    name={field}
                    value={editTournament[field]}
                    onChange={handleEditChange}
                    className="border border-green-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )
            )}

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-semibold mb-1">
                Status
              </label>
              <select
                name="status"
                value={editTournament.status}
                onChange={handleEditChange}
                className="border border-green-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition text-xl font-semibold"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageTournament;
