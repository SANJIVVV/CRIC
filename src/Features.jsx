import { useNavigate } from "react-router-dom";

const features = [
  { title: "Live Matches" },
  { title: "Team Registrations" },
  { title: "Match Schedules" },
  { title: "Player Stats" },
];

const matches = [
  { team1: "MI", team2: "GT", date: "June 10", time: "3:00 PM" },
  { team1: "RCB", team2: "CSK", date: "June 12", time: "5:30 PM" },
];

function Features() {
  const navigate = useNavigate();

  const handleFeatureClick = (title) => {
    if (title === "Team Registrations") {
      navigate("/register");
    }
  };

  return (
    <>
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl mb-8 font-bold text-green-700">Key Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg hover:shadow-xl transition"
            >
              <button
                onClick={() => handleFeatureClick(feature.title)}
                className="text-xl font-semibold"
              >
                {feature.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl mb-8 font-bold text-center text-green-700">
          Upcoming Matches
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-white shadow p-4 rounded-md flex justify-between items-center"
            >
              <div>
                {match.team1} vs {match.team2}
              </div>
              <div>
                {match.date} | {match.time}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Features;
