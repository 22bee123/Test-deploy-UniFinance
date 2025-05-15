import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from "@/lib/supabase";

interface AuthModalProps {
  children: React.ReactNode;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ children, defaultTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { data, error } = await signInWithEmail(loginData.email, loginData.password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Please check your credentials and try again."
        });
        console.error("Login error:", error);
      } else if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
        setOpen(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login exception:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match."
      });
      return;
    }

    setSignupLoading(true);

    try {
      // Create user metadata with first and last name
      const metadata = {
        first_name: signupData.firstName,
        last_name: signupData.lastName,
        full_name: `${signupData.firstName} ${signupData.lastName}`
      };

      const { data, error } = await signUpWithEmail(signupData.email, signupData.password, metadata);
      
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
        setOpen(false);
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
      setSignupLoading(false);
    }
  };

  // Password strength requirements
  const passwordRequirements = [
    { text: "At least 8 characters", met: signupData.password.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(signupData.password) },
    { text: "At least one number", met: /[0-9]/.test(signupData.password) },
    { text: "At least one special character", met: /[^A-Za-z0-9]/.test(signupData.password) },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 overflow-hidden">
        {activeTab === "login" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Welcome back to{" "}
                  <span className="text-uni-purple-700">
                    Uni<span className="text-uni-purple-500">Finance</span>
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Sign in to your account</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="pr-10 focus:border-uni-purple-500 focus:ring-uni-purple-500"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="h-4 w-4 text-uni-purple-600 focus:ring-uni-purple-500"
                    />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-uni-purple-600 hover:text-uni-purple-500"
                      onClick={() => setOpen(false)}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-uni-purple-600 hover:bg-uni-purple-700 focus:ring-uni-purple-500"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
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
                  onClick={async () => {
                    try {
                      setLoginLoading(true);
                      const { error } = await signInWithGoogle();
                      if (error) {
                        toast({
                          variant: "destructive",
                          title: "Google login failed",
                          description: error.message
                        });
                      }
                    } catch (error) {
                      console.error("Google login error:", error);
                      toast({
                        variant: "destructive",
                        title: "Google login failed",
                        description: "An unexpected error occurred."
                      });
                    } finally {
                      setLoginLoading(false);
                    }
                  }}
                  disabled={loginLoading}
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

              <div className="text-center text-sm text-gray-500">
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-uni-purple-600 hover:text-uni-purple-500"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
        )}

        {activeTab === "signup" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Join{" "}
                  <span className="text-uni-purple-700">
                    Uni<span className="text-uni-purple-500">Finance</span>
                  </span>{" "}
                  today
                </h3>
                <p className="text-sm text-gray-500">Create your account</p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
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
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      required
                      className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      className="pr-10 focus:border-uni-purple-500 focus:ring-uni-purple-500"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <CheckCircle2
                          className={`h-3 w-3 mr-1 ${req.met ? "text-green-500" : "text-gray-300"}`}
                        />
                        <span className={req.met ? "text-green-700" : "text-gray-500"}>
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
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className="focus:border-uni-purple-500 focus:ring-uni-purple-500"
                  />
                </div>

                <div className="flex items-start">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="h-4 w-4 mt-1 text-uni-purple-600 focus:ring-uni-purple-500"
                    required
                  />
                  <Label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-uni-purple-600 hover:text-uni-purple-500"
                      onClick={() => setOpen(false)}
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-uni-purple-600 hover:text-uni-purple-500"
                      onClick={() => setOpen(false)}
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-uni-purple-600 hover:bg-uni-purple-700 focus:ring-uni-purple-500"
                  disabled={
                    signupLoading ||
                    !agreeTerms ||
                    signupData.password !== signupData.confirmPassword
                  }
                >
                  {signupLoading ? (
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
                  onClick={async () => {
                    try {
                      setSignupLoading(true);
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
                      setSignupLoading(false);
                    }
                  }}
                  disabled={signupLoading}
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

              <div className="text-center text-sm text-gray-500">
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-uni-purple-600 hover:text-uni-purple-500"
                    onClick={() => setActiveTab("login")}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
