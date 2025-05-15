
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, PoundSterling } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardOverview = () => {
  // Sample data - in a real app, this would come from API/state
  const budgetData = {
    total: 1000,
    spent: 450,
    remaining: 550,
    percentSpent: 45,
    status: "on-track" // or "at-risk", "over-budget"
  };
  
  const savingsData = {
    target: 500,
    current: 250,
    percentComplete: 50,
    monthlyGoal: 100,
    thisMonth: 85
  };
  
  const upcomingPayments = [
    { name: "Rent", amount: 400, date: "15 May", type: "expense" },
    { name: "Student Loan", amount: 1500, date: "19 May", type: "income" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Budget Card */}
      <Card className="animate-fade-in card-hover">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Monthly Budget</CardTitle>
            {budgetData.status === "on-track" && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">On Track</Badge>
            )}
            {budgetData.status === "at-risk" && (
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">At Risk</Badge>
            )}
            {budgetData.status === "over-budget" && (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Over Budget</Badge>
            )}
          </div>
          <CardDescription>Your May spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Spent</span>
              <span className="font-medium">£{budgetData.spent}</span>
            </div>
            <div>
              <Progress value={budgetData.percentSpent} className="h-2 bg-gray-100" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Remaining</span>
              <span className="font-medium text-uni-purple-700">£{budgetData.remaining}</span>
            </div>
            <div className="pt-2 text-sm text-center text-muted-foreground">
              {Math.floor(budgetData.percentSpent)}% of £{budgetData.total} monthly budget
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Card */}
      <Card className="animate-fade-in card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Savings Goal</CardTitle>
          <CardDescription>Trip to Edinburgh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="font-medium">£{savingsData.current} / £{savingsData.target}</span>
            </div>
            <div>
              <Progress value={savingsData.percentComplete} className="h-2 bg-gray-100" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="font-medium">£{savingsData.thisMonth} / £{savingsData.monthlyGoal}</span>
            </div>
            <div className="pt-2 text-sm text-center text-muted-foreground">
              You're {savingsData.percentComplete}% of the way there!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card className="animate-fade-in card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Money Flow</CardTitle>
          <CardDescription>Next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPayments.map((payment, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className={`p-1 mr-3 rounded ${payment.type === 'expense' ? 'bg-red-100' : 'bg-green-100'}`}>
                    {payment.type === 'expense' ? (
                      <ArrowUp size={16} className="text-red-600" />
                    ) : (
                      <ArrowDown size={16} className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{payment.name}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className={`flex items-center font-medium ${payment.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                  <PoundSterling size={14} className="mr-1" />
                  {payment.amount}
                </div>
              </div>
            ))}
            {upcomingPayments.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-6">
                No upcoming payments
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
