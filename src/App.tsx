
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteDataProvider } from "@/context/SiteDataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Gallery from "@/pages/Gallery";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path="/programs"
              element={
                <>
                  <Navbar />
                  <Programs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <Navbar />
                  <Gallery />
                  <Footer />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <Navbar />
                  <Team />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route
              path="/donate"
              element={
                <>
                  <Navbar />
                  <Donate />
                  <Footer />
                </>
              }
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <NotFound />
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SiteDataProvider>
  </QueryClientProvider>
);

export default App;
