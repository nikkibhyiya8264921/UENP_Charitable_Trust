
import { useState, useEffect, useRef } from "react";
import { useSiteData } from "@/context/SiteDataContext";

const ImpactCounter = () => {
  const { siteData } = useSiteData();
  const { impact } = siteData;
  
  const [counters, setCounters] = useState({
    beneficiaries: 0,
    villages: 0,
    programs: 0,
    volunteers: 0,
  });

  const targetRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      
      setCounters({
        beneficiaries: Math.floor(progress * impact.beneficiaries),
        villages: Math.floor(progress * impact.villages),
        programs: Math.floor(progress * impact.programs),
        volunteers: Math.floor(progress * impact.volunteers),
      });
      
      if (frame === totalFrames) {
        clearInterval(timer);
        setCounters(impact); // Ensure final values are exact
      }
    }, frameDuration);
  };

  return (
    <div 
      ref={targetRef}
      className="bg-gradient-to-r from-ngo-orange/90 to-ngo-red/90 py-16 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
              {counters.beneficiaries.toLocaleString()}+
            </div>
            <div className="mt-2 text-lg font-medium">Lives Impacted</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
              {counters.villages.toLocaleString()}+
            </div>
            <div className="mt-2 text-lg font-medium">Villages Reached</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
              {counters.programs.toLocaleString()}+
            </div>
            <div className="mt-2 text-lg font-medium">Programs</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
              {counters.volunteers.toLocaleString()}+
            </div>
            <div className="mt-2 text-lg font-medium">Volunteers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCounter;
