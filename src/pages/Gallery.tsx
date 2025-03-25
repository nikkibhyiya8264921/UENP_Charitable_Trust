
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/slider/healthcare.jpg"
            alt="Gallery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Photo Gallery
            </h1>
            <p className="text-xl text-white/90">
              A visual journey through our work and impact across communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Impact in Pictures"
            subtitle="Browse through our collection of images showcasing our work across various programs and initiatives. Use the filters to narrow down the images by category."
          />

          <ImageGallery />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
