
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FundingOpportunitiesDashboard from "@/components/grants/FundingOpportunitiesDashboard";
import SearchAndFilter from "@/components/grants/SearchAndFilter";
import ApplicationTracker from "@/components/grants/ApplicationTracker";
import AIGrantAssistant from "@/components/grants/AIGrantAssistant";
import FundingInfoHub from "@/components/grants/FundingInfoHub";
import OpportunityDetailPanel from "@/components/grants/OpportunityDetailPanel";
import SavedOpportunitiesSidebar from "@/components/grants/SavedOpportunitiesSidebar";

const GrantsAndFunding = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6 pb-16 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Grants & Funding</h1>
            <p className="text-muted-foreground">Discover and apply for financial support opportunities tailored for UK students</p>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="search">Search & Filter</TabsTrigger>
              <TabsTrigger value="tracker">Application Tracker</TabsTrigger>
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="resources">UK Funding Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-0">
              <FundingOpportunitiesDashboard setSelectedOpportunity={setSelectedOpportunity} />
            </TabsContent>
            
            <TabsContent value="search" className="mt-0">
              <SearchAndFilter setSelectedOpportunity={setSelectedOpportunity} />
            </TabsContent>
            
            <TabsContent value="tracker" className="mt-0">
              <ApplicationTracker />
            </TabsContent>
            
            <TabsContent value="assistant" className="mt-0">
              <AIGrantAssistant />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <FundingInfoHub />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full lg:w-80 lg:min-w-80">
          {selectedOpportunity ? (
            <OpportunityDetailPanel 
              opportunity={selectedOpportunity} 
              onClose={() => setSelectedOpportunity(null)} 
            />
          ) : (
            <SavedOpportunitiesSidebar setSelectedOpportunity={setSelectedOpportunity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GrantsAndFunding;
