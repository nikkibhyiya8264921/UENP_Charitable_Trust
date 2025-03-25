
import { Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { siteData } = useSiteData();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <img
                src={siteData.organization.logo}
                alt={siteData.organization.name}
                className="h-12 w-auto"
              />
            </div>
            <p className="mb-6 text-gray-300">
              {siteData.organization.description}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteData.contact.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-ngo-orange"
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
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-ngo-orange"
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
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-ngo-orange"
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
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-ngo-orange"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="animate-fade-in [animation-delay:0.2s]">
            <h3 className="mb-6 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="inline-block text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="animate-fade-in [animation-delay:0.4s]">
            <h3 className="mb-6 text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 text-ngo-orange" />
                <span className="text-gray-300">
                  {siteData.contact.address.line1}, {siteData.contact.address.line2}, {siteData.contact.address.city}, {siteData.contact.address.state} - {siteData.contact.address.pincode}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-ngo-orange" />
                <span className="text-gray-300">{siteData.contact.phone[0]}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-ngo-orange" />
                <span className="text-gray-300">{siteData.contact.phone[1]}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-ngo-orange" />
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="text-gray-300 transition-colors hover:text-ngo-orange"
                >
                  {siteData.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="animate-fade-in [animation-delay:0.6s]">
            <h3 className="mb-6 text-xl font-semibold">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter to get the latest updates about our
              work.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  className="ml-2 bg-ngo-orange px-4 py-2 text-white transition-all hover:bg-ngo-orange/90"
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <Button
                asChild
                className="btn-primary-gradient w-full rounded-full py-6 text-lg"
              >
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-center text-sm text-gray-400 md:mb-0">
              &copy; {currentYear} {siteData.organization.name}. All rights
              reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link
                to="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                to="/admin"
                className="transition-colors hover:text-white"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
