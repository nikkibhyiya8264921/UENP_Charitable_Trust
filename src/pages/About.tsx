
import { useSiteData } from "@/context/SiteDataContext";
import SectionTitle from "@/components/SectionTitle";
import ImpactCounter from "@/components/ImpactCounter";
import { ArrowRight, Check, Award, Target, Heart } from "lucide-react";

const About = () => {
  const { siteData } = useSiteData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/slider/education.jpg"
            alt="About Us"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="animate-fade-in-up">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              About Us
            </h1>
            <p className="text-xl text-white/90">
              Learn more about our mission, vision, and journey
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="animate-fade-in">
              <div className="mb-4 inline-flex items-center rounded-full bg-ngo-orange/10 px-3 py-1 text-sm font-medium text-ngo-orange">
                Our Story
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                The Journey of {siteData.organization.name}
              </h2>
              <p className="mb-6 text-gray-700">
                Founded in {siteData.organization.foundedYear}, {siteData.organization.name} began as a small initiative to address the educational needs of underprivileged children in rural areas. What started as a modest effort has now grown into a comprehensive organization working across multiple domains including education, healthcare, women empowerment, and sustainable development.
              </p>
              <p className="mb-6 text-gray-700">
                Our journey has been marked by challenges, learning, and impactful outcomes. With the support of dedicated volunteers, donors, and partners, we have been able to reach thousands of beneficiaries and create lasting change in their lives.
              </p>
              <p className="text-gray-700">
                Today, we continue to expand our reach and deepen our impact, guided by our core values of compassion, integrity, and sustainability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-fade-in [animation-delay:0.2s]">
                <img
                  src="/images/slider/healthcare.jpg"
                  alt="Our journey"
                  className="h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
              <div className="mt-8 animate-fade-in [animation-delay:0.4s]">
                <img
                  src="/images/slider/women-empowerment.jpg"
                  alt="Our team"
                  className="h-full w-full rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Guiding Principles"
            subtitle="The core values that drive our work and define our approach."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
                <Target size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold">Our Mission</h3>
              <p className="text-gray-700">{siteData.organization.mission}</p>
            </div>

            <div className="animate-fade-in [animation-delay:0.2s] rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ngo-blue/10 text-ngo-blue">
                <Award size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold">Our Vision</h3>
              <p className="text-gray-700">{siteData.organization.vision}</p>
            </div>

            <div className="animate-fade-in [animation-delay:0.4s] rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ngo-green/10 text-ngo-green">
                <Heart size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold">Our Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check size={18} className="mr-2 mt-1 text-ngo-green" />
                  <span>Compassion and Empathy</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 mt-1 text-ngo-green" />
                  <span>Integrity and Transparency</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 mt-1 text-ngo-green" />
                  <span>Innovation and Adaptability</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 mt-1 text-ngo-green" />
                  <span>Sustainability and Long-term Impact</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="mr-2 mt-1 text-ngo-green" />
                  <span>Inclusivity and Respect</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactCounter />

      {/* Our Approach */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Approach"
            subtitle="We believe in sustainable development through participatory and community-driven initiatives."
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Community Participation</h3>
              <p className="mb-4 text-gray-700">
                We involve community members at every stage of our programs, from planning to implementation and evaluation. This ensures that our initiatives are relevant, accepted, and sustainable in the long run.
              </p>
              <p className="text-gray-700">
                By fostering a sense of ownership among community members, we create a foundation for lasting change that continues beyond our direct involvement.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.2s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Holistic Development</h3>
              <p className="mb-4 text-gray-700">
                We recognize that the challenges faced by communities are interconnected. Therefore, our approach addresses multiple aspects of development simultaneously, including education, health, livelihoods, and environmental sustainability.
              </p>
              <p className="text-gray-700">
                This integrated approach ensures that our interventions create a comprehensive impact on the quality of life of the communities we serve.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.4s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Partnerships and Collaboration</h3>
              <p className="mb-4 text-gray-700">
                We believe in the power of collaboration and work closely with government agencies, other NGOs, corporate partners, and academic institutions to leverage resources, expertise, and networks.
              </p>
              <p className="text-gray-700">
                These partnerships enable us to expand our reach, enhance our capabilities, and maximize the impact of our programs.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.6s] rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Innovation and Learning</h3>
              <p className="mb-4 text-gray-700">
                We continuously seek innovative solutions to address complex social challenges. Our programs are designed based on evidence and best practices, and we regularly evaluate and adapt our approaches based on learnings.
              </p>
              <p className="text-gray-700">
                This culture of innovation and learning allows us to stay relevant, effective, and impactful in our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Partners"
            subtitle="We are grateful to our partners who support our mission and help us make a difference."
          />

          <div className="flex flex-wrap items-center justify-center gap-8">
            {siteData.donors.map((donor) => (
              <a
                key={donor.id}
                href={donor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="filter grayscale transition-all duration-300 hover:filter-none"
              >
                <img
                  src={donor.logo}
                  alt={donor.name}
                  className="h-16 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
