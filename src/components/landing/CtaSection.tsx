import { Button } from "@/components/ui/button";
import AuthModal from "../auth/AuthModal";
import { useEffect } from "react";

const CtaSection = () => {
  const scrollToFeatures = () => {
    try {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error scrolling to features:', error);
    }
  };
  
  useEffect(() => {
    // Any initialization code that needs the DOM can go here
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-uni-purple-600 to-uni-purple-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to take control of your university finances?
              </h2>
              <p className="text-uni-purple-100 text-lg mb-8 md:mb-0">
                Join thousands of UK students making smarter money decisions with UniFinance.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <AuthModal defaultTab="signup">
                <Button size="lg" className="bg-white text-uni-purple-800 hover:bg-gray-100">
                  Get Started Free
                </Button>
              </AuthModal>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-uni-purple-800 border-uni-purple-800 hover:bg-gray-100"
                onClick={scrollToFeatures}
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;