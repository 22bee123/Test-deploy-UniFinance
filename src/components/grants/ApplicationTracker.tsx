
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, Plus, CalendarCheck } from "lucide-react";

// Mock application data
const mockApplications = [
  {
    id: 1,
    opportunity: "Excellence Scholarship",
    provider: "University of Manchester",
    amount: "£3,000",
    deadline: "2025-06-30",
    status: "saved",
    progress: 0,
    priority: "medium"
  },
  {
    id: 2,
    opportunity: "Access Bursary",
    provider: "London School of Economics",
    amount: "£1,500",
    deadline: "2025-07-15",
    status: "in_progress",
    progress: 30,
    priority: "high"
  },
  {
    id: 3,
    opportunity: "STEM Research Grant",
    provider: "Royal Society",
    amount: "£5,000",
    deadline: "2025-05-20",
    status: "in_progress",
    progress: 75,
    priority: "high"
  },
  {
    id: 4,
    opportunity: "Arts and Humanities Fund",
    provider: "Arts Council England",
    amount: "£2,750",
    deadline: "2025-08-10",
    status: "submitted",
    progress: 100,
    priority: "medium"
  },
  {
    id: 5,
    opportunity: "Computer Science Prize",
    provider: "British Computing Society",
    amount: "£2,000",
    deadline: "2025-09-01",
    status: "interview",
    progress: 100,
    priority: "medium"
  }
];

const ApplicationTracker = () => {
  const [viewMode, setViewMode] = useState<"kanban" | "calendar">("kanban");
  
  const filterApplicationsByStatus = (status: string) => {
    return mockApplications.filter(app => app.status === status);
  };

  const renderApplicationCard = (application: any) => {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high": return "bg-red-500";
        case "medium": return "bg-yellow-500";
        case "low": return "bg-green-500";
        default: return "bg-gray-500";
      }
    };
    
    const formatDeadline = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    };
    
    return (
      <Card key={application.id} className="mb-3 cursor-move hover:border-uni-purple-300 transition-all">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(application.priority)}`}></div>
            <span className="text-xs text-muted-foreground">Due {formatDeadline(application.deadline)}</span>
          </div>
          
          <h4 className="font-medium text-sm mb-1">{application.opportunity}</h4>
          <p className="text-xs text-muted-foreground mb-2">{application.provider}</p>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{application.amount}</span>
            {application.progress < 100 && application.status !== 'saved' && (
              <span className="text-xs text-muted-foreground">{application.progress}% complete</span>
            )}
          </div>
          
          {application.progress < 100 && application.status !== 'saved' && (
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-uni-purple-500 h-1.5 rounded-full" 
                style={{ width: `${application.progress}%` }}
              ></div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Application Tracker</h2>
          <p className="text-sm text-muted-foreground">Track and manage your funding applications</p>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "kanban" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("kanban")}
              className="rounded-r-none"
            >
              <List className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button 
              variant={viewMode === "calendar" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="rounded-l-none"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>
      
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Saved/Interested Column */}
          <div className="bg-gray-50 rounded-md p-3">
            <h3 className="font-medium text-sm mb-3 px-1 flex items-center">
              <span className="bg-gray-200 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-xs">
                {filterApplicationsByStatus("saved").length}
              </span>
              Saved
            </h3>
            {filterApplicationsByStatus("saved").map(app => renderApplicationCard(app))}
          </div>
          
          {/* In Progress Column */}
          <div className="bg-gray-50 rounded-md p-3">
            <h3 className="font-medium text-sm mb-3 px-1 flex items-center">
              <span className="bg-gray-200 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-xs">
                {filterApplicationsByStatus("in_progress").length}
              </span>
              In Progress
            </h3>
            {filterApplicationsByStatus("in_progress").map(app => renderApplicationCard(app))}
          </div>
          
          {/* Submitted Column */}
          <div className="bg-gray-50 rounded-md p-3">
            <h3 className="font-medium text-sm mb-3 px-1 flex items-center">
              <span className="bg-gray-200 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-xs">
                {filterApplicationsByStatus("submitted").length}
              </span>
              Submitted
            </h3>
            {filterApplicationsByStatus("submitted").map(app => renderApplicationCard(app))}
          </div>
          
          {/* Interview Column */}
          <div className="bg-gray-50 rounded-md p-3">
            <h3 className="font-medium text-sm mb-3 px-1 flex items-center">
              <span className="bg-gray-200 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-xs">
                {filterApplicationsByStatus("interview").length}
              </span>
              Interview
            </h3>
            {filterApplicationsByStatus("interview").map(app => renderApplicationCard(app))}
          </div>
          
          {/* Awarded Column */}
          <div className="bg-gray-50 rounded-md p-3">
            <h3 className="font-medium text-sm mb-3 px-1 flex items-center">
              <span className="bg-gray-200 w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-xs">
                {filterApplicationsByStatus("awarded").length}
              </span>
              Awarded
            </h3>
            {filterApplicationsByStatus("awarded").length === 0 && (
              <Card className="mb-3 border-dashed border-2 bg-transparent">
                <CardContent className="p-3 flex flex-col items-center justify-center h-24">
                  <CalendarCheck className="h-6 w-6 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-xs text-muted-foreground text-center">
                    Awarded funding will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
            <h3 className="text-lg font-medium mb-1">Calendar View</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View your application deadlines on a calendar
            </p>
            <Button>
              Connect Calendar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
