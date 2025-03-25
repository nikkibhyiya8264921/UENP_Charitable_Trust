
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ProgramCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  achievements: string;
  link: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  icon,
  achievements,
  link,
}) => {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.Activity;

  return (
    <div className="card-hover group rounded-lg bg-white shadow-md">
      <div className="image-mask relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ngo-orange backdrop-blur-sm">
          <Icon size={20} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
        <div className="mb-4 flex items-center">
          <div className="rounded-full bg-ngo-orange/10 px-3 py-1 text-sm font-medium text-ngo-orange">
            {achievements}
          </div>
        </div>
        <Link
          to={link}
          className="group/link mt-2 inline-flex items-center font-medium text-ngo-blue transition-colors hover:text-ngo-orange"
        >
          <span>Learn More</span>
          <ArrowRight
            size={16}
            className="ml-1 transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;
