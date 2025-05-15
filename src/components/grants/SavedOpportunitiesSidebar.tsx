
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, BookmarkCheck, Bell, X 
} from "lucide-react";
import { format, isBefore, parseISO } from "date-fns";

// Mock saved opportunities data
const mockSavedOpportunities = [
  {
    id: 1,
    title: "Excellence Scholarship",
    provider: "University of Manchester",
    amount: "£3,000",
    deadline: "2025-06-30",
  },
  {
    id: 2,
    title: "Access Bursary",
    provider: "London School of Economics",
    amount: "£1,500",
    deadline: "2025-07-15",
  },
  {
    id: 3,
    title: "Computer Science Prize",
    provider: "British Computing Society",
    amount: "£2,000",
    deadline: "2025-05-20",
  }
];

// Mock upcoming deadlines
const mockDeadlines = [
  {
    id: 1,
    title: "STEM Research Grant",
    deadline: "2025-05-20",
  },
  {
    id: 2,
    title: "Excellence Scholarship",
    deadline: "2025-06-30",
  },
  {
    id: 3,
    title: "Access Bursary",
    deadline: "2025-07-15",
  }
];

interface SavedOpportunitiesSidebarProps {
  setSelectedOpportunity: (opportunity: any) => void;
}

const SavedOpportunitiesSidebar = ({ setSelectedOpportunity }: SavedOpportunitiesSidebarProps) => {
  // Sort upcoming deadlines by date (soonest first)
  const sortedDeadlines = [...mockDeadlines].sort((a, b) => 
    parseISO(a.deadline).getTime() - parseISO(b.deadline).getTime()
  );
  
  const getOpportunityById = (id: number) => {
    return mockSavedOpportunities.find(opp => opp.id === id);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center">
            <BookmarkCheck className="h-4 w-4 mr-2" />
            Saved Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {mockSavedOpportunities.length === 0 ? (
            <div className="text-center py-8">
              <BookmarkCheck className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
              <p className="text-sm text-muted-foreground mb-4">
                No saved opportunities yet
              </p>
              <Button size="sm" variant="outline">
                Browse Opportunities
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {mockSavedOpportunities.map((opportunity) => (
                <div 
                  key={opportunity.id} 
                  className="p-3 border rounded-md cursor-pointer hover:border-uni-purple-300 transition-all"
                  onClick={() => setSelectedOpportunity(opportunity)}
                >
                  <h4 className="font-medium text-sm mb-1">{opportunity.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{opportunity.provider}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{opportunity.amount}</span>
                    <span className="text-xs text-muted-foreground">
                      Due {format(parseISO(opportunity.deadline), 'dd MMM')}
                    </span>
                  </div>
                </div>
              ))}
              
              <Button variant="link" size="sm" className="w-full text-sm">
                View All Saved
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-3">
            {sortedDeadlines.map((deadline) => {
              const deadlineDate = parseISO(deadline.deadline);
              const today = new Date();
              const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysLeft <= 14;
              
              const opportunity = mockSavedOpportunities.find(
                opp => opp.title === deadline.title
              );
              
              return (
                <div 
                  key={deadline.id} 
                  className="flex justify-between items-center p-3 border rounded-md cursor-pointer hover:border-uni-purple-300 transition-all"
                  onClick={() => opportunity && setSelectedOpportunity(opportunity)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-xs">{deadline.title}</h4>
                    <div className="flex items-center">
                      <CalendarCheck className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className={`text-xs ${isUrgent ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                        {format(deadlineDate, 'dd MMM')}
                        {isUrgent && ` (${daysLeft} days left)`}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    {isUrgent && (
                      <Badge variant="outline" className="ml-2 text-xs bg-red-50 text-red-600 border-red-200">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
            
            <Button variant="outline" size="sm" className="w-full text-xs flex items-center justify-center">
              <Bell className="h-3 w-3 mr-1" />
              Set Deadline Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md">Total Potential Funding</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-uni-purple-600 mb-1">£6,500</div>
            <div className="text-xs text-muted-foreground">From 3 saved opportunities</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedOpportunitiesSidebar;
