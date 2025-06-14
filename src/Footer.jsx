import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <section className="text-center py-12 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <h2 className="text-4xl font-bold mb-3"> Get Started Today!</h2>
        <p className="mb-6 text-lg">Register your team or login to follow the tournament live.</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-green-700 px-6 py-2 rounded shadow hover:bg-gray-100 transition transform hover:scale-105 font-semibold">Register</Link>
          <Link to="/login" className="bg-blue-500 px-6 py-2 text-white rounded shadow hover:bg-blue-600 transition transform hover:scale-105 font-semibold">Login</Link>
        </div>
      </section>

      <section className="bg-gray-800 text-white p-6 text-center">
        <p className="text-lg"> Are you an <strong>Organizer</strong>?</p>
        <Link to="/admin" className="mt-3 inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105">
          Login to Admin Panel
        </Link>
      </section>
      <footer className="bg-gray-800 text-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          <div>
            <h3 className="text-lg font-semibold mb-3"> Contact Us</h3>
            <ul className="space-y-1">
              <li>Email: <a href="mailto:cicsync@gmail.com" className="hover:text-blue-400">cicsync@gmail.com</a></li>
              <li>Phone: +91 90438 72476</li>
              <li>Address: PSG Tech, Coimbatore</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3"> Privacy</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3"> Follow Us</h3>
            <div className="flex space-x-6 text-lg">
              <a href="#" className="hover:text-pink-400 transition"> Instagram</a>
              <a href="#" className="hover:text-blue-500 transition"> Facebook</a>
              <a href="#" className="hover:text-sky-400 transition"> Twitter</a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs mt-8 text-gray-500">
          © 2025 <span className="font-bold text-white">CricSync</span>. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
