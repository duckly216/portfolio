import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { t } from "./theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function NavBar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch to the light style once the hero (about 300px) is scrolled past
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home page has the hero transition
  const isHomePage = location.pathname === "/";

  // Light theme applies if scrolled on homepage OR on any non-homepage
  const isLightTheme = !isHomePage || isScrolled;

  const linkClass = (path: string) => {
    if (location.pathname !== path) return "opacity-70 hover:opacity-100";
    return `font-semibold ${isLightTheme ? t.textBrand : t.textOnBrand}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightTheme
          ? `border-b ${t.border} ${t.navSurface} ${t.text} backdrop-blur shadow-sm`
          : `border-b border-white/10 bg-transparent ${t.textOnBrand}`
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-8">
        {/* Brand Logo / Name */}
        <Link to="/" className="flex transition hover:opacity-80 -ml-2 sm:-ml-4">
          <img
            src="/images/duck_icon.ico"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`transition ${linkClass(to)}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
