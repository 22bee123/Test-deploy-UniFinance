
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, Check } from "lucide-react";

const SmartInsights = () => {
  // Sample insights - in a real app, these would be dynamically generated
  const insights = [
    {
      id: 1,
      type: "opportunity",
      title: "You're eligible for the Academic Excellence Bursary",
      description: "Based on your profile, you likely qualify for this £500 grant.",
      icon: <TrendingUp size={16} className="text-green-600" />,
      action: "Learn more",
      actionLink: "#",
      color: "green"
    },
    {
      id: 2,
      type: "alert",
      title: "Entertainment spending has increased by 40%",
      description: "You've spent more on entertainment than in previous months.",
      icon: <AlertCircle size={16} className="text-amber-600" />,
      action: "Review budget",
      actionLink: "#",
      color: "amber"
    },
    {
      id: 3,
      type: "tip",
      title: "You could save £15/month on subscriptions",
      description: "We've identified some duplicate and unused subscriptions.",
      icon: <Check size={16} className="text-blue-600" />,
      action: "View details",
      actionLink: "#",
      color: "blue"
    }
  ];

  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          Smart Insights
          <Badge variant="outline" className="ml-2 text-xs font-normal bg-uni-purple-50">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className={`p-4 border rounded-lg border-${insight.color}-200 bg-${insight.color}-50`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded-full bg-${insight.color}-100`}>
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 ml-8">
                <Button variant="link" size="sm" className="p-0 h-auto text-xs text-uni-purple-600 hover:text-uni-purple-800">
                  {insight.action} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartInsights;
