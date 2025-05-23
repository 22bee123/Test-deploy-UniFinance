
import { useState, useEffect } from "react";
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
import { ChevronRight, ChevronLeft, Check, BookOpen, GraduationCap, PoundSterling, Award, School } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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

const OnboardingStep2 = ({ onNext, onBack, formData, setFormData }: { onNext: () => void; onBack: () => void; formData: any; setFormData: (data: any) => void }) => {
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
            <Input 
              id="first-name" 
              placeholder="Enter your first name" 
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input 
              id="last-name" 
              placeholder="Enter your last name" 
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email address" 
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Your current status</Label>
          <RadioGroup 
            value={formData.educationLevel || "undergraduate"}
            onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
          >
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
          <Input 
            id="university" 
            placeholder="Enter university name" 
            value={formData.university || ''}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Field of Study</Label>
          <Input 
            id="subject" 
            placeholder="Enter your subject or course" 
            value={formData.fieldOfStudy || ''}
            onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
            required
          />
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

const OnboardingStep3 = ({ onNext, onBack, formData, setFormData }: { onNext: () => void; onBack: () => void; formData: any; setFormData: (data: any) => void }) => {
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
              <Checkbox 
                id="type-scholarship" 
                checked={formData.fundingTypes?.includes('scholarship') || false}
                onCheckedChange={(checked) => {
                  const types = formData.fundingTypes || [];
                  setFormData({
                    ...formData,
                    fundingTypes: checked 
                      ? [...types, 'scholarship']
                      : types.filter((t: string) => t !== 'scholarship')
                  });
                }}
              />
              <Label htmlFor="type-scholarship">Scholarships</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="type-grant" 
                checked={formData.fundingTypes?.includes('grant') || false}
                onCheckedChange={(checked) => {
                  const types = formData.fundingTypes || [];
                  setFormData({
                    ...formData,
                    fundingTypes: checked 
                      ? [...types, 'grant']
                      : types.filter((t: string) => t !== 'grant')
                  });
                }}
              />
              <Label htmlFor="type-grant">Grants</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="type-bursary" 
                checked={formData.fundingTypes?.includes('bursary') || false}
                onCheckedChange={(checked) => {
                  const types = formData.fundingTypes || [];
                  setFormData({
                    ...formData,
                    fundingTypes: checked 
                      ? [...types, 'bursary']
                      : types.filter((t: string) => t !== 'bursary')
                  });
                }}
              />
              <Label htmlFor="type-bursary">Bursaries</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="type-prize" 
                checked={formData.fundingTypes?.includes('prize') || false}
                onCheckedChange={(checked) => {
                  const types = formData.fundingTypes || [];
                  setFormData({
                    ...formData,
                    fundingTypes: checked 
                      ? [...types, 'prize']
                      : types.filter((t: string) => t !== 'prize')
                  });
                }}
              />
              <Label htmlFor="type-prize">Prizes & Awards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="type-hardship" 
                checked={formData.fundingTypes?.includes('hardship') || false}
                onCheckedChange={(checked) => {
                  const types = formData.fundingTypes || [];
                  setFormData({
                    ...formData,
                    fundingTypes: checked 
                      ? [...types, 'hardship']
                      : types.filter((t: string) => t !== 'hardship')
                  });
                }}
              />
              <Label htmlFor="type-hardship">Hardship Funds</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Eligibility factors that apply to you</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-academic" 
                checked={formData.eligibilityFactors?.includes('academic') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'academic']
                      : factors.filter((f: string) => f !== 'academic')
                  });
                }}
              />
              <Label htmlFor="eligible-academic">Academic Merit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-financial" 
                checked={formData.eligibilityFactors?.includes('financial') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'financial']
                      : factors.filter((f: string) => f !== 'financial')
                  });
                }}
              />
              <Label htmlFor="eligible-financial">Financial Need</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-firstgen" 
                checked={formData.eligibilityFactors?.includes('firstgen') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'firstgen']
                      : factors.filter((f: string) => f !== 'firstgen')
                  });
                }}
              />
              <Label htmlFor="eligible-firstgen">First Generation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-international" 
                checked={formData.eligibilityFactors?.includes('international') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'international']
                      : factors.filter((f: string) => f !== 'international')
                  });
                }}
              />
              <Label htmlFor="eligible-international">International</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-disability" 
                checked={formData.eligibilityFactors?.includes('disability') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'disability']
                      : factors.filter((f: string) => f !== 'disability')
                  });
                }}
              />
              <Label htmlFor="eligible-disability">Disability</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="eligible-location" 
                checked={formData.eligibilityFactors?.includes('location') || false}
                onCheckedChange={(checked) => {
                  const factors = formData.eligibilityFactors || [];
                  setFormData({
                    ...formData,
                    eligibilityFactors: checked 
                      ? [...factors, 'location']
                      : factors.filter((f: string) => f !== 'location')
                  });
                }}
              />
              <Label htmlFor="eligible-location">Location Based</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Minimum funding amount you're looking for</Label>
          <RadioGroup 
            value={formData.minimumAmount || "any"}
            onValueChange={(value) => setFormData({ ...formData, minimumAmount: value })}
          >
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

