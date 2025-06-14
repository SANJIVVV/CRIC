import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Features from './Features'
import Footer from './Footer'
import Header from './Header'
import Admin from "./Admin"


function App() {

  return (
   <Router>
      <Header />
      <Features />
      <Footer />
      
  
      <Routes>
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
    </Router>
  )
}

export default App
