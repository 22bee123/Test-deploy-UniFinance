
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Award, GraduationCap, CalendarCheck, PoundSterling } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

// Mock data for demonstration
const mockOpportunities = [
  {
    id: 1,
    title: "Excellence Scholarship",
    provider: "University of Manchester",
    amount: "£3,000",
    type: "scholarship",
    deadline: "2025-06-30",
    eligibility: "Undergraduate students with AAA at A-Level",
    relevanceScore: 95,
    isNew: true,
  },
  {
    id: 2,
    title: "Access Bursary",
    provider: "London School of Economics",
    amount: "£1,500",
    type: "bursary",
    deadline: "2025-07-15",
    eligibility: "Students from households with income under £25,000",
    relevanceScore: 88,
    isNew: true,
  },
  {
    id: 3,
    title: "STEM Research Grant",
    provider: "Royal Society",
    amount: "£5,000",
    type: "grant",
    deadline: "2025-05-20",
    eligibility: "STEM postgraduate students with research proposal",
    relevanceScore: 75,
    isNew: false,
  },
  {
    id: 4,
    title: "Arts and Humanities Funding",
    provider: "Arts Council England",
    amount: "£2,750",
    type: "grant",
    deadline: "2025-08-10",
    eligibility: "Arts and Humanities students with portfolio",
    relevanceScore: 72,
    isNew: false,
  }
];

interface FundingOpportunitiesDashboardProps {
  setSelectedOpportunity: (opportunity: any) => void;
}

const FundingOpportunitiesDashboard = ({ setSelectedOpportunity }: FundingOpportunitiesDashboardProps) => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter opportunities based on the active filter
  const filteredOpportunities = activeFilter === "all" 
    ? mockOpportunities 
    : mockOpportunities.filter(opp => opp.type === activeFilter);
  
  return (
    <div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Available Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-uni-purple-600 mr-2" />
              <span className="text-2xl font-bold">148</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Matches Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-uni-purple-600 mr-2" />
              <span className="text-2xl font-bold">42</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarCheck className="h-5 w-5 text-uni-purple-600 mr-2" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Potential Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PoundSterling className="h-5 w-5 text-uni-purple-600 mr-2" />
              <span className="text-2xl font-bold">£24,750</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search funding opportunities..."
            className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            onClick={() => setActiveFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={activeFilter === "scholarship" ? "default" : "outline"} 
            onClick={() => setActiveFilter("scholarship")}
            size="sm"
          >
            Scholarships
          </Button>
          <Button 
            variant={activeFilter === "bursary" ? "default" : "outline"} 
            onClick={() => setActiveFilter("bursary")}
            size="sm"
          >
            Bursaries
          </Button>
          <Button 
            variant={activeFilter === "grant" ? "default" : "outline"} 
            onClick={() => setActiveFilter("grant")}
            size="sm"
          >
            Grants
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* New This Week Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New This Week</h2>
          <Button variant="link" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockOpportunities.filter(opp => opp.isNew).map(opportunity => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              onClick={() => setSelectedOpportunity(opportunity)} 
            />
          ))}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended For You</h2>
          <Button variant="link" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              onClick={() => setSelectedOpportunity(opportunity)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundingOpportunitiesDashboard;
