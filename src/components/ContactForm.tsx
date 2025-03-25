
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-ngo-orange focus:ring-1 focus:ring-ngo-orange"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Your Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-ngo-orange focus:ring-1 focus:ring-ngo-orange"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-ngo-orange focus:ring-1 focus:ring-ngo-orange"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-ngo-orange focus:ring-1 focus:ring-ngo-orange"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Your Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message here..."
          rows={5}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-ngo-orange focus:ring-1 focus:ring-ngo-orange"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary-gradient flex items-center space-x-2 rounded-md px-8 py-3 text-white"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <SendIcon size={18} />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
