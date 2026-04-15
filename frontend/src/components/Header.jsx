import { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import logo from "../assets/logo.jpg";

const navList = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "tips", label: "Tips" },
  { id: "appointments", label: "Appointments" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO - SMOOTH & INTEGRATED (NO SEPARATE BOX) */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group shrink-0 transition-all duration-300 hover:opacity-85"
        >
          <img
            src={logo}
            alt="Gion Speciality Dental Clinic"
            className="h-11 w-auto sm:h-12 object-contain"
          />
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-base font-bold tracking-tight text-gray-900">
              Gion Speciality
            </div>
            <div className="text-xs font-medium text-gray-500 tracking-wide">
              Dental Clinic
            </div>
          </div>
        </button>

        {/* NAVIGATION - PERFECT EQUAL SPACING */}
        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-10 xl:gap-12">
            {navList.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="relative text-[15px] font-medium text-gray-700 hover:text-sky-600 transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </nav>

        {/* ACTION BUTTONS - PERFECT EQUAL SPACING */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+251961012087"
            className="flex items-center gap-2 text-[15px] font-medium text-gray-700 hover:text-sky-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <PhoneCall size={18} />
            Call Now
          </a>
          <button
            onClick={() => scrollToSection("appointments")}
            className="px-7 py-2.5 text-[15px] font-semibold bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all hover:shadow-md active:scale-95 shadow-sm"
          >
            Book Appointment
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100">
          <div className="flex flex-col px-6 py-5 gap-1">
            {navList.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-[16px] font-medium text-gray-800 py-3 px-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
              <a
                href="tel:+251961012087"
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                <PhoneCall size={18} />
                Call Now
              </a>
              <button
                onClick={() => scrollToSection("appointments")}
                className="bg-sky-600 text-white py-3 font-semibold rounded-xl hover:bg-sky-700 transition-colors shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CALL BUTTON */}
      <a
        href="tel:+251961012087"
        className="lg:hidden fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-xl z-50 flex items-center justify-center hover:bg-sky-700 transition-all hover:scale-105 active:scale-95"
        style={{
          width: "56px",
          height: "56px",
        }}
      >
        <PhoneCall size={24} />
      </a>
    </header>
  );
};

export default Header;