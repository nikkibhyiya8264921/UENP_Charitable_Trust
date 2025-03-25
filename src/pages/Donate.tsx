
import SectionTitle from "@/components/SectionTitle";
import DonationForm from "@/components/DonationForm";
import FaqAccordion from "@/components/FaqAccordion";
import { CheckCircle, Heart, CreditCard, FileText, Diamond } from "lucide-react";

const Donate = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/images/slider/education.jpg"
            alt="Donate"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="animate-fade-in-up">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Donate
            </h1>
            <p className="text-xl text-white/90">
              Your generosity can transform lives and communities
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Why Donate to Us?"
            subtitle="Your donation makes a real difference in the lives of the communities we serve."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="animate-fade-in rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
                <CheckCircle size={28} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Transparent Usage</h3>
              <p className="text-gray-700">
                We ensure complete transparency in how your donations are
                utilized, with regular updates and impact reports.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.2s] rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
                <Heart size={28} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Direct Impact</h3>
              <p className="text-gray-700">
                Your donation directly supports our programs and initiatives,
                creating a tangible impact on the ground.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.4s] rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
                <CreditCard size={28} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Tax Benefits</h3>
              <p className="text-gray-700">
                All donations are eligible for tax benefits under Section 80G of
                the Income Tax Act, with certificates provided promptly.
              </p>
            </div>

            <div className="animate-fade-in [animation-delay:0.6s] rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
                <FileText size={28} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Regular Updates</h3>
              <p className="text-gray-700">
                We keep you informed about the progress and impact of our
                programs through regular newsletters and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold">Make a Donation</h2>
              <p className="mb-6 text-gray-700">
                Your support enables us to continue our work for the betterment
                of underprivileged communities. Every contribution, big or small,
                makes a significant impact.
              </p>

              <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-semibold">How Your Donation Helps</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-ngo-green text-white">
                      <CheckCircle size={20} className="h-5 w-5" />
                    </div>
                    <span>
                      <strong>₹500</strong> - Provides educational materials for a child for a month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-ngo-green text-white">
                      <CheckCircle size={20} className="h-5 w-5" />
                    </div>
                    <span>
                      <strong>₹1,000</strong> - Sponsors a health check-up camp for 10 individuals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-ngo-green text-white">
                      <CheckCircle size={20} className="h-5 w-5" />
                    </div>
                    <span>
                      <strong>₹2,000</strong> - Provides skill training for a woman for a month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-ngo-green text-white">
                      <CheckCircle size={20} className="h-5 w-5" />
                    </div>
                    <span>
                      <strong>₹5,000</strong> - Funds clean water initiatives for a village
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-ngo-green text-white">
                      <CheckCircle size={20} className="h-5 w-5" />
                    </div>
                    <span>
                      <strong>₹10,000</strong> - Supports comprehensive community development programs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 flex items-center text-xl font-semibold">
                  <Diamond size={20} className="mr-2 text-ngo-orange" />
                  <span>Corporate Partnerships</span>
                </h3>
                <p className="text-gray-700">
                  We also welcome corporate sponsorships and CSR partnerships.
                  Corporates can partner with us through various programs aligned
                  with their CSR objectives.
                </p>
                <p className="mt-3 text-gray-700">
                  For corporate partnerships, please contact us at
                  partnerships@utthaneknayipahal.org or call our partnership
                  team at +91 7668-788-325.
                </p>
              </div>
            </div>

            <div className="animate-fade-in [animation-delay:0.3s]">
              <DonationForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about donations and support."
          />

          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
