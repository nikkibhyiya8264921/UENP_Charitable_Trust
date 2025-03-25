
import { useState, useEffect, useRef } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, X, Search, Filter } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter images based on both category and search term
    let images = siteData.gallery;
    
    if (selectedCategory !== "all") {
      images = images.filter((image) => image.category === selectedCategory);
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      images = images.filter(
        (image) => 
          image.title.toLowerCase().includes(term) || 
          image.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredImages(images);
  }, [selectedCategory, searchTerm, siteData.gallery]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      navigateImage("next");
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage) 
    : null;

  return (
    <div className="container mx-auto px-4 py-12" ref={galleryRef} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search gallery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        <div className="flex flex-wrap justify-start md:justify-end gap-2">
          <div className="hidden md:flex items-center mr-2">
            <Filter size={16} className="mr-1 text-gray-600" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full text-sm ${
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
      </div>

      {/* Gallery Grid with Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-ngo-orange/90 text-white text-xs px-2 py-1 rounded mb-1">
                    {categories.find(c => c.id === image.category)?.name || 'General'}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">No images found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl bg-black text-white">
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/80 transition-colors"
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
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <DialogTitle className="text-xl font-bold text-white">
                  {selectedImageData.title}
                </DialogTitle>
                <DialogDescription className="text-white/70 text-center max-w-xl">
                  {selectedImageData.description}
                </DialogDescription>
                <p className="mt-2 text-sm text-white/50">
                  Category: {categories.find(c => c.id === selectedImageData.category)?.name || 'General'}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
