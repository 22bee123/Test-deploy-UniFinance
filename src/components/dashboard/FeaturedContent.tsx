
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, BookOpen } from "lucide-react";

const FeaturedContent = () => {
  const features = [
    {
      id: 1,
      title: "Student Jobs Fair",
      description: "Virtual careers fair with 25+ employers hiring for part-time roles.",
      type: "event",
      icon: <Briefcase size={20} />,
      date: "May 15, 2025",
      buttonText: "Register",
      buttonLink: "#"
    },
    {
      id: 2,
      title: "Scholarship Deadline",
      description: "Last chance to apply for the Summer Research Grant.",
      type: "funding",
      icon: <GraduationCap size={20} />,
      date: "May 20, 2025",
      buttonText: "Apply",
      buttonLink: "#"
    },
    {
      id: 3,
      title: "Money Mindset Course",
      description: "Free mini-course on building healthy financial habits.",
      type: "learning",
      icon: <BookOpen size={20} />,
      duration: "30 mins",
      buttonText: "Start Learning",
      buttonLink: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map(feature => (
        <Card key={feature.id} className="animate-fade-in card-hover">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="p-2 bg-uni-purple-100 rounded-lg">
                {feature.icon}
              </div>
              <Badge 
                className={`
                  ${feature.type === 'event' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
                  ${feature.type === 'funding' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                  ${feature.type === 'learning' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}
                `}
              >
                {feature.type === 'event' ? 'Event' : ''}
                {feature.type === 'funding' ? 'Funding' : ''}
                {feature.type === 'learning' ? 'Learning' : ''}
              </Badge>
            </div>
            <CardTitle className="mt-3 text-lg">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {feature.date && `Date: ${feature.date}`}
              {feature.duration && `Duration: ${feature.duration}`}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">{feature.buttonText}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedContent;
