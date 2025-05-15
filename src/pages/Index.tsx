
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CtaSection from "@/components/landing/CtaSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, ChevronRight, Search, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* Value Proposition Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose UniFinance?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We help thousands of UK students find and secure the funding they need to pursue their education without financial stress.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-uni-purple-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-uni-purple-100 rounded-full mb-4">
                  <Search className="h-6 w-6 text-uni-purple-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Database</h3>
                <p className="text-gray-600">
                  Access over 10,000 funding opportunities from scholarships and grants to bursaries and hardship funds.
                </p>
              </div>
              
              <div className="bg-uni-purple-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-uni-purple-100 rounded-full mb-4">
                  <Award className="h-6 w-6 text-uni-purple-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Matches</h3>
                <p className="text-gray-600">
                  Our smart matching algorithm finds opportunities that match your unique profile and circumstances.
                </p>
              </div>
              
              <div className="bg-uni-purple-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-uni-purple-100 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-uni-purple-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Application Support</h3>
                <p className="text-gray-600">
                  Step-by-step guidance and AI assistance to help you create winning applications.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stats Section */}
        <section className="py-16 bg-uni-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-bold text-uni-purple-200">£14.2M</p>
                <p className="mt-2 text-uni-purple-100">Funding secured by our users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-bold text-uni-purple-200">8,500+</p>
                <p className="mt-2 text-uni-purple-100">Successful applications</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-bold text-uni-purple-200">92%</p>
                <p className="mt-2 text-uni-purple-100">User success rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-bold text-uni-purple-200">45+</p>
                <p className="mt-2 text-uni-purple-100">UK universities covered</p>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your funding?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Complete our quick onboarding process to discover scholarships and grants tailored to your profile.
              </p>
              <Button asChild size="lg" className="mx-auto">
                <Link to="/onboarding" className="flex items-center">
                  Start Your Journey <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
