import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Features from './Features'
import Footer from './Footer'
import Header from './Header'
import Admin from "./Admin"
import Register from "./Register";


function App() {

  return (
   <Router>
      <Header />
      <Features />
      <Footer />
      
      
  
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
