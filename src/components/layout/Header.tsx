import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Admission", path: "/admission" },
  { label: "Academics", path: "/academics" },
  { label: "Faculty", path: "/faculty" },
  { label: "Examination", path: "/examination" },
  { label: "Result", path: "/result" },
  { label: "Library", path: "/library" },
  { label: "Research", path: "/research" },
  { label: "Training & Placement", path: "/placement" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:7903462065" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">7903462065</span>
            </a>
            <a href="mailto:chatramodelcollege@gmail.com" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">chatramodelcollege@gmail.com</span>
            </a>
          </div>
          <div className="text-xs opacity-80">
            Affiliated to Vinoba Bhave University, Hazaribagh
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <Link to="/" className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-2xl md:text-3xl font-bold shadow-lg">
                MCC
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-primary">
                  Model College, Chatra
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Kishunpur Tongri, Chatra, Jharkhand – 825401
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 8).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors underline-animate ${
                    location.pathname === item.path
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:text-primary hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* More dropdown for remaining items */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 text-foreground hover:text-primary hover:bg-secondary/50">
                  More <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-card rounded-lg shadow-lg border border-border py-2 min-w-[180px]">
                    {navItems.slice(8).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === item.path
                            ? "text-primary bg-secondary"
                            : "text-foreground hover:text-primary hover:bg-secondary/50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "text-primary-foreground bg-primary"
                        : "text-foreground bg-secondary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
