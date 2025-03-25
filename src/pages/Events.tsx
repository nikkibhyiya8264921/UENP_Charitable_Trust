
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const Events = () => {
  const { siteData } = useSiteData();
  const [filter, setFilter] = useState("all");

  // Filter events by status
  const filteredEvents = filter === "all" 
    ? siteData.events 
    : siteData.events.filter(event => event.status === filter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Events
            </h1>
            <p className="text-xl text-white/90">
              Join us in our mission to create positive change through various events and initiatives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Upcoming & Past Events"
            subtitle="Get involved and stay updated with our events and activities. Join us in making a difference."
          />

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-ngo-orange hover:bg-ngo-orange/90" : ""}
            >
              All Events
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className={filter === "upcoming" ? "bg-ngo-orange hover:bg-ngo-orange/90" : ""}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-ngo-orange hover:bg-ngo-orange/90" : ""}
            >
              Past Events
            </Button>
          </div>

          {/* Events Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={item}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {event.status === "upcoming" && (
                      <div className="absolute top-4 right-4 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                        Upcoming
                      </div>
                    )}
                    {event.status === "completed" && (
                      <div className="absolute top-4 right-4 rounded-full bg-gray-500 px-3 py-1 text-sm font-medium text-white">
                        Past Event
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold">{event.title}</h3>
                    <div className="mb-4 flex flex-col gap-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-ngo-orange" />
                        <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-ngo-orange" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="mb-6 text-gray-700">{event.description}</p>
                    <Link
                      to={`/events/${event.id}`}
                      className="inline-flex items-center text-ngo-orange hover:underline"
                    >
                      <span>View Details</span>
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-lg">No events found for the selected filter.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilter("all")}
                >
                  View All Events
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;