const OnboardingStep4 = ({ onFinish, onBack, formData, setFormData }: { onFinish: () => void; onBack: () => void; formData: any; setFormData: (data: any) => void }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Plan</CardTitle>
        <CardDescription>
          Select the right plan to unlock funding opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={formData.selectedPlan || "premium"} 
          onValueChange={(value) => setFormData({ ...formData, selectedPlan: value })}
          className="space-y-4"
        >
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    educationLevel: 'undergraduate',
    university: '',
    fieldOfStudy: '',
    fundingTypes: ['scholarship', 'grant'],
    eligibilityFactors: [],
    minimumAmount: 'any',
    selectedPlan: 'premium'
  });
  
  // Get current user
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const getUserId = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUserId(data.user.id);
          
          // Check if user has already completed onboarding
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
            
          if (profileData && !profileError) {
            // User has already completed onboarding, redirect to grants page
            console.log('User already onboarded, redirecting to grants page');
            navigate('/grants');
            return;
          }
          
          // Pre-fill email if available
          if (data.user.email) {
            setFormData(prev => ({
              ...prev,
              email: data.user.email
            }));
          }
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUserId();
  }, [navigate]);
  
  const nextStep = () => {
    // Simple validation for step 2
    if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.university || !formData.fieldOfStudy) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Simple validation for step 3
    if (step === 3) {
      if (!formData.fundingTypes || formData.fundingTypes.length === 0) {
        toast({
          title: "Missing information",
          description: "Please select at least one funding type",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const finishOnboarding = async () => {
    if (!userId) {
      toast({
        title: "Authentication error",
        description: "Please sign in to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store user profile data in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          education_level: formData.educationLevel,
          university: formData.university,
          field_of_study: formData.fieldOfStudy,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      // Store funding preferences in Supabase
      const { error: prefError } = await supabase
        .from('funding_preferences')
        .upsert({
          user_id: userId,
          funding_types: formData.fundingTypes,
          eligibility_factors: formData.eligibilityFactors,
          minimum_amount: formData.minimumAmount,
          selected_plan: formData.selectedPlan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (prefError) throw prefError;
      
      // Success - move to completion step
      setStep(5);
    } catch (error: any) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Error saving your information",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-purple-600 mb-4"></div>
              <p className="text-uni-purple-700 font-medium">Checking your account status...</p>
            </div>
          ) : (
            <>
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
                {step === 2 && <OnboardingStep2 onNext={nextStep} onBack={prevStep} formData={formData} setFormData={setFormData} />}
                {step === 3 && <OnboardingStep3 onNext={nextStep} onBack={prevStep} formData={formData} setFormData={setFormData} />}
                {step === 4 && <OnboardingStep4 onFinish={finishOnboarding} onBack={prevStep} formData={formData} setFormData={setFormData} />}
                {step === 5 && <OnboardingComplete />}
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 UniFinance. All rights reserved.</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Onboarding;
