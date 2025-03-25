
import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = true,
  className = "",
}) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-1 w-20 bg-ngo-orange ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default SectionTitle;
