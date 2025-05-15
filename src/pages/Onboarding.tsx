
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Check, BookOpen, GraduationCap, Pound, Award, School } from "lucide-react";

const OnboardingStep1 = ({ onNext }: { onNext: () => void }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to UniFinance!</CardTitle>
        <CardDescription>
          Your gateway to finding and securing funding for your UK education
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-4 bg-uni-purple-100 rounded-full mb-4">
            <Award className="w-10 h-10 text-uni-purple-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Find Your Perfect Funding</h3>
          <p className="text-muted-foreground">
            Access thousands of scholarships, grants, and bursaries tailored to your specific situation.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-uni-purple-100 p-1 rounded-full mr-3">
              <Check className="h-4 w-4 text-uni-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Personalized Recommendations</h4>
              <p className="text-sm text-muted-foreground">Get funding matches based on your profile and preferences</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-uni-purple-100 p-1 rounded-full mr-3">
              <Check className="h-4 w-4 text-uni-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Application Tracking</h4>
              <p className="text-sm text-muted-foreground">Organize and track all your funding applications in one place</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-uni-purple-100 p-1 rounded-full mr-3">
              <Check className="h-4 w-4 text-uni-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Expert Guidance</h4>
              <p className="text-sm text-muted-foreground">AI-powered assistant to help with application queries</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext} className="w-full sm:w-auto">
          Let's Get Started <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const OnboardingStep2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
        <CardDescription>
          This helps us find the right funding opportunities for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Enter your last name" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="Enter your email address" />
        </div>
        
        <div className="space-y-2">
          <Label>Your current status</Label>
          <RadioGroup defaultValue="undergraduate">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pre-university" id="pre-university" />
              <Label htmlFor="pre-university">Pre-University</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="undergraduate" id="undergraduate" />
              <Label htmlFor="undergraduate">Undergraduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="postgraduate" id="postgraduate" />
              <Label htmlFor="postgraduate">Postgraduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phd" id="phd" />
              <Label htmlFor="phd">PhD/Doctorate</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="university">University (Current or Planned)</Label>
          <Input id="university" placeholder="Enter university name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Field of Study</Label>
          <Input id="subject" placeholder="Enter your subject or course" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const OnboardingStep3 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Funding Preferences</CardTitle>
        <CardDescription>
          Help us find the most relevant opportunities for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>What type of funding are you looking for?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="type-scholarship" />
              <Label htmlFor="type-scholarship">Scholarships</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-grant" />
              <Label htmlFor="type-grant">Grants</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-bursary" />
              <Label htmlFor="type-bursary">Bursaries</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-prize" />
              <Label htmlFor="type-prize">Prizes & Awards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-hardship" />
              <Label htmlFor="type-hardship">Hardship Funds</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Eligibility factors that apply to you</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-academic" />
              <Label htmlFor="eligible-academic">Academic Merit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-financial" />
              <Label htmlFor="eligible-financial">Financial Need</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-firstgen" />
              <Label htmlFor="eligible-firstgen">First Generation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-international" />
              <Label htmlFor="eligible-international">International</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-disability" />
              <Label htmlFor="eligible-disability">Disability</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eligible-location" />
              <Label htmlFor="eligible-location">Location Based</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Minimum funding amount you're looking for</Label>
          <RadioGroup defaultValue="any">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="amount-any" />
              <Label htmlFor="amount-any">Any amount</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="500" id="amount-500" />
              <Label htmlFor="amount-500">£500+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1000" id="amount-1000" />
              <Label htmlFor="amount-1000">£1,000+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5000" id="amount-5000" />
              <Label htmlFor="amount-5000">£5,000+</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext}>
          See Your Plan <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const OnboardingStep4 = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Plan</CardTitle>
        <CardDescription>
          Select the right plan to unlock funding opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup defaultValue="premium" className="space-y-4">
          <div className="relative">
            <div className="absolute -right-1 -top-1 bg-uni-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              BEST VALUE
            </div>
            <div className="flex items-start space-x-3 border p-4 rounded-lg border-uni-purple-600 bg-uni-purple-50">
              <RadioGroupItem value="premium" id="plan-premium" className="mt-1" />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <Label htmlFor="plan-premium" className="font-bold text-lg">Premium</Label>
                  <div className="text-right">
                    <span className="font-bold text-lg">£19.99</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Unlock all features and maximize your funding potential</p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm flex items-center">
                    <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                    Full access to all funding opportunities
                  </li>
                  <li className="text-sm flex items-center">
                    <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                    AI grant assistant for application help
                  </li>
                  <li className="text-sm flex items-center">
                    <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                    Application tracking system
                  </li>
                  <li className="text-sm flex items-center">
                    <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                    Personalized recommendations
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 border p-4 rounded-lg">
            <RadioGroupItem value="basic" id="plan-basic" className="mt-1" />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <Label htmlFor="plan-basic" className="font-bold text-lg">Basic</Label>
                <div className="text-right">
                  <span className="font-bold text-lg">£9.99</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Get started with essential funding tools</p>
              <ul className="mt-2 space-y-1">
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  Access to basic funding database
                </li>
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  Save up to 5 opportunities
                </li>
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  Basic eligibility checker
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 border p-4 rounded-lg">
            <RadioGroupItem value="custom" id="plan-custom" className="mt-1" />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <Label htmlFor="plan-custom" className="font-bold text-lg">Custom</Label>
                <div className="text-right">
                  <span className="font-bold text-lg">Custom</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Tailored solutions for institutions and groups</p>
              <ul className="mt-2 space-y-1">
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  All premium features
                </li>
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  Custom funding sources
                </li>
                <li className="text-sm flex items-center">
                  <Check className="h-3 w-3 mr-2 text-uni-purple-600" />
                  Branded interface
                </li>
              </ul>
            </div>
          </div>
        </RadioGroup>
        
        <div className="pt-4">
          <p className="text-sm text-center text-muted-foreground">
            All plans include a 14-day money-back guarantee. You can cancel anytime.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onFinish}>
          Complete Setup <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const OnboardingComplete = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="text-2xl">You're all set!</CardTitle>
        <CardDescription>
          Your account has been created and your plan is active
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p>
          We've found <span className="font-bold text-uni-purple-600">32 funding opportunities</span> that match your profile.
        </p>
        <p className="text-sm text-muted-foreground">
          You can now explore these opportunities and start tracking your applications.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={() => navigate('/grants')} size="lg">
          Explore Funding Opportunities
        </Button>
      </CardFooter>
    </Card>
  );
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const finishOnboarding = () => {
    // Implement payment processing or redirect
    setStep(5);
    // Eventually navigate to grants page
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="py-4 px-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-display text-xl text-uni-purple-700 font-bold">
            Uni<span className="text-uni-purple-500">Finance</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground">
            Exit Setup
          </Link>
        </div>
      </header>
      
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress indicator */}
          {step < 5 && (
            <div className="mb-8 max-w-lg mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Get Started</span>
                <span className="font-medium">Complete</span>
              </div>
              <Progress value={(step / 4) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Step {step} of 4</span>
                <span>{Math.round((step / 4) * 100)}% complete</span>
              </div>
            </div>
          )}
          
          {/* Step content */}
          <div className="mt-8">
            {step === 1 && <OnboardingStep1 onNext={nextStep} />}
            {step === 2 && <OnboardingStep2 onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <OnboardingStep3 onNext={nextStep} onBack={prevStep} />}
            {step === 4 && <OnboardingStep4 onFinish={finishOnboarding} onBack={prevStep} />}
            {step === 5 && <OnboardingComplete />}
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 UniFinance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Onboarding;
