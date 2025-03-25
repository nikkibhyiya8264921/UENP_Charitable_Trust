
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

const IconCard: React.FC<IconCardProps> = ({
  title,
  description,
  icon,
  className = "",
}) => {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.Activity;

  return (
    <div className={`card-hover rounded-lg bg-white p-6 shadow-md ${className}`}>
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
        <Icon size={28} />
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default IconCard;
