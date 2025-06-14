import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

function Admin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Admin Login</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter Admin Name"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded pr-10"
              />
              <span
                className="absolute top-2.5 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={30} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Only authorized admin users are allowed
          </p>
        </div>
      </div>
    </>
  );
}

export default Admin;
