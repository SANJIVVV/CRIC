import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Features from './Features';
import Footer from './Footer';
import Header from './Header';
import Admin from "./Admin";
import TeamLogin from "./TeamLogin";
import Register from "./Register";
import AdminPanel from "./AdminPanel";
import CreateTournament from "./CreateTournament";
import ManageTournament from "./ManageTournament";
import UserDisplay from "./UserDisplay";
import TournamentDashboard from "./TournamentDashboard";
import EnquiryForm from "./EnquiryForm";
import TeamManagement from "./TeamManagement";
import EnquiryList from "./EnquiryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Features /><Footer /></>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<TeamLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/manage-tournament" element={<ManageTournament />} />
        <Route path="/TournamentDashboard" element={<TournamentDashboard />} />
        <Route path="/userdisplay" element={<UserDisplay />} />
        <Route path="/Enquiryform" element={<EnquiryForm />} />
        <Route path="/enquirylist" element={<EnquiryList/>} />
        <Route path="/TeamManagement" element={<TeamManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
