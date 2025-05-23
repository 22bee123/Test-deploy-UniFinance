import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { supabase, signUpWithEmail, signInWithGoogle } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Check for error parameter in URL
  useEffect(() => {
    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: errorMessage
      });
    }
  }, [searchParams, toast]);
  
  // Redirect if already logged in
  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        console.log('User detected in Signup component:', user);
        
        try {
          // Check if user has already completed onboarding
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          console.log('Profile check in Signup:', profileData, profileError);
          
          if (profileData && !profileError) {
            // User has completed onboarding, redirect to grants page
            console.log('User has profile, redirecting to grants');
            navigate('/grants');
          } else {
            // New user or incomplete profile, redirect to onboarding
            console.log('New user or no profile, redirecting to onboarding');
            navigate('/onboarding');
          }
        } catch (error) {
          console.error('Error checking user profile in Signup:', error);
          // Default to onboarding if there's an error
          navigate('/onboarding');
        }
      }
    };
    
    checkUserStatus();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create user metadata with first and last name
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        full_name: `${formData.firstName} ${formData.lastName}`
      };

      const { data, error } = await signUpWithEmail(formData.email, formData.password, metadata);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error.message || "Please check your information and try again."
        });
        console.error("Signup error:", error);
      } else {
        toast({
          title: "Signup successful",
          description: "Please check your email to confirm your account."
        });
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Signup exception:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          variant: "destructive",
          title: "Google signup failed",
          description: error.message
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast({
        variant: "destructive",
        title: "Google signup failed",
        description: "An unexpected error occurred."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength requirements
  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "At least one number", met: /[0-9]/.test(formData.password) },
    { text: "At least one special character", met: /[^A-Za-z0-9]/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-uni-purple-600 hover:text-uni-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join <span className="text-uni-purple-700">Uni<span className="text-uni-purple-500">Finance</span></span> today
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account and start your financial journey
          </p>
        </div>
        
        <Card className="shadow-lg border-uni-purple-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    placeholder="John" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    placeholder="Doe" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-10 focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <div className="mt-2 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle2 
                        className={`h-4 w-4 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`} 
                      />
                      <span className={req.met ? 'text-green-700' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                />
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="agree-terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="h-4 w-4 text-uni-purple-600 focus:ring-uni-purple-500"
                  required
                />
                <Label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium text-uni-purple-600 hover:text-uni-purple-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-uni-purple-600 hover:text-uni-purple-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-uni-purple-600 hover:bg-uni-purple-700 focus:ring-uni-purple-500"
                disabled={isLoading || !agreeTerms || formData.password !== formData.confirmPassword}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-uni-purple-600 hover:text-uni-purple-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link to="/help" className="font-medium text-uni-purple-600 hover:text-uni-purple-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
