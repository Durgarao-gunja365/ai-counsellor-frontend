import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/counsellor", label: "AI Counsellor", icon: "🤖" },
    { path: "/search", label: "Search", icon: "🔍" },
    { path: "/universities", label: "Recommendations", icon: "🎓" },
    { path: "/shortlisted", label: "Shortlisted", icon: "⭐" },
    { path: "/profile/edit", label: "Profile", icon: "👤" },
  ];

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/95 border-b transition-shadow ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <span className="text-3xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              🤖
            </span>
            <div className="leading-tight">
              <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                AI Counsellor
              </h1>
              <p className="text-[10px] uppercase tracking-wide text-gray-500">
                Study Abroad Assistant
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition 
                  ${
                    isActive(item.path)
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* DESKTOP USER */}
          <div className="hidden lg:flex items-center gap-4">
            
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-500 hover:text-white transition"
            >
              🚪 Logout
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white z-50 transform transition-transform lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-lg">AI Counsellor</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-6 py-4 flex items-center gap-4 transition ${
                isActive(item.path)
                  ? "bg-indigo-100 text-indigo-600 border-l-4 border-indigo-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-auto p-6 border-t">
            <button
              onClick={logout}
              className="w-full py-3 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-500 hover:text-white transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </>
  );
}
