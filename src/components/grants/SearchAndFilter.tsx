
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, SlidersHorizontal, Save, Download, 
  LayoutGrid, LayoutList, Check, X 
} from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  },
  {
    id: 5,
    title: "Computer Science Prize",
    provider: "British Computing Society",
    amount: "£2,000",
    type: "prize",
    deadline: "2025-09-01",
    eligibility: "Final year Computer Science students",
    relevanceScore: 65,
  },
  {
    id: 6,
    title: "Medical Student Support",
    provider: "NHS Foundation",
    amount: "£4,000",
    type: "bursary",
    deadline: "2025-06-15",
    eligibility: "Medical students willing to work in underserved areas",
    relevanceScore: 60,
  }
];

interface SearchAndFilterProps {
  setSelectedOpportunity: (opportunity: any) => void;
}

const SearchAndFilter = ({ setSelectedOpportunity }: SearchAndFilterProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [searchParams, setSearchParams] = useState({
    query: "",
    type: "",
    studyLevel: "",
    subjectArea: "",
    minAmount: "",
    maxAmount: ""
  });

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, query: e.target.value });
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setSearchParams({ ...searchParams, [field]: value });
  };

  // Filter opportunities based on search params (simplified example)
  const filterOpportunities = () => {
    // In a real app, this would be a more sophisticated filtering system
    // This is just a simple example for demonstration
    return mockOpportunities.filter(opp => 
      opp.title.toLowerCase().includes(searchParams.query.toLowerCase()) || 
      opp.provider.toLowerCase().includes(searchParams.query.toLowerCase()) ||
      (searchParams.type ? opp.type === searchParams.type.toLowerCase() : true)
    );
  };

  const handleApplyFilters = () => {
    setOpportunities(filterOpportunities());
  };

  const handleResetFilters = () => {
    setSearchParams({
      query: "",
      type: "",
      studyLevel: "",
      subjectArea: "",
      minAmount: "",
      maxAmount: ""
    });
    setOpportunities(mockOpportunities);
  };

  return (
    <div className="space-y-6">
      {/* Search bar and controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search by keyword, provider, or location..."
            className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchParams.query}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
          
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter panel */}
      {filtersVisible && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Funding Type</Label>
                <Select 
                  value={searchParams.type} 
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="bursary">Bursary</SelectItem>
                    <SelectItem value="grant">Grant</SelectItem>
                    <SelectItem value="prize">Prize</SelectItem>
                    <SelectItem value="hardship">Hardship Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="study-level">Study Level</Label>
                <Select 
                  value={searchParams.studyLevel} 
                  onValueChange={(value) => handleFilterChange("studyLevel", value)}
                >
                  <SelectTrigger id="study-level">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All levels</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Area</Label>
                <Select 
                  value={searchParams.subjectArea} 
                  onValueChange={(value) => handleFilterChange("subjectArea", value)}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="All subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All subjects</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="social">Social Sciences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-amount">Min Amount (£)</Label>
                <Input 
                  id="min-amount" 
                  type="number" 
                  placeholder="Min £" 
                  value={searchParams.minAmount}
                  onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-amount">Max Amount (£)</Label>
                <Input 
                  id="max-amount" 
                  type="number" 
                  placeholder="Max £" 
                  value={searchParams.maxAmount}
                  onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button onClick={handleApplyFilters}>
                  <Check className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={handleResetFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Search
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-2">
        Found {opportunities.length} opportunities matching your search
      </div>

      {/* Results grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "space-y-4"
      }>
        {opportunities.map(opportunity => (
          <OpportunityCard 
            key={opportunity.id} 
            opportunity={opportunity} 
            onClick={() => setSelectedOpportunity(opportunity)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
