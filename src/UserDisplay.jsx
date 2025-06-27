import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

// RoleToggle component inside UserDisplay
const RoleToggle = ({ role, setRole }) => (
  <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm border border-gray-200">
    {["user", "team"].map((type) => (
      <button
        key={type}
        onClick={() => setRole(type)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${
          role === type
            ? "bg-emerald-400 text-white shadow"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        {type === "user" ? "User Login" : "Team Login"}
      </button>
    ))}
  </div>
);

// Table component inside UserDisplay
const UserTable = ({ users, columns, onDelete }) => (
  <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white mb-6">
    <table className="min-w-full text-sm text-gray-700 rounded-2xl">
      <thead className="bg-green-100 text-green-900">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-3 text-left font-semibold border border-gray-200"
            >
              {col.label}
            </th>
          ))}
          <th className="px-4 py-3 font-semibold text-left border border-gray-200">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-6 text-gray-500"
            >
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user, idx) => (
            <tr
              key={idx}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-green-50"}`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 border border-gray-200 font-sans"
                >
                  {col.key === "teamlogo" && user[col.key] ? (
                    <img
                      src={user[col.key]}
                      alt="Logo"
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                  ) : (
                    user[col.key] || "-"
                  )}
                </td>
              ))}
              <td className="px-4 py-3 border border-gray-200">
                <button
                  onClick={() => onDelete(user.email)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 hover:text-red-800 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// Full UserDisplay component
function UserDisplay() {
  const [role, setRole] = useState("user");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const dummyAllUsers = [
    { name: "godson", email: "godson@example.com", mobileno: "9876543210", role: "user" },
    { name: "hari", email: "hari@gmail.com", mobileno: "9056781288", role: "user" },
    { name: "Ramesh", email: "Ramesh@gmail.com", mobileno: "8058141778", role: "user" },
    { name: "vasu", email: "vasu@gamil.com", mobileno: "9789247332", role: "user" },
    { name: "maddy", email: "maddy@example.com", mobileno: "9876543211", role: "user" },
    {
      name: "Salem spartans",
      teamlogo: "/srh.jpeg",
      agegroup: "under-18",
      numberofplayers: 11,
      district: "Madurai",
      Role: "Team Captain",
      fullname: "Ram Kumar",
      email: "ram@example.com",
      mobileno: "9056781288",
      alternatemobileno: "9012345678",
      aadharnumber: "1234-5678-9012",
      role: "team",
    },
    {
      name: "idream tiruppur",
      teamlogo: "/csk.png",
      agegroup: "under-18",
      numberofplayers: 11,
      district: "Madurai",
      Role: "Team Captain",
      fullname: "vishnu",
      email: "vishnu@example.com",
      mobileno: "8508144423",
      alternatemobileno: "9012345678",
      aadharnumber: "1234-5678-9012",
      role: "team",
    },
    {
      name: "lyca covai kings",
      teamlogo: "/mi.jpg",
      agegroup: "under-18",
      numberofplayers: 11,
      district: "Madurai",
      Role: "Team Captain",
      fullname: "manish dev",
      email: "manish@example.com",
      mobileno: "9876543215",
      alternatemobileno: "9012345678",
      aadharnumber: "1234-5678-9012",
      role: "team",
    },
  ];

  useEffect(() => {
    const filtered = dummyAllUsers.filter((u) => u.role === role);
    setUsers(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed === "") {
      setSearchResults([]);
      return;
    }
    setSearchSubmitted(true);
    const targetFields =
      role === "user"
        ? ["name", "email", "mobileno"]
        : ["name", "fullname", "email", "mobileno", "district"];
    const results = users.filter((user) =>
      targetFields.some((field) => user[field]?.toLowerCase().includes(trimmed))
    );
    setSearchResults(results);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchSubmitted(false);
  };

  const handleDelete = (emailToDelete) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.email !== emailToDelete));
      setSearchResults((prev) => prev.filter((u) => u.email !== emailToDelete));
    }
  };

  const userColumns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobileno" },
  ];

  const teamColumns = [
    { label: "Team Name", key: "name" },
    { label: "Team Logo", key: "teamlogo" },
    { label: "Age Group", key: "agegroup" },
    { label: "Number of Players", key: "numberofplayers" },
    { label: "District", key: "district" },
    { label: "Captain/Manager Role", key: "Role" },
    { label: "Full Name", key: "fullname" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobileno" },
    { label: "Alternate Mobile", key: "alternatemobileno" },
    { label: "Aadhar Number", key: "aadharnumber" },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search user..."
            className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-emerald-400 text-white rounded-md hover:bg-emerald-600 transition"
          >
            Search
          </button>
          <button
            onClick={handleClearSearch}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-green-700 flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-green-600" />
          Users Management
        </h2>

        <RoleToggle
          role={role}
          setRole={(newRole) => {
            setRole(newRole);
            setSearchTerm("");
            setSearchResults([]);
            setSearchSubmitted(false);
          }}
        />
      </div>

      {searchSubmitted && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-center text-green-600 mb-4">
            Search Results
          </h3>
          <UserTable
            users={searchResults}
            columns={role === "team" ? teamColumns : userColumns}
            onDelete={handleDelete}
          />
        </div>
      )}

      <UserTable
        users={users}
        columns={role === "team" ? teamColumns : userColumns}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default UserDisplay;
