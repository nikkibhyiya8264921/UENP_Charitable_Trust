
import { useSiteData } from "@/context/SiteDataContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqAccordion = () => {
  const { siteData } = useSiteData();

  return (
    <Accordion type="single" collapsible className="w-full">
      {siteData.faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-gray-200">
          <AccordionTrigger className="text-left font-medium hover:text-ngo-orange">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
