
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  id: number;
  name: string;
  position: string;
  quote: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  quote,
  imageUrl,
}) => {
  return (
    <div className="card-hover h-full rounded-xl bg-white p-6 shadow-md">
      <div className="mb-4 text-ngo-orange">
        <Quote size={32} />
      </div>
      <p className="mb-6 text-gray-700">{quote}</p>
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
