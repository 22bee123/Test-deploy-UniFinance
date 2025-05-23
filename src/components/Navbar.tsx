
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, Home, CircleDollarSign, CreditCard, HelpCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "@/components/auth/AuthModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Helper function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <span className="font-display text-xl text-uni-purple-700 font-bold">
                  Uni<span className="text-uni-purple-500">Finance</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/") 
                    ? "border-uni-purple-500 text-uni-purple-700" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            
              
              <Link 
                to="/pricing" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/pricing")
                    ? "border-uni-purple-500 text-uni-purple-700" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pricing
              </Link>
              
              <Link 
                to="/dashboard" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/dashboard")
                    ? "border-uni-purple-500 text-uni-purple-700" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Link>
              
              <Link 
                to="/ai-assistant" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/ai-assistant")
                    ? "border-uni-purple-500 text-uni-purple-700" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <Bot className="mr-2 h-4 w-4" />
                AI Assistant
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <AuthModal defaultTab="signup">
              <Button variant="default" className="hidden md:block mr-3">
                <span className="font-medium">Get Started</span>
              </Button>
            </AuthModal>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-uni-purple-200 text-uni-purple-700">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] pt-10">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="font-display text-xl text-uni-purple-700 font-bold">
                      Uni<span className="text-uni-purple-500">Finance</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/" 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium",
                        isActive("/") 
                          ? "bg-uni-purple-50 text-uni-purple-700" 
                          : "hover:bg-uni-purple-50 hover:text-uni-purple-700"
                      )}
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Home
                    </Link>
                    
                    <Link 
                      to="/grants-and-funding" 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium",
                        isActive("/grants") || isActive("/grants-and-funding")
                          ? "bg-uni-purple-50 text-uni-purple-700" 
                          : "hover:bg-uni-purple-50 hover:text-uni-purple-700"
                      )}
                    >
                      <CircleDollarSign className="mr-2 h-5 w-5" />
                      Grants & Funding
                    </Link>
                    
                    <Link 
                      to="/pricing" 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium",
                        isActive("/pricing")
                          ? "bg-uni-purple-50 text-uni-purple-700" 
                          : "hover:bg-uni-purple-50 hover:text-uni-purple-700"
                      )}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pricing
                    </Link>
                    
                    <Link 
                      to="/dashboard" 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium",
                        isActive("/dashboard")
                          ? "bg-uni-purple-50 text-uni-purple-700" 
                          : "hover:bg-uni-purple-50 hover:text-uni-purple-700"
                      )}
                    >
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Help Center
                    </Link>
                    
                    <Link 
                      to="/ai-assistant" 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-base font-medium",
                        isActive("/ai-assistant")
                          ? "bg-uni-purple-50 text-uni-purple-700" 
                          : "hover:bg-uni-purple-50 hover:text-uni-purple-700"
                      )}
                    >
                      <Bot className="mr-2 h-5 w-5" />
                      AI Assistant
                    </Link>
                    
                    <div className="mt-4 pt-4 border-t">
                      <AuthModal defaultTab="signup">
                        <Button variant="default" className="w-full">
                          Get Started
                        </Button>
                      </AuthModal>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
