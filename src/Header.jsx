import { Link } from "react-router-dom";

function Header()
{
  return(
    <>
    <header className="flex  justify-between items-center px-6 py-4 bg-green-800 text-white">
    <div className="text-2xl font-bold">CricSync</div>
    <nav className="space-x-6">
      <Link to="/" className="hover:text-blue-300">Home</Link>
      <a href="" className="hover:text-blue-300">Teams</a>
      <a href="" className="hover:text-blue-300">Matches</a>
      <Link to="/Enquiryform" className="hover:text-blue-300">Enquiry</Link>
      <Link to="/register" className="hover:text-blue-300">Register</Link>
      <Link to="/login" className="hover:text-blue-300">Login</Link>
    </nav>
    </header>

    <section className="bg-[url('/ss.jpg')] bg-cover bg-center  h-[60vh] flex items-center justify-center flex-col text-center px-4 text-white">
      <h1 className="text-4xl font-bold mb-4">Join the Excitement of Live Cricket Tournaments!</h1>
      <p className="text-lg">Track matches, register your team, and view live stats now!</p>
    </section>
    </>
  );
}

export default Header;