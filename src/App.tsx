
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SiteDataProvider } from "@/context/SiteDataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Gallery from "@/pages/Gallery";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <SiteDataProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen pt-16 bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </Router>
    </SiteDataProvider>
  );
}

export default App;
