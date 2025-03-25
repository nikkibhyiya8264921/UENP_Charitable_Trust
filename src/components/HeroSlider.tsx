
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const HeroSlider = () => {
  const { siteData } = useSiteData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === siteData.heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? siteData.heroSlides.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentSlide, siteData.heroSlides.length]);

  return (
    <div className="relative h-[500px] overflow-hidden md:h-[600px] lg:h-[700px]">
      {/* Slides */}
      {siteData.heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative flex h-full items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 
                  className={`mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl ${
                    index === currentSlide ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`mb-8 text-lg text-white/90 md:text-xl ${
                    index === currentSlide ? "animate-fade-in-up [animation-delay:0.2s]" : ""
                  }`}
                >
                  {slide.description}
                </p>
                <Button 
                  asChild
                  className={`btn-primary-gradient rounded-full px-8 py-6 text-lg ${
                    index === currentSlide ? "animate-fade-in-up [animation-delay:0.4s]" : ""
                  }`}
                >
                  <Link to={slide.ctaLink}>{slide.ctaText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {siteData.heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-10 rounded-full transition-all ${
              index === currentSlide ? "bg-ngo-orange" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
