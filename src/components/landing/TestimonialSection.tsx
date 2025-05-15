
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "UniFinance has completely changed how I view my finances. I went from constantly stressing about money to having a clear plan for my entire university journey.",
      name: "Emma L.",
      role: "First Year, Bristol University",
      imageSrc: "https://randomuser.me/api/portraits/women/11.jpg"
    },
    {
      quote: "As an international student, managing money in the UK was overwhelming. This app helped me find grants I didn't know existed and budget in pounds without confusion.",
      name: "Raj P.",
      role: "Postgraduate, UCL",
      imageSrc: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The community feature is brilliant. Getting advice from students who've been there has saved me from making so many financial mistakes other freshers make.",
      name: "James W.",
      role: "Second Year, University of Edinburgh",
      imageSrc: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-uni-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What students are saying</h2>
          <p className="text-lg text-gray-600">
            From first-years to postgraduates, see how UniFinance is making an impact on real student lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="45" height="36" className="text-uni-purple-300" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 18H9C9 12.4772 13.4772 8 19 8V12C15.6863 12 13 14.6863 13 18V18.75C13 19.9926 14.0074 21 15.25 21H18.25C19.4926 21 20.5 19.9926 20.5 18.75V15.75C20.5 14.5074 19.4926 13.5 18.25 13.5H13.5V18Z"></path>
                      <path d="M34.5 18H30C30 12.4772 34.4772 8 40 8V12C36.6863 12 34 14.6863 34 18V18.75C34 19.9926 35.0074 21 36.25 21H39.25C40.4926 21 41.5 19.9926 41.5 18.75V15.75C41.5 14.5074 40.4926 13.5 39.25 13.5H34.5V18Z"></path>
                    </svg>
                  </div>
                  <p className="flex-1 text-gray-700 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-4"
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
