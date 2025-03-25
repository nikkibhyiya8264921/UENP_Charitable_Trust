
import { useState, useEffect, useRef } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { motion, useScroll, useTransform } from "framer-motion";

const NewspaperHighlights = () => {
  const { siteData } = useSiteData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use this to create a staggered effect as we scroll
  const newspaperImages = siteData.newspaperImages || [];

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">In The News</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our work has been recognized by various media outlets. Here are some highlights
            of our initiatives covered in newspapers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newspaperImages.map((news, index) => {
            // Calculate different transforms for each card to create staggered effect
            const xTransform = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [index % 2 === 0 ? -100 : 100, 0, 0]
            );
            const opacityTransform = useTransform(
              scrollYProgress,
              [0, 0.3, 1],
              [0, 1, 1]
            );
            
            return (
              <motion.div
                key={news.id}
                style={{ 
                  x: xTransform, 
                  opacity: opacityTransform,
                }}
                className="newspaper-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <p className="text-xs mb-1 bg-ngo-orange/90 inline-block px-2 py-1 rounded">Press Coverage</p>
                    <h3 className="text-lg font-semibold">{news.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{news.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewspaperHighlights;
