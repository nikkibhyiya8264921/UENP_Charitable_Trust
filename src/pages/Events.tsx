
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const Events = () => {
  const { siteData } = useSiteData();
  const [filter, setFilter] = useState("all"); // "all", "upcoming", "completed"
  
  const filteredEvents = filter === "all" 
    ? siteData.events 
    : siteData.events.filter(event => event.status === filter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/events/events-hero.jpg"
            alt="Events"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ngo-blue/90 to-ngo-blue/70" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Events
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Discover our upcoming and past events making a positive impact in communities across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Events"
            subtitle="Browse through our events and initiatives or filter by upcoming and past events."
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              className={`rounded-full ${filter === "all" ? "bg-ngo-orange text-white" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Events
            </Button>
            <Button 
              variant={filter === "upcoming" ? "default" : "outline"}
              className={`rounded-full ${filter === "upcoming" ? "bg-ngo-orange text-white" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming Events
            </Button>
            <Button 
              variant={filter === "completed" ? "default" : "outline"}
              className={`rounded-full ${filter === "completed" ? "bg-ngo-orange text-white" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Past Events
            </Button>
          </div>

          {/* Events List */}
          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.status === "upcoming" && (
                      <div className="absolute top-4 left-4 bg-ngo-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        Upcoming
                      </div>
                    )}
                    {event.status === "completed" && (
                      <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Completed
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <CalendarDays size={18} className="mr-2 text-ngo-orange" />
                        <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2 text-ngo-orange" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 flex-grow mb-4">{event.description}</p>
                    
                    <Link to={`/events/${event.id}`}>
                      <Button className="rounded-full bg-ngo-blue text-white hover:bg-ngo-blue/90 w-full md:w-auto">
                        <span>View Details</span>
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No events found in this category.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilter("all")}
                >
                  View all events
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
