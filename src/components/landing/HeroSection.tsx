
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-uni-purple-50 rounded-l-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 md:mb-6">
              Smart finances for
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-uni-purple-700 to-uni-purple-500 block">
                UK uni students
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 md:mb-8">
              Budget with confidence, find new income streams, and build your financial future—without the stress or confusion.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="px-8 py-6">Get Started</Button>
              <Button size="lg" variant="outline" className="px-8 py-6">See Features</Button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-500">Trusted by students at</p>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="text-uni-neutral-700 font-medium text-sm">Oxford</span>
                <span className="text-uni-neutral-700 font-medium text-sm">Cambridge</span>
                <span className="text-uni-neutral-700 font-medium text-sm">UCL</span>
                <span className="text-uni-neutral-700 font-medium text-sm">Edinburgh</span>
                <span className="text-uni-neutral-700 font-medium text-sm">+45 more</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-4 bg-uni-purple-500 text-white">
                <h3 className="text-lg font-medium">Financial Dashboard</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Monthly Overview</h4>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Income</p>
                      <p className="text-lg font-semibold text-gray-800">£1,200</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Expenses</p>
                      <p className="text-lg font-semibold text-gray-800">£800</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Savings</p>
                      <p className="text-lg font-semibold text-gray-800">£400</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Budget Status</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Groceries</span>
                        <span>£80 / £150</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-uni-purple-500 h-2 rounded-full" style={{width: "53%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Transport</span>
                        <span>£45 / £80</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-uni-purple-500 h-2 rounded-full" style={{width: "56%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Entertainment</span>
                        <span>£60 / £70</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{width: "86%"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-gray-500">Updated just now</span>
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-uni-purple-100 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-uni-purple-200 rounded-full opacity-70 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
