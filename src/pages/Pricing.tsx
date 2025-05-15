
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const PricingTier = ({
  name,
  price,
  description,
  features,
  recommended = false,
  buttonText,
  onButtonClick,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText: string;
  onButtonClick: () => void;
}) => {
  return (
    <div 
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col",
        recommended ? "border-uni-purple-600 ring-2 ring-uni-purple-200" : "border-border"
      )}
    >
      {recommended && (
        <div className="bg-uni-purple-600 py-1.5 px-4 text-white text-sm font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          Recommended
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-3">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
        
        <div className="mt-6 space-y-3 flex-grow">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-1 text-uni-purple-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="mt-6 w-full"
          variant={recommended ? "default" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleBasicPlan = () => {
    // Implement payment flow for basic plan
    toast({
      title: "Basic Plan Selected",
      description: "You've selected the Basic plan. Please complete your payment to get started.",
    });
  };
  
  const handlePremiumPlan = () => {
    // Implement payment flow for premium plan
    toast({
      title: "Premium Plan Selected",
      description: "You've selected our Premium plan. Please complete your payment to get started.",
    });
  };
  
  const handleCustomPlan = () => {
    // Handle custom plan contact form
    toast({
      title: "Custom Plan Inquiry",
      description: "Thank you for your interest in a custom plan. We'll contact you shortly.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose the right plan for you</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get access to our comprehensive funding database and tools to help you secure financial support for your education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier
              name="Basic"
              price="£9.99"
              description="Perfect for getting started with funding opportunities"
              features={[
                "Access to funding database",
                "Basic search filters",
                "Save up to 5 opportunities",
                "Application deadline reminders",
                "Basic eligibility checker"
              ]}
              buttonText="Get Started"
              onButtonClick={handleBasicPlan}
            />
            
            <PricingTier
              name="Premium"
              price="£19.99"
              description="Complete access to all features and tools"
              recommended={true}
              features={[
                "Access to complete funding database",
                "Advanced search and filters",
                "Unlimited saved opportunities",
                "Application tracking system",
                "AI grant assistant",
                "Document templates",
                "Personalized recommendations",
                "Email notifications"
              ]}
              buttonText="Get Premium"
              onButtonClick={handlePremiumPlan}
            />
            
            <PricingTier
              name="Custom"
              price="Custom"
              description="Tailored solutions for institutions and groups"
              features={[
                "All Premium features",
                "Bulk student accounts",
                "Custom funding sources",
                "Branded interface",
                "Analytics dashboard",
                "API access",
                "Dedicated support",
                "Training sessions"
              ]}
              buttonText="Contact Us"
              onButtonClick={handleCustomPlan}
            />
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <h2 className="text-2xl font-semibold mb-4">Not sure which plan is right for you?</h2>
            <Button variant="link" asChild size="lg">
              <Link to="/onboarding">Take our assessment quiz</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

import { cn } from "@/lib/utils";
export default Pricing;
