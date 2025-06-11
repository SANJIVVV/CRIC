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

    </>
  );
}


export default Footer;
