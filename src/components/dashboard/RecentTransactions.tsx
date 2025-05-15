
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Coffee, ShoppingBag, Home, GraduationCap, Bus } from "lucide-react";

// Helper function to determine icon based on category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "groceries":
      return <ShoppingBag size={16} />;
    case "coffee":
    case "dining":
      return <Coffee size={16} />;
    case "transport":
      return <Bus size={16} />;
    case "rent":
      return <Home size={16} />;
    case "education":
      return <GraduationCap size={16} />;
    default:
      return <ShoppingBag size={16} />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    month: 'short',
    day: 'numeric'
  });
};

const RecentTransactions = () => {
  // Sample data - in a real app, this would come from API/state
  const transactions = [
    {
      id: 1,
      description: "Tesco Express",
      category: "groceries",
      amount: 12.50,
      date: "2025-05-06",
      type: "expense"
    },
    {
      id: 2,
      description: "Costa Coffee",
      category: "coffee",
      amount: 3.75,
      date: "2025-05-05",
      type: "expense"
    },
    {
      id: 3,
      description: "Train Ticket",
      category: "transport",
      amount: 15.20,
      date: "2025-05-04",
      type: "expense"
    },
    {
      id: 4,
      description: "May Rent",
      category: "rent",
      amount: 400,
      date: "2025-05-01",
      type: "expense"
    },
    {
      id: 5,
      description: "Part-time Job",
      category: "income",
      amount: 250,
      date: "2025-05-01",
      type: "income"
    }
  ];

  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your financial activity from the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${transaction.type === 'expense' ? 'bg-red-50' : 'bg-green-50'}`}>
                  {transaction.type === 'expense' 
                    ? getCategoryIcon(transaction.category) 
                    : <ArrowDown size={16} className="text-green-600" />
                  }
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {formatDate(transaction.date)} • {transaction.category}
                  </p>
                </div>
              </div>
              <div className={`font-medium text-sm ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.type === 'expense' ? '-' : '+'}£{transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
