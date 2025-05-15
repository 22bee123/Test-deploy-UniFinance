
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, Wallet, BookOpen, TrendingUp, Users, Lightbulb } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Wallet size={24} className="text-uni-purple-600" />,
      title: "Smart Budgeting",
      description: "Create student-specific budgets that adapt to your term schedule and lifestyle."
    },
    {
      icon: <PiggyBank size={24} className="text-uni-purple-600" />,
      title: "Savings Goals",
      description: "Set visual goals for trips, tech, or emergencies with automated saving plans."
    },
    {
      icon: <TrendingUp size={24} className="text-uni-purple-600" />,
      title: "Income Discovery",
      description: "Find part-time jobs, freelance gigs, and funding options matched to your skills."
    },
    {
      icon: <BookOpen size={24} className="text-uni-purple-600" />,
      title: "Financial Education",
      description: "Learn through bite-sized modules on student loans, taxes, and investing."
    },
    {
      icon: <Users size={24} className="text-uni-purple-600" />,
      title: "Student Community",
      description: "Share tips, ask questions, and join challenges with peers across the UK."
    },
    {
      icon: <Lightbulb size={24} className="text-uni-purple-600" />,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations to improve your financial health."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to thrive financially</h2>
          <p className="text-lg text-gray-600">
            Tools designed specifically for UK university students, with every feature built around your unique financial journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-start">
                <div className="rounded-lg bg-uni-purple-100 p-3 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
