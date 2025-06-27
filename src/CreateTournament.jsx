function CreateTournament() {
  return (
      <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{
        backgroundImage: "url('/std.jpg')", 
      }}
    >
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-6 tracking-wide font-sans">
  Create Cricket Tournament
</h2>


        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["name", "Tournament Name"],
            ["location", "Location"],
            ["startDate", "Start Date"],
            ["endDate", "End Date"],
            ["teamCount", "Number of Teams"],
            ["organizer", "Organizer"],
            ["prizePool", "Prize Pool"],
            ["registrationFee", "Registration Fee"],
            ["contactEmail", "Contact Email"],
          ].map(([name, label]) => (
            <div className="flex flex-col" key={name}>
              <label className="text-sm text-gray-600 font-semibold mb-1">{label}</label>
              <input
                type={name.includes("Date") ? "date" : name === "contactEmail" ? "email" : "text"}
                className="border border-green-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-1">Overs Type</label>
            <select className="border border-green-400 p-3 rounded-xl">
              <option value="5">5 Overs</option>
              <option value="10">10 Overs</option>
              <option value="20">20 Overs</option>
              <option value="50">50 Overs</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-1">Ball Type</label>
            <select className="border border-green-400 p-3 rounded-xl">
              <option value="Tennis">Tennis Ball</option>
              <option value="Leather">Leather Ball</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-1">Rules / Guidelines</label>
            <textarea rows="4" className="border border-green-400 p-3 rounded-xl"></textarea>
          </div>

          <button
            type="button"
            className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition text-xl font-semibold"
          >
            Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTournament;
