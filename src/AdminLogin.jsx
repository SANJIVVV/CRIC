import backgroundImage from './assets/bg.jpg'; 

function AdminLogin() {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="bg-black bg-opacity-70 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full transition-transform duration-300 hover:scale-[1.01] border border-green-400">
          <h2 className="text-3xl font-extrabold text-center text-green-400 mb-6">
            Admin Login
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Admin Name
              </label>
              <input
                type="text"
                placeholder="Enter Admin Name"
                className="w-full px-4 py-2 border border-gray-500 bg-black bg-opacity-40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-500 bg-black bg-opacity-40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-gray-300">
            Only authorized admin users are allowed.
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
