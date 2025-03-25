
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { siteData } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden bg-ngo-orange text-white lg:block">
        <div className="container mx-auto flex justify-between py-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span className="text-sm">{siteData.contact.phone[0]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span className="text-sm">{siteData.contact.email}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href={siteData.contact.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href={siteData.contact.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Twitter"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={siteData.contact.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </a>
            <a
              href={siteData.contact.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "glassmorphism py-2 shadow-md"
            : "bg-white py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={siteData.organization.logo}
              alt={siteData.organization.name}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className={`link-hover font-medium transition-colors ${
                    isActive("/")
                      ? "text-ngo-orange"
                      : "text-gray-700 hover:text-ngo-orange"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`link-hover font-medium transition-colors ${
                    isActive("/about")
                      ? "text-ngo-orange"
                      : "text-gray-700 hover:text-ngo-orange"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`link-hover flex items-center space-x-1 font-medium transition-colors ${
                        location.pathname.startsWith("/programs")
                          ? "text-ngo-orange"
                          : "text-gray-700 hover:text-ngo-orange"
                      }`}
                    >
                      <span>Programs</span>
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    {siteData.programs.map((program) => (
                      <DropdownMenuItem key={program.id} asChild>
                        <Link to={program.link} className="w-full">
                          {program.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={`link-hover font-medium transition-colors ${
                    isActive("/gallery")
                      ? "text-ngo-orange"
                      : "text-gray-700 hover:text-ngo-orange"
                  }`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className={`link-hover font-medium transition-colors ${
                    isActive("/team")
                      ? "text-ngo-orange"
                      : "text-gray-700 hover:text-ngo-orange"
                  }`}
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`link-hover font-medium transition-colors ${
                    isActive("/contact")
                      ? "text-ngo-orange"
                      : "text-gray-700 hover:text-ngo-orange"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Button asChild className="btn-primary-gradient rounded-full px-6 py-2">
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-white p-4 lg:hidden">
            <nav className="flex h-full flex-col">
              <ul className="flex flex-col space-y-4 py-8">
                <li>
                  <Link
                    to="/"
                    className={`block text-lg font-medium ${
                      isActive("/") ? "text-ngo-orange" : "text-gray-700"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`block text-lg font-medium ${
                      isActive("/about") ? "text-ngo-orange" : "text-gray-700"
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    className={`flex w-full items-center justify-between text-lg font-medium ${
                      location.pathname.startsWith("/programs")
                        ? "text-ngo-orange"
                        : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const programsList = document.getElementById("mobile-programs-list");
                      if (programsList) {
                        programsList.classList.toggle("hidden");
                      }
                    }}
                  >
                    <span>Programs</span>
                    <ChevronDown size={16} />
                  </button>
                  <ul id="mobile-programs-list" className="mt-2 hidden pl-4">
                    {siteData.programs.map((program) => (
                      <li key={program.id} className="py-2">
                        <Link
                          to={program.link}
                          className="block text-gray-600 hover:text-ngo-orange"
                        >
                          {program.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className={`block text-lg font-medium ${
                      isActive("/gallery") ? "text-ngo-orange" : "text-gray-700"
                    }`}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className={`block text-lg font-medium ${
                      isActive("/team") ? "text-ngo-orange" : "text-gray-700"
                    }`}
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`block text-lg font-medium ${
                      isActive("/contact") ? "text-ngo-orange" : "text-gray-700"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-auto mb-8">
                <Button asChild className="btn-primary-gradient w-full rounded-full py-6 text-lg">
                  <Link to="/donate">Donate Now</Link>
                </Button>
                
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-ngo-orange" />
                    <span>{siteData.contact.phone[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="mr-2 text-ngo-orange" />
                    <span>{siteData.contact.email}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center space-x-6">
                  <a
                    href={siteData.contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors hover:text-ngo-orange"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                  </a>
                  <a
                    href={siteData.contact.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors hover:text-ngo-orange"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={siteData.contact.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors hover:text-ngo-orange"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                  <a
                    href={siteData.contact.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors hover:text-ngo-orange"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
