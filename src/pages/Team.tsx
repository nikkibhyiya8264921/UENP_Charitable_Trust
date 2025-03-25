
import { useSiteData } from "@/context/SiteDataContext";
import SectionTitle from "@/components/SectionTitle";
import TeamMemberCard from "@/components/TeamMemberCard";

const Team = () => {
  const { siteData } = useSiteData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/slider/women-empowerment.jpg"
            alt="Our Team"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="animate-fade-in-up">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Team
            </h1>
            <p className="text-xl text-white/90">
              Meet the dedicated individuals driving our mission forward
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Leadership Team"
            subtitle="Our experienced leadership team guides our organization's vision and impact."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteData.team.map((member) => (
              <TeamMemberCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold">Join Our Team</h2>
              <p className="mb-4 text-gray-700">
                We are always looking for passionate individuals who share our
                vision of creating a positive impact in the communities we serve.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold">Why Work With Us?</h3>
                  <ul className="ml-6 list-disc space-y-2 text-gray-700">
                    <li>Opportunity to make a meaningful impact</li>
                    <li>Collaborative and supportive work environment</li>
                    <li>Professional growth and skill development</li>
                    <li>Exposure to diverse projects and communities</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold">Current Openings</h3>
                  <p className="text-gray-700">
                    We currently have openings for the following positions:
                  </p>
                  <ul className="ml-6 mt-3 list-disc space-y-2 text-gray-700">
                    <li>Program Coordinator - Education Initiative</li>
                    <li>Community Outreach Officer</li>
                    <li>Fundraising Specialist</li>
                    <li>Social Media Manager</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="animate-fade-in [animation-delay:0.3s]">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-xl font-semibold">
                  Application Process
                </h3>
                <ol className="ml-6 list-decimal space-y-4 text-gray-700">
                  <li>
                    <strong>Submit Your Application:</strong> Send your resume
                    and a cover letter to careers@utthaneknayipahal.org
                    mentioning the position you're applying for in the subject
                    line.
                  </li>
                  <li>
                    <strong>Initial Screening:</strong> Our HR team will review
                    your application and shortlist candidates based on
                    qualifications and experience.
                  </li>
                  <li>
                    <strong>Interview Process:</strong> Shortlisted candidates
                    will be invited for interviews (online or in-person) with our
                    team.
                  </li>
                  <li>
                    <strong>Selection:</strong> Selected candidates will receive
                    an offer letter with details about the role, compensation,
                    and joining date.
                  </li>
                </ol>

                <div className="mt-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    Volunteer Opportunities
                  </h3>
                  <p className="text-gray-700">
                    Not looking for a full-time role? You can still contribute to
                    our cause by volunteering your time and skills. We welcome
                    volunteers in various capacities, from teaching and
                    healthcare to digital marketing and event management.
                  </p>
                  <p className="mt-4 text-gray-700">
                    To learn more about volunteer opportunities, please send an
                    email to volunteer@utthaneknayipahal.org with your area of
                    interest and availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
