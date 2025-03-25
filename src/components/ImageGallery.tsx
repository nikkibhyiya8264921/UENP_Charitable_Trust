
import { useState, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const categories = [
  { id: "all", name: "All" },
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
  { id: "women", name: "Women Empowerment" },
  { id: "water", name: "Clean Water" },
  { id: "environment", name: "Environment" },
  { id: "disaster", name: "Disaster Relief" },
];

const ImageGallery = () => {
  const { siteData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(siteData.gallery);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(siteData.gallery);
    } else {
      setFilteredImages(
        siteData.gallery.filter((image) => image.category === selectedCategory)
      );
    }
  }, [selectedCategory, siteData.gallery]);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage) 
    : null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`rounded-full ${
              selectedCategory === category.id
                ? "bg-ngo-orange text-white"
                : "border-gray-300 text-gray-700 hover:bg-ngo-orange/10 hover:text-ngo-orange"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="image-mask group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            onClick={() => openLightbox(image.id)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-white">{image.title}</h3>
              <p className="text-sm text-white/80">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl bg-black text-white">
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white"
            >
              <X size={20} />
            </button>
            {selectedImageData && (
              <div className="flex flex-col items-center">
                <div className="relative mb-4 h-[60vh] w-full">
                  <img
                    src={selectedImageData.imageUrl}
                    alt={selectedImageData.title}
                    className="h-full w-full object-contain"
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <DialogTitle className="text-xl text-white">
                  {selectedImageData.title}
                </DialogTitle>
                <DialogDescription className="text-white/70">
                  {selectedImageData.description}
                </DialogDescription>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
