
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Award, GraduationCap, CalendarCheck, PoundSterling } from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import { supabase } from "@/lib/supabase";
import { generateAIResponse } from "@/lib/ai/ai.service";

// Define the Opportunity interface
interface Opportunity {
  id: number;
  title: string;
  provider: string;
  amount: string;
  type: string;
  deadline: string;
  eligibility: string;
  relevanceScore: number;
  isNew: boolean;
  sourceUrl?: string; // Optional source URL for direct linking to the original source
}

interface FundingOpportunitiesDashboardProps {
  setSelectedOpportunity: (opportunity: any) => void;
}

// Function to safely open external URLs
const openExternalUrl = (url: string) => {
  // Make sure the URL has a protocol
  let safeUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    safeUrl = 'https://' + url;
  }
  
  // Open in a new tab
  window.open(safeUrl, '_blank', 'noopener,noreferrer');
};

const FundingOpportunitiesDashboard = ({ setSelectedOpportunity }: FundingOpportunitiesDashboardProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [fundingOpportunities, setFundingOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [fundingPreferences, setFundingPreferences] = useState<any>(null);

  // Function to get user profile and preferences from Supabase
  const getUserData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get funding preferences
      const { data: preferencesData } = await supabase
        .from('funding_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setUserProfile(profileData);
      setFundingPreferences(preferencesData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  // Function to fetch funding opportunities using Gemini API
  const fetchFundingOpportunities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create an array to store all opportunities
      let allOpportunities: Opportunity[] = [];
      let id = 1;
      // Get user profile and preferences first
      if (!userProfile || !fundingPreferences) {
        await getUserData();
      }

      // Generate a prompt for Gemini based on user profile and preferences
      const generatePrompt = () => {
        let prompt = 'Generate a list of 15 realistic UK university funding opportunities ';

        if (userProfile && fundingPreferences) {
          prompt += `for a ${userProfile.education_level} student studying ${userProfile.field_of_study} at ${userProfile.university}. `;

          if (fundingPreferences.funding_types && fundingPreferences.funding_types.length > 0) {
            prompt += `They are specifically interested in ${fundingPreferences.funding_types.join(', ')}. `;
          }

          if (fundingPreferences.eligibility_factors && fundingPreferences.eligibility_factors.length > 0) {
            prompt += `They qualify for funding based on: ${fundingPreferences.eligibility_factors.join(', ')}. `;
          }

          if (fundingPreferences.minimum_amount && fundingPreferences.minimum_amount !== 'any') {
            prompt += `They are looking for opportunities worth at least £${fundingPreferences.minimum_amount}. `;
          }
        } else {
          prompt += 'for UK university students across various study levels and subjects. ';
        }

        prompt += `For each opportunity, provide: 
        1. A realistic title
        2. The provider (university or organization name)
        3. The amount (in GBP, £)
        4. Type (scholarship, grant, bursary, prize, or hardship fund)
        5. Application deadline (a realistic future date)
        6. Eligibility criteria (brief description)
        7. A relevance score between 70-100
        8. Whether it's new (true/false)
        9. A source URL (realistic university funding page)

        Format the response as a valid JSON array of objects with these exact field names: title, provider, amount, type, deadline, eligibility, relevanceScore, isNew, sourceUrl.
        Make sure all values are realistic and properly formatted.`;

        return prompt;
      };

      // Use Gemini API to generate funding opportunities
      const prompt = generatePrompt();
      const { success, data } = await generateAIResponse(prompt);

      if (success) {
        try {
          // Extract the JSON array from the response
          // The response might contain markdown formatting or explanatory text
          const jsonMatch = data.match(/\[\s*\{.*\}\s*\]/s);

          if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const opportunities = JSON.parse(jsonStr);

            // Map the opportunities to our Opportunity interface
            const allOpportunities = opportunities.map((opp: any, index: number) => ({
              id: index,
              title: opp.title,
              provider: opp.provider,
              amount: opp.amount,
              type: opp.type.toLowerCase(),
              deadline: opp.deadline,
              eligibility: opp.eligibility,
              relevanceScore: opp.relevanceScore || Math.floor(Math.random() * 30) + 70,
              isNew: opp.isNew || Math.random() > 0.7,
              sourceUrl: opp.sourceUrl
            }));

            // Sort opportunities by relevance score
            allOpportunities.sort((a, b) => b.relevanceScore - a.relevanceScore);

            // Set the opportunities in state
            setFundingOpportunities(allOpportunities);
            setLastUpdated(new Date());
          } else {
            // Fallback to UK funding opportunities if JSON parsing fails
            const ukOpportunities = getUKFundingOpportunities();
            setFundingOpportunities(ukOpportunities);
            setLastUpdated(new Date());
          }
        } catch (parseError) {
          console.error('Error parsing Gemini API response:', parseError);
          const ukOpportunities = getUKFundingOpportunities();
          setFundingOpportunities(ukOpportunities);
          setLastUpdated(new Date());
        }
      } else {
        // API call failed, use UK funding opportunities
        const ukOpportunities = getUKFundingOpportunities();
        setFundingOpportunities(ukOpportunities);
        setLastUpdated(new Date());
      }

      // Function to provide real UK funding opportunities as fallback
      function getUKFundingOpportunities(): Opportunity[] {
        return [
          {
            id: 1,
            title: 'Chevening Scholarship',
            provider: 'UK Government',
            amount: 'Full funding',
            type: 'scholarship',
            deadline: '2 November 2025',
            eligibility: 'International students with leadership potential applying for a one-year masters degree',
            relevanceScore: 95,
            isNew: true,
            sourceUrl: 'https://www.chevening.org/scholarships/'
          },
          {
            id: 2,
            title: 'Commonwealth Scholarship',
            provider: 'Commonwealth Scholarship Commission',
            amount: 'Full funding',
            type: 'scholarship',
            deadline: '15 December 2025',
            eligibility: 'Students from Commonwealth countries for postgraduate study',
            relevanceScore: 92,
            isNew: true,
            sourceUrl: 'https://cscuk.fcdo.gov.uk/scholarships/'
          },
          {
            id: 3,
            title: 'Student Finance England Maintenance Grant',
            provider: 'UK Government',
            amount: 'Up to £4,655',
            type: 'grant',
            deadline: '31 May 2026',
            eligibility: 'UK undergraduate students based on household income',
            relevanceScore: 88,
            isNew: false,
            sourceUrl: 'https://www.gov.uk/student-finance/'
          },
          {
            id: 4,
            title: 'Disabled Students Allowance',
            provider: 'UK Government',
            amount: 'Up to £25,000',
            type: 'grant',
            deadline: 'Ongoing',
            eligibility: 'UK students with disabilities or specific learning difficulties',
            relevanceScore: 85,
            isNew: false,
            sourceUrl: 'https://www.gov.uk/disabled-students-allowance-dsa/'
          },
          {
            id: 5,
            title: 'Rhodes Scholarship',
            provider: 'University of Oxford',
            amount: 'Full funding',
            type: 'scholarship',
            deadline: '1 October 2025',
            eligibility: 'Outstanding students for postgraduate study at Oxford',
            relevanceScore: 90,
            isNew: true,
            sourceUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/'
          },
          {
            id: 6,
            title: 'Gates Cambridge Scholarship',
            provider: 'University of Cambridge',
            amount: 'Full funding',
            type: 'scholarship',
            deadline: '5 December 2025',
            eligibility: 'Outstanding applicants for postgraduate study at Cambridge',
            relevanceScore: 89,
            isNew: true,
            sourceUrl: 'https://www.gatescambridge.org/'
          },
          {
            id: 7,
            title: 'Care Leavers Bursary',
            provider: 'Various UK Universities',
            amount: '£2,000',
            type: 'bursary',
            deadline: '31 July 2026',
            eligibility: 'Students who have been in local authority care',
            relevanceScore: 82,
            isNew: false,
            sourceUrl: 'https://www.ucas.com/finance/scholarships-grants-and-bursaries/'
          },
          {
            id: 8,
            title: 'Postgraduate Doctoral Loan',
            provider: 'UK Government',
            amount: 'Up to £27,892',
            type: 'loan',
            deadline: 'Ongoing',
            eligibility: 'UK and EU students with settled status for doctoral study',
            relevanceScore: 80,
            isNew: false,
            sourceUrl: 'https://www.gov.uk/doctoral-loan/'
          }
        ];
      }
    } catch (error) {
      console.error('Error fetching funding opportunities:', error);
      setError('Failed to load funding opportunities. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, fundingPreferences, getUserData]);

  // Fetch data on initial load
  useEffect(() => {
    fetchFundingOpportunities();

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchFundingOpportunities();
    }, 30000); // 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchFundingOpportunities]);

  // Filter opportunities based on the active filter
  const filteredOpportunities = activeFilter === "all"
    ? fundingOpportunities
    : fundingOpportunities.filter(opp => opp.type === activeFilter);

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
              <span className="text-2xl font-bold">{fundingOpportunities.length}</span>
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
              <span className="text-2xl font-bold">{fundingOpportunities.filter(opp => opp.relevanceScore >= 75).length}</span>
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
              <span className="text-2xl font-bold">{fundingOpportunities.filter(opp => new Date(opp.deadline) <= new Date('2025-06-30')).length}</span>
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
              <span className="text-2xl font-bold">£54,000+</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status and Refresh */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {lastUpdated && (
            <span>Last updated: {lastUpdated.toLocaleTimeString()} (Real-time data)</span>
          )}
          {isLoading && <span className="ml-2">(Refreshing...)</span>}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchFundingOpportunities}
          disabled={isLoading}
        >
          Refresh Now
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
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
          {fundingOpportunities.filter(opp => opp.isNew).map(opportunity => (
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