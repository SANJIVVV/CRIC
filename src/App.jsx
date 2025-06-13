import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './AdminLogin'
import './App.css'
import Features from './Features'
import Footer from './Footer'
import Header from './Header'


function App() {

  return (
   <Router>
      <Header />
      <Features />
      <Footer />
  
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  )
}

export default App
