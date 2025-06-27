
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Users,
  ListOrdered,
  PencilRuler,
  Settings,
  ClipboardList,
  PhoneCall,
} from "lucide-react";

const features = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Create Tournament", icon: Trophy, route: "/create-tournament" },
  { title: "Manage Tournament", icon: ClipboardList, route: "/manage-tournament" },
  { title: "Match Schedules", icon: Calendar , route: "/TournamentDashboard"},
  { title: "Team Management", icon: Users , route: "/TeamManagement"},
  { title: "Score Entry", icon: PencilRuler },
  { title: "User Display", icon: ListOrdered, route: "/userdisplay"},
  { title: "Enquiry", icon: PhoneCall, route: "/enquirylist"},
  { title: "Settings", icon: Settings },
];

function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-8 py-12 bg-gradient-to-br from-green-50 to-green-100">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Admin Control Panel
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={() => feature.route && navigate(feature.route)}
              className="bg-white border border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex items-center space-x-5 cursor-pointer hover:bg-green-50"
            >
              <div className="p-4 bg-green-100 text-green-700 rounded-full">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-green-800">
                {feature.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPanel;
