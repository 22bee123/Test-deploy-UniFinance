
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const SpendingBreakdown = () => {
  // Sample data - in a real app, this would come from API/state
  const spendingData = [
    { name: 'Rent', value: 400, color: '#9b87f5' },
    { name: 'Groceries', value: 150, color: '#7249e3' },
    { name: 'Transport', value: 100, color: '#bbaaf7' },
    { name: 'Entertainment', value: 75, color: '#d6cdfb' },
    { name: 'Utilities', value: 50, color: '#6139cc' },
    { name: 'Other', value: 75, color: '#e9e4fd' }
  ];

  const totalSpent = spendingData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalSpent) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 shadow-md border rounded text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-uni-purple-700">£{data.value} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in card-hover">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Where your money is going this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry: any) => {
                  const percentage = ((entry.payload.value / totalSpent) * 100).toFixed(1);
                  return <span className="text-xs">{value} ({percentage}%)</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">Total spent: <span className="font-medium text-foreground">£{totalSpent}</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingBreakdown;
