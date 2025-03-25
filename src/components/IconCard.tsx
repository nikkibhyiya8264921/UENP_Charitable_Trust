
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconCardProps {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  className?: string;
}

const IconCard = ({ title, description, icon, className = "" }: IconCardProps) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = LucideIcons[icon];

  return (
    <div className={`p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ngo-orange/10">
        {IconComponent && (
          <IconComponent className="h-6 w-6 text-ngo-orange" />
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default IconCard;
