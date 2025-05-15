
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, PoundSterling } from "lucide-react";
import { format, isPast, parseISO } from "date-fns";

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
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

const OpportunityCard = ({ opportunity, onClick }: OpportunityCardProps) => {
  const deadlineDate = parseISO(opportunity.deadline);
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
      onClick={onClick}
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
            {format(deadlineDate, 'dd MMM yyyy')}
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
