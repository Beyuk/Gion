import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Tips from "./components/Tips";
import BookAppointments from "./components/BookAppointments";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AppointmentDetail from "./pages/admin/AppointmentDetail";
import AdminServices from "./pages/admin/AdminServices";
import AdminMessages from "./pages/admin/AdminMessages";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import ResetPassword from "./pages/admin/ResetPassword";
import ChangePassword from "./pages/admin/ChangePassword";
import Patients from "./pages/admin/Patients";
import Settings from "./pages/admin/settings";
import ClinicSettings from "./pages/admin/settings/ClinicSettings";
import NotificationSettings from "./pages/admin/settings/NotificationSettings";
import BusinessHours from "./pages/admin/settings/BusinessHours";
import InvoiceSettings from "./pages/admin/settings/InvoiceSettings";
import StaffManagement from "./pages/admin/settings/StaffManagement";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Tips />
      <BookAppointments />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        
        {/* Protected Admin Routes - Only accessible after login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="appointments">
            <Route index element={<AdminAppointments />} />
            <Route path=":id" element={<AppointmentDetail />} />
          </Route>
          <Route path="services" element={<AdminServices />} />
          <Route path="contact" element={<AdminMessages />} />
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="patients" element={<Patients />} />
          
          {/* Settings Routes */}
          <Route path="settings">
            <Route index element={<Settings />} />
            <Route path="clinic" element={<ClinicSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="hours" element={<BusinessHours />} />
            <Route path="invoice" element={<InvoiceSettings />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>
        </Route>
        
        {/* 404 Page */}
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