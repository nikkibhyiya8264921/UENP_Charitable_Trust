
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { CalendarDays, MapPin, Clock, ArrowLeft, Users, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { siteData } = useSiteData();
  const [event, setEvent] = useState<any>(null);
  const [relatedImages, setRelatedImages] = useState<any[]>([]);
  
  useEffect(() => {
    if (eventId && siteData.events) {
      const foundEvent = siteData.events.find(e => e.id.toString() === eventId);
      setEvent(foundEvent || null);
      
      // If event has gallery images, load them
      if (foundEvent && foundEvent.gallery && foundEvent.gallery.length > 0) {
        const galleryImages = foundEvent.gallery.map((imageId: number) => 
          siteData.gallery.find(img => img.id === imageId)
        ).filter(Boolean);
        
        setRelatedImages(galleryImages);
      }
    }
  }, [eventId, siteData]);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events">
          <Button>
            <ArrowLeft size={16} className="mr-2" />
            Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="container relative mx-auto flex h-full items-end pb-12 px-4">
          <div className="max-w-3xl">
            <div className="mb-4">
              {event.status === "upcoming" ? (
                <span className="inline-block bg-ngo-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                  Upcoming Event
                </span>
              ) : (
                <span className="inline-block bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Past Event
                </span>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90 mb-4">
              <div className="flex items-center">
                <CalendarDays size={18} className="mr-2 text-ngo-orange" />
                <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-ngo-orange" />
                <span>{event.location}</span>
              </div>
            </div>
            <p className="text-white/90 text-lg max-w-3xl">
              {event.description}
            </p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />

              {/* Event Gallery if available */}
              {relatedImages.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Event Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedImages.map((image: any) => (
                      <div key={image.id} className="rounded-lg overflow-hidden h-48">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Action Sidebar */}
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Event Information</h3>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-ngo-orange" />
                    <span className="font-medium">Date:</span>
                  </div>
                  <p>{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="mr-2 text-ngo-orange" />
                    <span className="font-medium">Location:</span>
                  </div>
                  <p>{event.location}</p>
                </div>
                
                {/* Conditionally show relevant event actions */}
                {event.tickets && event.tickets.available && !isPastEvent && (
                  <div className="mb-6">
                    <p className="mb-3 font-medium">Ticket Price: {event.tickets.price}</p>
                    <Link to={event.tickets.link}>
                      <Button className="w-full bg-ngo-orange hover:bg-ngo-orange/90">
                        Book Tickets
                      </Button>
                    </Link>
                  </div>
                )}
                
                {event.registration && event.registration.open && !isPastEvent && (
                  <div className="mb-6">
                    <p className="mb-2 font-medium">Registration Open</p>
                    <p className="mb-3 text-sm">Deadline: {format(new Date(event.registration.deadline), 'MMMM d, yyyy')}</p>
                    <Link to={event.registration.link}>
                      <Button className="w-full bg-ngo-orange hover:bg-ngo-orange/90">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                )}
                
                {event.volunteer && event.volunteer.needed && !isPastEvent && (
                  <div className="mb-6">
                    <p className="mb-2 font-medium">Volunteers Needed</p>
                    <p className="mb-3 text-sm">Positions: {event.volunteer.positions}</p>
                    <Link to={event.volunteer.link}>
                      <Button className="w-full bg-ngo-blue hover:bg-ngo-blue/90">
                        <Users size={16} className="mr-2" />
                        Volunteer
                      </Button>
                    </Link>
                  </div>
                )}
                
                {isPastEvent && (
                  <div className="mb-6">
                    <p className="text-gray-500">This event has already taken place.</p>
                  </div>
                )}
                
                <Link to="/events">
                  <Button variant="outline" className="w-full mt-4">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
