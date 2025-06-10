function Footer(){
    return(

        <>
    <section className="text-center py-10 bg-green-700 text-white">
      <h2 className="text-3xl font-semibold mb-4">Get Started Today!</h2>
      <p className="mb-6">Register your team or login to follow the tournament live.</p>
      <div className="space-x-4">
        <a href="#register" className="bg-white text-green-700 px-6 py-2 rounded shadow hover:bg-gray-100">Register</a>
        <a href="#login" className="bg-blue-500 px-6 py-2 rounded shadow hover:bg-blue-600">Login</a>
      </div>
    </section>

    <section className="bg-gray-800 text-white p-6 text-center">
      <p className="text-lg">Are you an <strong>Organizer</strong>?</p>
      <a href="./src/AdminLogin.jsx" className="mt-2 inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-bold">Login to Admin Panel</a>
    </section>

    <footer className="bg-gray-800 text-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul>
            <li>Email: Yotta@gmail.com</li>
            <li>Phone: +91 9043872476</li>
            <li>Address: PSG Tech, Coimbatore</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Privacy</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Cookies</a></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Instagram</a>
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-6 text-gray-500">
        @2025  Yotta Web Services. All rights reserved.
      </div>
    </footer>
    </>
  );
}


export default Footer;