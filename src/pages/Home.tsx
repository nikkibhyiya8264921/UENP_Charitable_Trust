
import { Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import IconCard from "@/components/IconCard";
import ProgramCard from "@/components/ProgramCard";
import TestimonialCard from "@/components/TestimonialCard";
import ImpactCounter from "@/components/ImpactCounter";
import { ArrowRight, Users, Landmark, UserCheck, DollarSign } from "lucide-react";

const Home = () => {
  const { siteData } = useSiteData();

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-ngo-orange/10 px-3 py-1 text-sm font-medium text-ngo-orange">
                Our Mission
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Transforming Lives
              </h2>
              <p className="mb-6 text-gray-700">
                {siteData.organization.mission}
              </p>
              <Button asChild className="btn-primary-gradient w-fit rounded-full">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="order-first md:order-last">
              <div className="relative h-full overflow-hidden rounded-xl">
                <img
                  src="/images/slider/education.jpg"
                  alt="Our Mission"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 p-8">
                  <div className="mt-auto">
                    <h3 className="mb-2 text-xl font-bold text-white">
                      Our Vision
                    </h3>
                    <p className="text-white/90">
                      {siteData.organization.vision}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <SectionTitle
            title="What We Do"
            subtitle="We work on various fronts to create a sustainable impact on the communities we serve."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <IconCard
              title="Education"
              description="Providing quality education to underprivileged children."
              icon="BookOpen"
              className="animate-fade-in"
            />
            <IconCard
              title="Healthcare"
              description="Organizing medical camps and health awareness programs."
              icon="Activity"
              className="animate-fade-in [animation-delay:0.2s]"
            />
            <IconCard
              title="Women Empowerment"
              description="Enabling women to become financially independent."
              icon="Users"
              className="animate-fade-in [animation-delay:0.4s]"
            />
            <IconCard
              title="Clean Water"
              description="Ensuring access to clean drinking water in rural areas."
              icon="Droplets"
              className="animate-fade-in [animation-delay:0.6s]"
            />
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="btn-primary-gradient rounded-full">
              <Link to="/programs" className="inline-flex items-center">
                <span>View All Programs</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <ImpactCounter />

      {/* Featured Programs */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionTitle
            title="Our Programs"
            subtitle="Discover the initiatives that are making a difference in thousands of lives."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteData.programs.slice(0, 3).map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="btn-secondary-gradient rounded-full">
              <Link to="/programs" className="inline-flex items-center">
                <span>Explore All Programs</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Support Us Banner */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-ngo-blue opacity-90">
          <img
            src="/images/slider/women-empowerment.jpg"
            alt="Support Our Cause"
            className="h-full w-full object-cover mix-blend-multiply"
          />
        </div>
        <div className="container relative mx-auto px-4 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Support Our Cause
            </h2>
            <p className="mb-8 text-lg">
              Your support enables us to continue our work for the betterment of
              underprivileged communities. Every contribution, big or small,
              makes a significant impact.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-white text-ngo-blue hover:bg-white/90">
                <Link to="/donate" className="inline-flex items-center">
                  <DollarSign size={18} className="mr-2" />
                  <span>Donate Now</span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/get-involved" className="inline-flex items-center">
                  <UserCheck size={18} className="mr-2" />
                  <span>Volunteer</span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/corporate" className="inline-flex items-center">
                  <Landmark size={18} className="mr-2" />
                  <span>Corporate Partnerships</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <SectionTitle
            title="Voices of Change"
            subtitle="Hear from those whose lives have been transformed through our programs."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteData.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-ngo-orange text-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Join Us in Making a Difference
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Together, we can create a more equitable and sustainable future for
            all. Be a part of our journey towards positive change.
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg" className="bg-white text-ngo-orange hover:bg-white/90">
              <Link to="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
