
import { useParams, Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowLeft, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { siteData } = useSiteData();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId && siteData.events) {
      const foundEvent = siteData.events.find(
        (e) => e.id === parseInt(eventId, 10)
      );
      setEvent(foundEvent);
      setLoading(false);
    }
  }, [eventId, siteData.events]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ngo-orange border-t-transparent"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Event Not Found</h2>
        <p className="mb-6 text-gray-600">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  const isUpcoming = event.status === "upcoming";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4">
              <span className={`rounded-full px-4 py-1 text-sm font-medium text-white ${
                isUpcoming ? "bg-green-500" : "bg-gray-500"
              }`}>
                {isUpcoming ? "Upcoming Event" : "Past Event"}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to="/events"
            className="inline-flex items-center text-ngo-orange hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Events</span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Event Details</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />
              
              {event.gallery && event.gallery.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-bold">Event Gallery</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {event.gallery.map((galleryId: number, index: number) => {
                      const galleryImage = siteData.gallery.find(
                        (g) => g.id === galleryId
                      );
                      return (
                        galleryImage && (
                          <div
                            key={index}
                            className="overflow-hidden rounded-lg"
                          >
                            <img
                              src={galleryImage.imageUrl}
                              alt={galleryImage.title}
                              className="h-40 w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Actions */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Event Actions</h3>
              
              {isUpcoming && event.tickets && event.tickets.available && (
                <div className="mb-6 space-y-4">
                  <p className="font-medium">Tickets Available</p>
                  <p className="text-lg font-bold text-ngo-orange">
                    {event.tickets.price}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-ngo-orange hover:bg-ngo-orange/90"
                  >
                    <Link to={event.tickets.link}>Book Tickets</Link>
                  </Button>
                </div>
              )}
              
              {isUpcoming && event.registration && event.registration.open && (
                <div className="mb-6 space-y-4">
                  <p className="font-medium">Registration Open</p>
                  <p className="text-sm text-gray-600">
                    Registration closes on{" "}
                    {format(
                      new Date(event.registration.deadline),
                      "MMMM dd, yyyy"
                    )}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-ngo-orange hover:bg-ngo-orange/90"
                  >
                    <Link to={event.registration.link}>Register Now</Link>
                  </Button>
                </div>
              )}
              
              {isUpcoming && event.volunteer && event.volunteer.needed && (
                <div className="space-y-4">
                  <p className="font-medium">Volunteers Needed</p>
                  <p className="text-sm text-gray-600">
                    {event.volunteer.positions} positions available
                  </p>
                  <Button asChild className="w-full">
                    <Link to={event.volunteer.link} className="inline-flex items-center justify-center">
                      <UserCheck size={16} className="mr-2" />
                      <span>Volunteer for this Event</span>
                    </Link>
                  </Button>
                </div>
              )}
              
              {!isUpcoming && (
                <div className="text-gray-600">
                  <p>This event has already taken place.</p>
                  {event.gallery && event.gallery.length > 0 && (
                    <p className="mt-2">
                      Check out the event gallery to see highlights from this event.
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Share Event */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Share Event</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Need Information?</h3>
              <p className="mb-4 text-gray-600">
                For any queries related to this event, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>{" "}
                  {siteData.contact.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>{" "}
                  {siteData.contact.phone[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
