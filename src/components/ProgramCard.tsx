
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: keyof typeof LucideIcons;
  achievements: string;
  link: string;
}

const ProgramCard = ({
  id,
  title,
  description,
  imageUrl,
  icon,
  achievements,
  link,
}: ProgramCardProps) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = LucideIcons[icon];

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 p-2">
          {IconComponent && (
            <IconComponent className="h-5 w-5 text-ngo-orange" />
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-gray-700">{description}</p>
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">
            Impact: {achievements}
          </span>
        </div>
        <Button asChild className="w-full rounded-full">
          <Link to={link} className="inline-flex items-center justify-center">
            <span>Learn More</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;
