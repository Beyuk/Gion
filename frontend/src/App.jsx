import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Tips from "./components/Tips";
import BookAppointments from "./components/BookAppointments";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AppointmentDetail from "./pages/admin/AppointmentDetail";
import AdminServices from "./pages/admin/AdminServices";
import AdminMessages from "./pages/admin/AdminMessages";

// ✅ New imports for auth pages
import AdminLogin from "./pages/admin/auth/AdminLogin";
import ChangePassword from "./pages/admin/auth/ChangePassword";
import ResetPassword from "./pages/admin/auth/ResetPassword";

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
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Admin Panel (existing, untouched) */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path="appointments">
            <Route index element={<AdminAppointments />} />
            <Route path=":id" element={<AppointmentDetail />} />
          </Route>

          <Route path="services" element={<AdminServices />} />

          <Route path="contact" element={<AdminMessages />} />

          <Route path="users" element={<div>Users Management</div>} />

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: "100px", textAlign: "center", fontSize: "32px" }}>
              404 – Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}