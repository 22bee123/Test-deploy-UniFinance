
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-display text-xl text-uni-purple-700 font-bold">
                Uni<span className="text-uni-purple-500">Finance</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Simplifying student finances across the UK.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-uni-purple-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-uni-purple-500">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-uni-purple-500">
                <Github size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Budgeting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Savings Goals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Job Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Grants & Funding
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Financial Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Student Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-uni-purple-500 text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} UniFinance UK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
