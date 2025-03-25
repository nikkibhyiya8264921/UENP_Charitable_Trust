
import { Link } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import SectionTitle from "@/components/SectionTitle";
import ProgramCard from "@/components/ProgramCard";

const Programs = () => {
  const { siteData } = useSiteData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/slider/healthcare.jpg"
            alt="Our Programs"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="animate-fade-in-up">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Programs
            </h1>
            <p className="text-xl text-white/90">
              Discover our initiatives that are making a difference in communities
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Initiatives"
            subtitle="We work on various fronts to create sustainable impact in the communities we serve."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteData.programs.map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Approach"
            subtitle="We believe in creating sustainable change through a holistic approach that addresses the root causes of challenges."
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Community Participation</h3>
              <p className="text-gray-700">
                We involve community members at every stage of our programs, from
                planning to implementation and evaluation. This ensures that our
                initiatives are relevant, accepted, and sustainable in the long
                run.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.2s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Integrated Development</h3>
              <p className="text-gray-700">
                Our programs integrate various aspects of development such as
                education, health, livelihood, and environment to address the
                interconnected challenges faced by communities.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.4s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Capacity Building</h3>
              <p className="text-gray-700">
                We focus on building the capacity of local communities to take
                ownership of their development and continue the positive changes
                beyond our direct involvement.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.6s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Partnerships</h3>
              <p className="text-gray-700">
                We collaborate with government agencies, other NGOs, corporate
                partners, and academic institutions to leverage resources,
                expertise, and networks for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Impact Stories"
            subtitle="Real stories of change from the communities we serve."
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in group overflow-hidden rounded-lg bg-white shadow-md">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/slider/education.jpg"
                  alt="Education Success Story"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                <div className="absolute bottom-0 p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Empowering Through Education
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  "I never thought I would be able to go to school. Thanks to
                  Utthan, I not only completed my education but also secured a
                  scholarship for higher studies. Today, I am a teacher in my
                  village, inspiring other children to pursue education."
                </p>
                <p className="font-semibold">- Priya, 24, Bihar</p>
              </div>
            </div>

            <div className="animate-fade-in [animation-delay:0.2s] group overflow-hidden rounded-lg bg-white shadow-md">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/slider/women-empowerment.jpg"
                  alt="Women Empowerment Success Story"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                <div className="absolute bottom-0 p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Financial Independence
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  "After my husband's death, I struggled to support my family.
                  The tailoring training provided by Utthan helped me start my
                  own business. Now, I earn enough to support my children's
                  education and have even hired two more women from my village."
                </p>
                <p className="font-semibold">- Sunita, 35, Uttar Pradesh</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/impact-stories"
              className="inline-block rounded-full bg-ngo-orange px-8 py-3 font-medium text-white transition-colors hover:bg-ngo-orange/90"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
