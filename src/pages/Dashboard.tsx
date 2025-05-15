
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BudgetTracker from "@/components/dashboard/BudgetTracker";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import SmartInsights from "@/components/dashboard/SmartInsights";
import FeaturedContent from "@/components/dashboard/FeaturedContent";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  const [userName, setUserName] = useState("Jamie");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">{greeting}, {userName}</h1>
            <div className="flex md:hidden items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle size={20} />
              </Button>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative hidden md:block mr-4">
              <Search size={18} className="absolute left-2.5 top-2.5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-64 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Cards */}
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Financial Overview</h2>
          <DashboardOverview />
          
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <RecentTransactions />
              <SpendingBreakdown />
            </div>
            <div className="space-y-6">
              <SmartInsights />
              <BudgetTracker />
            </div>
          </div>
          
          {/* Featured Content */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Recommended For You</h2>
            <FeaturedContent />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
