
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp } from "lucide-react";

const BudgetTracker = () => {
  // Sample budget categories - in a real app, this would come from API/state
  const budgetCategories = [
    {
      id: 1,
      name: "Groceries",
      budget: 200,
      spent: 120,
      percentSpent: 60,
      trend: "up"
    },
    {
      id: 2,
      name: "Transport",
      budget: 100,
      spent: 85,
      percentSpent: 85,
      trend: "same"
    },
    {
      id: 3,
      name: "Entertainment",
      budget: 75,
      spent: 52,
      percentSpent: 69,
      trend: "up"
    },
    {
      id: 4,
      name: "Utilities",
      budget: 50,
      spent: 50,
      percentSpent: 100,
      trend: "same"
    }
  ];

  const getStatusColor = (percentSpent: number) => {
    if (percentSpent <= 70) return "bg-green-600";
    if (percentSpent <= 90) return "bg-amber-500";
    return "bg-red-600";
  };

  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
        <CardDescription>Monitor your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {budgetCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{category.name}</span>
                  {category.trend === "up" && (
                    <ArrowUp size={14} className="text-red-500" />
                  )}
                </div>
                <span className="text-sm">
                  £{category.spent} / £{category.budget}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getStatusColor(category.percentSpent)}`} 
                  style={{ width: `${category.percentSpent}%` }} 
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>£{category.budget - category.spent} remaining</span>
                <span>{category.percentSpent}% used</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
