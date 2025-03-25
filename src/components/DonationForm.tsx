
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  IndianRupee,
  Heart,
  DollarSign,
  Euro,
  Wallet,
  BanknoteIcon,
  CheckCircle2,
} from "lucide-react";

const DonationForm = () => {
  const [donationAmount, setDonationAmount] = useState<string>("1000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("INR");
  const [donationFrequency, setDonationFrequency] = useState<string>("onetime");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDonorInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresetAmountClick = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setDonationAmount("custom");
  };

  const getFinalAmount = () => {
    return donationAmount === "custom" ? customAmount : donationAmount;
  };

  const getSymbol = () => {
    switch (currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      default:
        return "₹";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      toast.success("Thank you for your generous donation!");
    }, 2000);
  };

  const resetForm = () => {
    setDonationAmount("1000");
    setCustomAmount("");
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    });
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Donation Successful!</h2>
        <p className="text-lg text-gray-700">
          Thank you for your generous donation of {getSymbol()}
          {getFinalAmount()}. Your contribution will help us make a meaningful
          impact.
        </p>
        <p className="text-gray-600">
          A receipt has been sent to your email address.
        </p>
        <Button
          onClick={resetForm}
          className="mt-4 rounded-md bg-ngo-orange px-6 py-3 text-white hover:bg-ngo-orange/90"
        >
          Make Another Donation
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Donation Amount Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Donation Amount</h3>
          <div className="mb-6 grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "500" &&
                donationAmount !== "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => handlePresetAmountClick("500")}
            >
              <IndianRupee size={16} className="mr-1" />
              500
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "1000" &&
                donationAmount !== "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => handlePresetAmountClick("1000")}
            >
              <IndianRupee size={16} className="mr-1" />
              1,000
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "2000" &&
                donationAmount !== "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => handlePresetAmountClick("2000")}
            >
              <IndianRupee size={16} className="mr-1" />
              2,000
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "5000" &&
                donationAmount !== "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => handlePresetAmountClick("5000")}
            >
              <IndianRupee size={16} className="mr-1" />
              5,000
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "10000" &&
                donationAmount !== "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => handlePresetAmountClick("10000")}
            >
              <IndianRupee size={16} className="mr-1" />
              10,000
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-16 ${
                donationAmount === "custom" &&
                "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
              }`}
              onClick={() => {
                setDonationAmount("custom");
                document.getElementById("customAmount")?.focus();
              }}
            >
              Custom
            </Button>
          </div>

          {donationAmount === "custom" && (
            <div className="mb-4">
              <Label htmlFor="customAmount" className="mb-2 block">
                Enter Amount
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500">{getSymbol()}</span>
                </div>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-8"
                  required={donationAmount === "custom"}
                  min="10"
                />
              </div>
            </div>
          )}

          <div className="mb-4 mt-6">
            <Label className="mb-2 block">Currency</Label>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                className={`${
                  currency === "INR" &&
                  "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
                }`}
                onClick={() => setCurrency("INR")}
              >
                <IndianRupee size={16} className="mr-1" /> INR
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`${
                  currency === "USD" &&
                  "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
                }`}
                onClick={() => setCurrency("USD")}
              >
                <DollarSign size={16} className="mr-1" /> USD
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`${
                  currency === "EUR" &&
                  "border-2 border-ngo-orange bg-ngo-orange/5 text-ngo-orange"
                }`}
                onClick={() => setCurrency("EUR")}
              >
                <Euro size={16} className="mr-1" /> EUR
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Label className="mb-2 block">Donation Frequency</Label>
            <RadioGroup
              defaultValue="onetime"
              value={donationFrequency}
              onValueChange={setDonationFrequency}
              className="flex space-x-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onetime" id="onetime" />
                <Label htmlFor="onetime">One-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annually" id="annually" />
                <Label htmlFor="annually">Annually</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Donor Information Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={donorInfo.name}
                onChange={handleDonorInfoChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={donorInfo.email}
                onChange={handleDonorInfoChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-2 block">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={donorInfo.phone}
                onChange={handleDonorInfoChange}
              />
            </div>
            <div>
              <Label htmlFor="address" className="mb-2 block">
                Address (Optional)
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={donorInfo.address}
                onChange={handleDonorInfoChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="message" className="mb-2 block">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Any message you'd like to add with your donation"
              value={donorInfo.message}
              onChange={handleDonorInfoChange}
              rows={3}
            />
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Payment Method</h3>
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="card" className="flex items-center space-x-2">
                <CreditCard size={18} />
                <span>Card</span>
              </TabsTrigger>
              <TabsTrigger value="upi" className="flex items-center space-x-2">
                <Wallet size={18} />
                <span>UPI</span>
              </TabsTrigger>
              <TabsTrigger
                value="banking"
                className="flex items-center space-x-2"
              >
                <BanknoteIcon size={18} />
                <span>Banking</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="cardNumber" className="mb-2 block">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardName" className="mb-2 block">
                    Cardholder Name
                  </Label>
                  <Input id="cardName" placeholder="Name on card" required />
                </div>
                <div>
                  <Label htmlFor="expiry" className="mb-2 block">
                    Expiry Date
                  </Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div>
                  <Label htmlFor="cvv" className="mb-2 block">
                    CVV
                  </Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="upi">
              <p className="mb-4 text-gray-700">
                Please enter your UPI ID to make the payment directly from your
                linked bank account.
              </p>
              <div>
                <Label htmlFor="upiId" className="mb-2 block">
                  UPI ID
                </Label>
                <Input id="upiId" placeholder="yourname@bank" required />
              </div>
            </TabsContent>
            <TabsContent value="banking">
              <p className="mb-4 text-gray-700">
                After submitting, you will be redirected to our secure banking
                partner to complete the transaction.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="accountName" className="mb-2 block">
                    Account Holder Name
                  </Label>
                  <Input
                    id="accountName"
                    placeholder="Account holder name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bankName" className="mb-2 block">
                    Bank Name
                  </Label>
                  <Input id="bankName" placeholder="Your bank name" required />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Summary and Submit Section */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-3 text-lg font-semibold">Donation Summary</h3>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span>Amount:</span>
            <span className="font-medium">
              {getSymbol()}
              {getFinalAmount() || "0"}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span>Frequency:</span>
            <span className="font-medium capitalize">{donationFrequency}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-ngo-orange">
              {getSymbol()}
              {getFinalAmount() || "0"}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={
            isProcessing ||
            !donorInfo.name ||
            !donorInfo.email ||
            (donationAmount === "custom" && !customAmount)
          }
          className="btn-primary-gradient flex w-full items-center justify-center space-x-2 rounded-md py-3 text-white"
        >
          {isProcessing ? (
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
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Heart size={18} className="animate-pulse-soft" />
              <span>Complete Donation</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DonationForm;
