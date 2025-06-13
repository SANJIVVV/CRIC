function Header()
{
  return(
    <>
    <header className="flex  justify-between items-center px-6 py-4 bg-green-800 text-white">
    <div className="text-2xl font-bold">CricSync</div>
    <nav className="space-x-6">
      <a href="#home" className="hover:text-blue-300">Home</a>
      <a href="#teams" className="hover:text-blue-300">teams</a>
      <a href="#matches" className="hover:text-blue-300">Matches</a>
      <a href="#register" className="hover:text-blue-300">Register</a>
      <a href="#login" className="hover:text-blue-300">Login</a>
    </nav>
    </header>

    <section className="bg-[url('/ss.jpg')] bg-cover bg-center  h-[60vh] flex items-center justify-center flex-col text-center px-4 text-white">
      <h1 className="text-5xl font-bold mb-4">Join the Excitement of Live Cricket Tournaments!</h1>
      <p className="text-lg">Track matches, register your team, and view live stats now!</p>
    </section>
    </>
  );
}

export default Header;