
import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
  };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  position,
  bio,
  imageUrl,
  socialMedia,
}) => {
  return (
    <div className="card-hover rounded-lg bg-white shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-80 w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 bg-gradient-to-t from-black/60 to-transparent p-4">
          {socialMedia.linkedin && (
            <a
              href={socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-ngo-blue"
              aria-label={`${name}'s LinkedIn`}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {socialMedia.twitter && (
            <a
              href={socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-ngo-blue"
              aria-label={`${name}'s Twitter`}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-1 text-xl font-semibold">{name}</h3>
        <p className="mb-3 text-ngo-orange">{position}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
