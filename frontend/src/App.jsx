import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Tips from "./components/Tips";
import BookAppointments from "./components/BookAppointments";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import AdminAppointments from "./pages/admin/AdminAppointments";

// HOME PAGE COMPONENT
function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Tips />
      <BookAppointments />
      <Testimonials />
      <Contact />
      <Feedback />
      <Footer />
    </>
  );
}

// APP ROUTES
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/admin/appointments" element={<AdminAppointments />} />

      </Routes>
    </BrowserRouter>
  );
}
