
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, PoundSterling } from "lucide-react";
import { format, isPast, parseISO, parse } from "date-fns";

interface Opportunity {
  id: number;
  title: string;
  provider: string;
  amount: string;
  type: string;
  deadline: string;
  eligibility: string;
  relevanceScore: number;
  isNew?: boolean;
  sourceUrl?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

const OpportunityCard = ({ opportunity, onClick }: OpportunityCardProps) => {
  // Function to safely open external URLs
  const handleClick = () => {
    // Call the original onClick handler
    onClick();
    
    // If the opportunity has a source URL, open it in a new tab
    if (opportunity.sourceUrl) {
      // Make sure the URL has a protocol
      let url = opportunity.sourceUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      // Open in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Parse the deadline date safely with fallback options
  const parseDeadline = (dateString: string) => {
    try {
      // Try to parse as ISO format first
      if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
        return parseISO(dateString);
      }
      
      // Try to parse as UK date format (dd/mm/yyyy or dd-mm-yyyy)
      if (dateString.match(/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/)) {
        return parse(dateString, 'dd/MM/yyyy', new Date());
      }
      
      // Try to parse as text date format (e.g., "15 January 2026")
      if (dateString.match(/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/)) {
        return parse(dateString, 'd MMMM yyyy', new Date());
      }
      
      // Default fallback
      return new Date();
    } catch (error) {
      console.warn('Failed to parse date:', dateString, error);
      return new Date(); // Fallback to current date
    }
  };
  
  const deadlineDate = parseDeadline(opportunity.deadline);
  const isDeadlinePassed = isPast(deadlineDate);
  
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

  return (
    <Card 
      className="hover:border-uni-purple-300 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4 pt-4">
        <div className="flex justify-between mb-2">
          <Badge variant={getBadgeVariant(opportunity.type)}>
            {getTypeLabel(opportunity.type)}
          </Badge>
          {opportunity.isNew && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              New
            </Badge>
          )}
        </div>
        <h3 className="font-bold text-lg mb-1">{opportunity.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{opportunity.provider}</p>
        
        <div className="flex items-center mb-2">
          <PoundSterling className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-sm">{opportunity.amount}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <CalendarCheck className="h-4 w-4 text-muted-foreground mr-2" />
          <span className={`text-sm ${isDeadlinePassed ? 'text-red-500' : ''}`}>
            {isNaN(deadlineDate.getTime()) 
              ? opportunity.deadline // If parsing failed, show the original string
              : format(deadlineDate, 'dd MMM yyyy')}
            {isDeadlinePassed && ' (Passed)'}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.eligibility}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 border-t">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Match Score</span>
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
              <div 
                className="bg-uni-purple-500 h-1.5 rounded-full" 
                style={{ width: `${opportunity.relevanceScore}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{opportunity.relevanceScore}%</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
