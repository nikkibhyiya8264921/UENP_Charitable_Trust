
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import ImageGallery from "@/components/ImageGallery";

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
          <div className="animate-fade-in-up">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Gallery
            </h1>
            <p className="text-xl text-white/90">
              Explore our work through images and stories of impact
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Impact in Pictures"
            subtitle="Browse through our collection of images showcasing our work across various programs and initiatives."
          />

          <ImageGallery />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
