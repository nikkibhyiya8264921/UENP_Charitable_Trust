
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useSiteData } from "@/context/SiteDataContext";

const donationFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  amount: z.enum(["500", "1000", "2000", "5000", "10000", "custom"]),
  customAmount: z.string().optional(),
  message: z.string().optional(),
  paymentMethod: z.enum(["card", "upi", "netbanking"]),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = () => {
  const { siteData } = useSiteData();
  const [submitting, setSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "1000",
      paymentMethod: "card",
    },
  });

  const selectedAmount = watch("amount");

  const onSubmit = async (data: DonationFormValues) => {
    setSubmitting(true);
    
    try {
      // In a real application, this would call a payment processing API
      console.log("Donation form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Donation Submitted",
        description: `Thank you for your donation of ₹${data.amount === "custom" ? data.customAmount : data.amount}!`,
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Could not process your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            {...register("phone")}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Donation Amount</Label>
          <RadioGroup defaultValue="1000" {...register("amount")}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="500" id="amount-500" />
                <Label htmlFor="amount-500" className="cursor-pointer">₹500</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1000" id="amount-1000" />
                <Label htmlFor="amount-1000" className="cursor-pointer">₹1,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2000" id="amount-2000" />
                <Label htmlFor="amount-2000" className="cursor-pointer">₹2,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5000" id="amount-5000" />
                <Label htmlFor="amount-5000" className="cursor-pointer">₹5,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10000" id="amount-10000" />
                <Label htmlFor="amount-10000" className="cursor-pointer">₹10,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="amount-custom" />
                <Label htmlFor="amount-custom" className="cursor-pointer">Custom</Label>
              </div>
            </div>
          </RadioGroup>
          
          {selectedAmount === "custom" && (
            <div className="mt-4">
              <Label htmlFor="customAmount">Enter Amount (₹)</Label>
              <Input
                id="customAmount"
                type="number"
                placeholder="Enter custom amount"
                {...register("customAmount")}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Share your thoughts or specify the purpose of donation"
            {...register("message")}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <RadioGroup defaultValue="card" {...register("paymentMethod")}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="payment-card" />
                <Label htmlFor="payment-card" className="cursor-pointer">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="payment-upi" />
                <Label htmlFor="payment-upi" className="cursor-pointer">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="netbanking" id="payment-netbanking" />
                <Label htmlFor="payment-netbanking" className="cursor-pointer">Net Banking</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-ngo-orange hover:bg-ngo-orange/90"
          disabled={submitting}
        >
          {submitting ? "Processing..." : "Donate Now"}
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Your donation is tax-deductible under Section 80G of the Income Tax Act, 1961.
          A receipt will be sent to your email upon successful payment.
        </p>
      </form>
    </div>
  );
};

export default DonationForm;
