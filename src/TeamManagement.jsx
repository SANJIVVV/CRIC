import { useState } from "react"; 
import { X,CheckCircle,XCircle } from "lucide-react";

const dummyRequests = [
  {
    id: 1,
    teamName: "Salem Spartans",
    teamLogo: "/mi.jpg",
    district: "Salem",
    tournament: "State Level U-18 Tournament",
    location: "Chennai",
    startDate: "2025-07-10",
    teamsRequired: 2,
    status: "Open",
    captainName: "Raj Kumar",
    managerName: "Suresh Iyer",
    email: "rajkumar@example.com",
    phone: "9876543210",
    alternatePhone: "9123456789",
    aadharNumber: "1234-5678-9012",
    excelSheetLink: "https://1drv.ms/x/c/8edba1aded591c55/EdL-aP6R3MlMsgISrr0M4wwBymiwJYilpnnckNrmsHN-gA?e=DZFv0h",
    submissionDate: "2025-06-20T10:00:00",
  },
  {
    id: 2,
    teamName: "Tiruppur Titans",
    teamLogo: "/srh.jpeg",
    district: "Tiruppur",
    tournament: "District Level U-16 Championship",
    location: "Tiruppur",
    startDate: "2025-07-15",
    teamsRequired: 6,
    status: "Open",
    captainName: "Vishnu Vel",
    managerName: "Arun S",
    email: "vishnu@example.com",
    phone: "9823456123",
    alternatePhone: "9012345678",
    aadharNumber: "5678-9012-3456",
    excelSheetLink: "https://1drv.ms/x/c/8edba1aded591c55/EdL-aP6R3MlMsgISrr0M4wwBymiwJYilpnnckNrmsHN-gA?e=DZFv0h",
    players: ["Santhosh Kumar", "Anand R", "Yogesh P", "Hari V"],
    submissionDate: "2025-06-22T09:30:00",
  },
  {
    id: 3,
    teamName: "Madurai Warriors",
    teamLogo: "/csk.png",
    district: "Madurai",
    tournament: "State Level U-18 Tournament",
    location: "Madurai",
    startDate: "2025-07-10",
    teamsRequired: 8,
    status: "Open",
    captainName: "Arjun M",
    managerName: "Karthik Iyer",
    email: "arjun@example.com",
    phone: "8899776655",
    alternatePhone: "9988776655",
    aadharNumber: "9999-8888-7777",
    excelSheetLink: "https://docs.google.com/spreadsheets/d/3example9999abcd",
    players: ["Sathish", "Ragul", "Kavin", "Deepak"],
    submissionDate: "2025-06-23T08:45:00",
  },
  {
    id: 4,
    teamName: "Tiruppur Titans",
    teamLogo: "/srh.jpeg",
    district: "Tiruppur",
    tournament: "State Level U-18 Tournament",
    location: "Tiruppur",
    startDate: "2025-07-15",
    teamsRequired: 6,
    status: "Open",
    captainName: "Vishnu Vel",
    managerName: "Arun S",
    email: "vishnu@example.com",
    phone: "9823456123",
    alternatePhone: "9012345678",
    aadharNumber: "5678-9012-3456",
    excelSheetLink: "https://docs.google.com/spreadsheets/d/2example5678abcd",
    players: ["Santhosh Kumar", "Anand R", "Yogesh P", "Hari V"],
    submissionDate: "2025-06-22T09:30:00",
  }
];
function TeamManagement() {
  const [requests, setRequests] = useState(dummyRequests);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [rejectedTeams, setRejectedTeams] = useState([]);
  const [viewOnlyMode, setViewOnlyMode] = useState(false);
  const allTournaments = [...new Set(dummyRequests.map((r) => r.tournament))];

  const tournamentInfo = dummyRequests.find(
    (r) => r.tournament === selectedTournament
  );

  const filteredRequests = requests.filter(
    (r) => r.tournament === selectedTournament
  );

  const approved = approvedTeams.filter(
    (t) => t.tournament === selectedTournament
  );

  const rejected = rejectedTeams.filter(
    (t) => t.tournament === selectedTournament
  );

  const handleApprove = () => {
    if (!selectedTeam) return;
    const approvedCount = approvedTeams.filter(
    (team) => team.tournament === selectedTournament).length;

    if (approvedCount >= tournamentInfo.teamsRequired) {
    alert(`Approval limit reached! Only ${tournamentInfo.teamsRequired} teams allowed.`);
    return;
  }

    setApprovedTeams((prev) => [...prev, selectedTeam]);
    setRequests((prev) => prev.filter((t) => t.id !== selectedTeam.id));
    setSelectedTeam(null);
  };

  const handleReject = (team = selectedTeam) => {
  if (!team) return;
  const confirmReject = window.confirm("Are you sure you want to reject this team?");
  if (!confirmReject) return;
  setRejectedTeams((prev) => [...prev, team]);
  setRequests((prev) => prev.filter((t) => t.id !== team.id));
  setApprovedTeams((prev) => prev.filter((t) => t.id !== team.id));

  if (selectedTeam?.id === team.id) {
    setSelectedTeam(null);
  }
};

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 border-r border-transparent bg-gray-200 p-4 overflow-y-auto shadow-inner">
        <h2 className="text-lg font-bold text-green-700 mb-4">Leagues & Team request</h2>
        {allTournaments.map((tournament, index) => (
          <div key={index} className="mb-6">
            <button
              onClick={() => { setSelectedTournament(tournament);setSelectedTeam(null);setViewOnlyMode(false); }}
              className="w-full text-left text-sm font-semibold px-5 py-[30px] rounded-lg shadow-md border-2 transition-all duration-300 flex items-center gap-3 bg-gradient-to-r from-green-200 via-emerald-300 to-teal-300 text-green-900 border-emerald-400 hover:border-emerald-600 focus:ring-2 focus:ring-emerald-300"
            >
              <img src="/icon1.png" alt="Trophy Icon" className="w-8 h-8" />
              <span>{tournament}</span>
            </button>

            {selectedTournament === tournament && filteredRequests.length > 0 && (
              <div className="mt-2 ml-2 space-y-3">
                {filteredRequests.map((team) => (
                  <div
                    key={team.id}
                    className={`border-l-4 pl-3 pr-3 py-2 rounded-md cursor-pointer shadow-sm hover:bg-green-100 transition-all ${selectedTeam?.id === team.id ? "bg-green-200 border-green-600" : "bg-white border-gray-300"}`}
                    onClick={() => {setSelectedTeam(team);  setViewOnlyMode(false);} }
                  >
                    <div className="flex items-center gap-2">
                      <img src={team.teamLogo} alt="logo" className="w-9 h-9 rounded-full border shadow" />
                      <div>
                        <p className="text-sm font-bold text-green-800">{team.teamName}</p>
                        <p className="text-xs text-gray-500">{team.district}</p>
                        <p className="text-[11px] text-gray-400">Submitted: {new Date(team.submissionDate).toLocaleString()}</p>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedTeam ? (
          <div className="bg-white shadow-md rounded-lg p-8 border border-green-200">
            <div className="text-center">
              <button
             onClick={() => {setSelectedTeam(null); setViewOnlyMode(false);}} className="absolute top-10 right-10 p-2 text-gray-500 hover:text-red-500"title="Close" >
              <X className="w-9 h-9"/>
              </button>
              <h2 className="text-3xl font-bold mb-4 text-green-700">{selectedTeam.teamName}</h2>
              <img src={selectedTeam.teamLogo} alt="Team Logo" className="h-24 w-24 mx-auto rounded-full object-cover mb-6 border shadow" />
            </div>
            <div className="w-[450px] min-w-[400px] mx-auto">
              <div className="space-y-4 text-gray-700 text-[20px]">
                {["district", "captainName", "managerName", "email", "phone", "alternatePhone", "aadharNumber"].map((key) => (
                  <div key={key} className="flex gap-4">
                    <strong className="w-52 capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong>
                    <span>{selectedTeam[key]}</span>
                  </div>
                ))}
                <div className="flex gap-4">
                  <strong className="w-52">Submitted At:</strong>
                  <span>{new Date(selectedTeam.submissionDate).toLocaleString()}</span>
                </div>
                <div className="flex gap-4">
                  <strong className="w-52">Players Detail:</strong>
                  <a href={selectedTeam.excelSheetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Sheet</a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              {!viewOnlyMode && (
  <div className="mt-8 flex gap-4 justify-center">
    <button
      className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      onClick={handleApprove}
    >
      <CheckCircle className="w-5 h-5" /> Approve</button>
    <button className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleReject(selectedTeam)}
    > <XCircle className="w-5 h-5" />Reject
    </button>
  </div>
)}
           </div>
          </div>
        ) : (<div>
  {selectedTournament && tournamentInfo && (
    <div className="mb-6 border  border-transparent rounded-lg p-10 bg-gradient-to-r from-green-200 via-emerald-300 to-teal-300 ">
      <h2 className="text-3xl font-semibold text-center text-emerald-600 mb-8">
        {selectedTournament}
      </h2>
      <div className="flex justify-center text-gray-700 text-sm flex-wrap gap-10">

        <p className="bg-white px-4 py-2 rounded-full shadow text-green-700 font-medium"><strong>Location:</strong> {tournamentInfo.location}</p>
        <p  className="bg-white px-4 py-2 rounded-full shadow text-green-700 font-medium"><strong>Start Date:</strong> {tournamentInfo.startDate}</p>
        <p  className="bg-white px-4 py-2 rounded-full shadow text-green-700 font-medium"><strong>Teams Required:</strong> {tournamentInfo.teamsRequired}</p>
        <p  className="bg-white px-4 py-2 rounded-full shadow text-green-700 font-medium"><strong>Status:</strong> {tournamentInfo.status}</p>
      </div>
    </div>
  )}
    

  <div className="border border-transparent bg-gray-100 rounded-lg p-4   mb-10">
    <h3 className="text-2xl font-semibold  text-center text-green-400 mb-6">
     Approved Teams ({approved.length|| "0"}/{tournamentInfo?.teamsRequired || "-"})
    </h3>
    
    {approved.length > 0 ? (
      <div className="grid grid-cols-2 gap-6 px-4">
        {approved.map((team) => (
          <div
            key={team.id}
            className="flex items-center gap-4 p-4 bg-green-50 rounded-md border border-gray-300 shadow hover:bg-green-100"
          >
            <img
              src={team.teamLogo}
              alt="Team Logo"
              className="w-12 h-12 rounded-full border shadow"
            />
            <div className="flex-1">
              <p className="font-bold text-green-800">{team.teamName}</p>
              <p className="text-sm text-gray-500">{team.district}</p>
              <p className="text-xs text-gray-400">
                Submitted: {new Date(team.submissionDate).toLocaleString()}
              </p>
            </div>
            <button onClick={() => {  setSelectedTeam(team);setViewOnlyMode(true);}}
            className="px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded-2xl hover:bg-blue-600">Details</button>
            <button onClick={() => handleReject(team)}
            className="px-4 py-1 text-sm font-semibold bg-red-500 text-white rounded-2xl hover:bg-red-600"> Reject </button>
          </div>
        ))}
      </div>
    ) : (<p className="text-center text-gray-500">No teams approved yet.</p> )}
  </div>
  <div className="border border-transparent bg-gray-100 rounded-lg p-4">
    <h3 className="text-2xl font-semibold text-center text-red-400 mb-6 ">
      Rejected Teams
    </h3> 
    {rejected.length > 0 ? (
      <div className="grid grid-cols-2 gap-6 px-4">
        {rejected.map((team) => (
          <div
            key={team.id}
            className="flex items-center gap-4 p-4 bg-red-50 rounded-md border shadow hover:bg-red-100"
          >
            <img
              src={team.teamLogo} alt="Team Logo" className="w-12 h-12 rounded-full border shadow"
            />
            <div className="flex-1">
              <p className="font-bold text-red-800">{team.teamName}</p>
              <p className="text-sm text-gray-500">{team.district}</p>
              <p className="text-xs text-gray-400">
                Submitted: {new Date(team.submissionDate).toLocaleString()}
              </p>
            </div>
            <button
      onClick={() => {
        // Move team from rejected to approved
        const approvedCount = approvedTeams.filter(
          (t) => t.tournament === selectedTournament
        ).length;
        if (approvedCount >= tournamentInfo.teamsRequired) {
          alert(
            `Approval limit reached! Only ${tournamentInfo.teamsRequired} teams allowed.`
          );
          return;
        }
        setApprovedTeams((prev) => [...prev, team]);
        setRejectedTeams((prev) => prev.filter((t) => t.id !== team.id));
      }}
      className="px-4 py-1 text-sm font-medium bg-green-500 text-white rounded-2xl hover:bg-green-600"
    >
      Approve
    </button>
            <button onClick={() => {  setSelectedTeam(team);setViewOnlyMode(true);}}
            className="px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded-2xl hover:bg-blue-600"> Details</button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No teams rejected yet.</p>
    )}
  </div>
</div>
 )}
      </div>
    </div>
  );
}
export default TeamManagement;
