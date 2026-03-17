import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import About from "./pages/about.jsx";
import MyProfile from "./pages/myProfile.jsx";
import MyAppointment from "./pages/myappointments.jsx";
import Doctors from "./pages/doctors.jsx";
import Contact from "./pages/contact.jsx";
import Appointment from "./pages/appointment.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <div className="mx-4 sm:mx-[5%]">
     <Navbar/>
     
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/my-profile" element={<MyProfile/>}/>
         <Route path="/my-appointments" element={<MyAppointment/>}/> 
         <Route path="/doctors" element={<Doctors/>}/>
         <Route path="/doctors/:speciality" element={<Doctors/>}/> 
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/appointment/:docId" element={<Appointment/>}/>
         

        
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;