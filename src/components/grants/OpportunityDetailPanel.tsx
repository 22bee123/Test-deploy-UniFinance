
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, PoundSterling, Check, Bookmark, Share, ExternalLink, 
  FileText, X, Award, Info
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";

interface OpportunityDetailPanelProps {
  opportunity: any;
  onClose: () => void;
}

const OpportunityDetailPanel = ({ opportunity, onClose }: OpportunityDetailPanelProps) => {
  const deadlineDate = parseISO(opportunity.deadline);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "scholarship": return "default";
      case "bursary": return "secondary";
      case "grant": return "outline";
      default: return "outline";
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  // Function to calculate days remaining until deadline
  const getDaysRemaining = () => {
    const today = new Date();
    const differenceInTime = deadlineDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };
  
  // Function to generate the appropriate application URL based on the opportunity
  const getApplicationUrl = () => {
    // Check if the opportunity has a direct source URL
    if (opportunity.sourceUrl) {
      return opportunity.sourceUrl;
    }
    
    // Create a search-friendly version of the opportunity title
    const searchQuery = encodeURIComponent(`${opportunity.title} ${opportunity.provider} ${opportunity.type}`);
    
    // Specific URL patterns for different types of opportunities
    const specificUrls: Record<string, Record<string, string>> = {
      // Specific scholarship URLs
      'scholarship': {
        'Academic Excellence Scholarship': 'https://www.ucas.com/scholarships-grants-and-bursaries-academic-excellence-and-merit',
        'Sports Excellence Scholarship': 'https://www.ucas.com/scholarships-grants-and-bursaries-sports',
        'Arts and Creative Scholarship': 'https://www.ucas.com/scholarships-grants-and-bursaries-arts',
        'Cowrie Scholarship Foundation': 'https://cowriescholarshipfoundation.org.uk/apply/',
        '93% Club Scholarship': 'https://www.93percent.club/support',
      },
      // Specific grant URLs
      'grant': {
        'Welsh Government Learning Grant': 'https://www.studentfinancewales.co.uk/undergraduate-students/new-students/what-financial-support-is-available/welsh-government-learning-grant/',
        'Disabled Students Allowance': 'https://www.gov.uk/disabled-students-allowance-dsa',
        'Childcare Grant': 'https://www.gov.uk/childcare-grant',
        'Parents Learning Allowance': 'https://www.gov.uk/parents-learning-allowance',
        'Maintenance Grant': 'https://www.gov.uk/student-finance/grants-and-bursaries',
        'STEM Research Grant': 'https://royalsociety.org/grants-schemes-awards/',
        'Arts and Humanities Funding': 'https://www.artscouncil.org.uk/funding',
      },
      // Specific bursary URLs
      'bursary': {
        'Care Leavers Bursary': 'https://www.ucas.com/finance/additional-funding/financial-support-care-experienced-students',
        'Income-Based Bursary': 'https://www.ucas.com/finance/scholarships-grants-and-bursaries',
        'Hardship Fund': 'https://www.thescholarshiphub.org.uk/',
        'Access Bursary': 'https://www.lse.ac.uk/study-at-lse/undergraduate/fees-and-funding/access-and-participation-plan',
      }
    };
    
    // Try to find a specific URL for this exact opportunity
    const typeSpecificUrls = specificUrls[opportunity.type];
    if (typeSpecificUrls && typeSpecificUrls[opportunity.title]) {
      return typeSpecificUrls[opportunity.title];
    }
    
    // Provider-specific URLs as fallback
    const providerUrls: Record<string, string> = {
      'UCAS': 'https://www.ucas.com/money-and-student-life/money/scholarships-grants-and-bursaries',
      'UCAS Listed Provider': 'https://www.ucas.com/money-and-student-life/money/scholarships-grants-and-bursaries',
      'The Scholarship Hub': 'https://www.thescholarshiphub.org.uk/your-2024-guide-to-grants-bursaries-and-scholarships-for-uk-students/',
      'UK Universities': 'https://www.ucas.com/scholarships-grants-and-bursaries-academic-excellence-and-merit',
      'UK Government': 'https://www.gov.uk/student-finance',
      'University Bursary Schemes': 'https://www.thescholarshiphub.org.uk/',
      'UK Scholarship Portal': 'https://www.scholarshipportal.com/scholarships/united-kingdom',
      'University of Manchester': 'https://www.manchester.ac.uk/study/undergraduate/student-finance/scholarships-bursaries/',
      'London School of Economics': 'https://www.lse.ac.uk/study-at-lse/undergraduate/fees-and-funding',
      'Student Finance Wales': 'https://www.studentfinancewales.co.uk/',
      'Student Finance England': 'https://www.gov.uk/student-finance',
      'Royal Society': 'https://royalsociety.org/grants-schemes-awards/',
      'Arts Council England': 'https://www.artscouncil.org.uk/funding',
      'University of Birmingham': 'https://www.birmingham.ac.uk/undergraduate/fees/funding',
      'Cowrie Foundation': 'https://cowriescholarshipfoundation.org.uk/',
      '93% Club': 'https://www.93percent.club/',
      'Various Universities': 'https://www.ucas.com/finance/scholarships-grants-and-bursaries',
      'UniFinance Live Data': 'https://www.thescholarshiphub.org.uk/'
    };
    
    // Try to find the provider-specific URL
    if (providerUrls[opportunity.provider]) {
      return providerUrls[opportunity.provider];
    }
    
    // If we still don't have a URL, use a search engine with the opportunity details
    // This will help users find the specific opportunity even if we don't have a direct link
    return `https://www.google.com/search?q=${searchQuery}`;
  };
  
  // Get the specific source website based on the opportunity title and type
  const getSourceWebsite = () => {
    // Map opportunity titles to their source websites
    const sourceMap: Record<string, string> = {
      // UCAS sources
      'Academic Excellence Scholarship': 'https://www.ucas.com/scholarships-grants-and-bursaries-academic-excellence-and-merit',
      'Sports Excellence Scholarship': 'https://www.ucas.com/scholarships-grants-and-bursaries-sports',
      'Low Income Funding': 'https://www.ucas.com/scholarships-grants-and-bursaries-low-income-households',
      'Widening Participation Funding': 'https://www.ucas.com/money-and-student-life/money/scholarships-grants-and-bursaries/widening-participation',
      
      // Scholarship Hub sources
      'Care Leavers Bursary': 'https://www.thescholarshiphub.org.uk/your-2024-guide-to-grants-bursaries-and-scholarships-for-uk-students/',
      'Income-Based Bursary': 'https://www.thescholarshiphub.org.uk/your-2024-guide-to-grants-bursaries-and-scholarships-for-uk-students/',
      'Hardship Fund': 'https://www.thescholarshiphub.org.uk/your-2024-guide-to-grants-bursaries-and-scholarships-for-uk-students/',
      
      // Government sources
      'Welsh Government Learning Grant': 'https://www.studentfinancewales.co.uk/undergraduate-students/new-students/what-financial-support-is-available/welsh-government-learning-grant/',
      'Disabled Students Allowance': 'https://www.gov.uk/disabled-students-allowance-dsa',
      'Childcare Grant': 'https://www.gov.uk/childcare-grant',
      'Parents Learning Allowance': 'https://www.gov.uk/parents-learning-allowance',
      
      // University-specific sources
      'University of Manchester': 'https://www.manchester.ac.uk/study/undergraduate/student-finance/scholarships-bursaries/',
      'London School of Economics': 'https://www.lse.ac.uk/study-at-lse/undergraduate/fees-and-funding',
      
      // Organization-specific sources
      'Cowrie Scholarship Foundation': 'https://cowriescholarshipfoundation.org.uk/apply/',
      '93% Club Scholarship': 'https://www.93percent.club/support',
      'Royal Society': 'https://royalsociety.org/grants-schemes-awards/',
      'Arts Council England': 'https://www.artscouncil.org.uk/funding',
    };
    
    // First try to match by exact title
    if (sourceMap[opportunity.title]) {
      return sourceMap[opportunity.title];
    }
    
    // If no exact match, try to find a partial match
    for (const [key, url] of Object.entries(sourceMap)) {
      if (opportunity.title.includes(key) || key.includes(opportunity.title)) {
        return url;
      }
    }
    
    // If still no match, use the application URL
    return getApplicationUrl();
  };
  
  // Handle the apply now button click
  const handleApplyNowClick = () => {
    setIsRedirecting(true);
    const applicationUrl = getApplicationUrl();
    
    // Open the application URL in a new tab
    window.open(applicationUrl, '_blank');
    
    // Reset the redirecting state after a short delay
    setTimeout(() => {
      setIsRedirecting(false);
    }, 1000);
  };

  const daysRemaining = getDaysRemaining();
  
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-y-auto h-[calc(100vh-12rem)] sticky top-6">
      <div className="flex justify-between items-start p-4 border-b sticky top-0 bg-white">
        <h3 className="font-bold text-lg">Opportunity Details</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-6">
        <div>
          <div className="mb-2">
            <Badge variant={getBadgeVariant(opportunity.type)}>
              {getTypeLabel(opportunity.type)}
            </Badge>
            {opportunity.isNew && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                New
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-bold mb-1">{opportunity.title}</h2>
          <p className="text-muted-foreground">{opportunity.provider}</p>
        </div>
        
        <div className="flex items-center justify-between py-3 border-t border-b">
          <div className="flex items-center">
            <PoundSterling className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="font-bold">{opportunity.amount}</span>
          </div>
          
          <div className="flex items-center">
            <CalendarCheck className="h-5 w-5 text-muted-foreground mr-2" />
            <div>
              <span className="text-sm block">{format(deadlineDate, 'dd MMM yyyy')}</span>
              <span className={`text-xs ${daysRemaining <= 14 ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                {daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Eligibility</h3>
            <p className="text-sm">{opportunity.eligibility}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Application Requirements</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Personal statement (500 words)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Academic transcript or predicted grades</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>One academic reference</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Proof of household income (if applicable)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Success Rate</h3>
          <div className="flex items-center gap-3">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-uni-purple-500 h-2 rounded-full" 
                style={{ width: `35%` }}
              ></div>
            </div>
            <span className="text-sm">35% of applicants successful</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Contact Information</h3>
          <p className="text-sm">scholarships@{opportunity.provider.toLowerCase().replace(/\s+/g, '')}.ac.uk</p>
        </div>
        
        <div className="bg-uni-purple-50 p-3 rounded-md border border-uni-purple-100">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-uni-purple-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm text-uni-purple-800 mb-1">Application Tips</h4>
              <p className="text-xs text-uni-purple-700">
                Focus on how you meet the specific criteria for this {opportunity.type}. 
                Highlight relevant achievements and explain why you're an ideal candidate.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 space-y-2">
          <Button 
            className="w-full" 
            onClick={handleApplyNowClick}
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Redirecting...
              </>
            ) : (
              <>
                <Award className="h-4 w-4 mr-2" />
                Apply Now
              </>
            )}
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => window.open(getApplicationUrl(), '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Website
            </Button>
          </div>
        </div>
        
        <div className="pt-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Similar Opportunities</h3>
          
          <div className="space-y-2">
            <div className="p-3 border rounded-md hover:border-uni-purple-300 transition-all cursor-pointer">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium">Merit Award</span>
                <span className="text-xs text-muted-foreground">£2,500</span>
              </div>
              <p className="text-xs text-muted-foreground">{opportunity.provider}</p>
            </div>
            
            <div className="p-3 border rounded-md hover:border-uni-purple-300 transition-all cursor-pointer">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium">Academic Excellence Prize</span>
                <span className="text-xs text-muted-foreground">£1,750</span>
              </div>
              <p className="text-xs text-muted-foreground">University of Bristol</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default OpportunityDetailPanel;
