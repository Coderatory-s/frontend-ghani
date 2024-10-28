"use client"; // Add this line to indicate it's a Client Component

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Importing Progress component from Shad UI
import { useEffect, useState } from "react";

// Define props type for Tooltip
interface TooltipProps {
  children: React.ReactNode; // Use ReactNode to allow any valid React child
}

// Example Tooltip Component
const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return (
    <div className="relative group">
      <span className="hidden group-hover:block absolute z-10 w-max px-2 py-1 text-sm text-white bg-black rounded-md">
        {children}
      </span>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [progress, setProgress] = useState(0);

  // Simulate progress on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">HR Application</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/attendance">
                <Button variant="default" className="text-white">Attendance</Button>
              </Link>
            </li>
            <li>
              <Link href="/leave">
                <Button variant="default" className="text-white">Leave</Button>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button variant="default" className="text-white">Login</Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="default" className="text-white">Register</Button>
              </Link>
            </li>
            <li>
              <Link href="/report">
                <Button variant="default" className="text-white">Report</Button>
              </Link>
            </li>
            <li>
              <Link href="/teams">
                <Button variant="default" className="text-white">Teams</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Loading Features...</h2>
        <Progress value={progress} max={100} className="my-2" />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our HR Application</h2>
        <p className="text-lg text-gray-600 mb-8">Select an option below to get started:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <Link href="/attendance">
            <Button variant="default" className="w-full">Attendance</Button>
          </Link>
          <Link href="/leave">
            <Button variant="default" className="w-full">Leave</Button>
          </Link>
          <Link href="/login">
            <Button variant="default" className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="default" className="w-full">Register</Button>
          </Link>
          <Link href="/report">
            <Button variant="default" className="w-full">Report</Button>
          </Link>
          <Link href="/teams">
            <Button variant="default" className="w-full">Teams</Button>
          </Link>
          
        </div>

        {/* Introduction Section */}
        <section className="mt-12 p-6 bg-white rounded shadow-md max-w-4xl w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About Our Application</h3>
          <p className="text-gray-600 mb-2">
            Our HR application is designed to streamline attendance tracking, leave management, and team collaboration.
          </p>
          <p className="text-gray-600">
            With user-friendly interfaces and robust features, it empowers organizations to enhance productivity and employee satisfaction. 
            Join us in transforming your HR processes for better efficiency!
          </p>
        </section>

        {/* Features Section */}
        <section className="mt-8 p-6 bg-white rounded shadow-md max-w-4xl w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <Tooltip>
                <span>🔍 Real-time attendance tracking</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>📅 Efficient leave management system</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>📊 Customizable reports and analytics</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>🤝 Team collaboration tools</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>✨ User-friendly interface</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>📖 Employee directory for easy access</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>🌟 Performance reviews for growth tracking</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>🗓️ Leave balance tracker for employees</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>🔔 Notification system for updates</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <span>📊 Customizable dashboard for insights</span>
              </Tooltip>
            </li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="mt-8 p-6 bg-white rounded shadow-md max-w-4xl w-full">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Our Users Say</h3>
          <blockquote className="text-gray-600 italic border-l-4 border-blue-900 pl-4">
            "This HR application has transformed the way we manage our team. 
            It's easy to use and has significantly improved our attendance tracking!" 
            <br /> - <strong>Jane Doe, HR Manager</strong>
          </blockquote>
        </section>

        {/* Call to Action */}
        <section className="mt-8 p-6 bg-blue-900 text-white rounded shadow-md max-w-4xl w-full">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="mb-4">Sign up today and experience the benefits of streamlined HR management!</p>
          <Link href="/register">
            <Button variant="default" className="w-full">Create an Account</Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Widget 1 */}
            <div>
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-white">Support</Link>
                </li>
              </ul>
            </div>

            {/* Widget 2 */}
            <div>
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <p className="text-gray-400">Email: support@hrapp.com</p>
              <p className="text-gray-400">Phone: +1 (555) 0123</p>
            </div>

            {/* Widget 3 */}
            <div>
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <ul className="flex space-x-4 justify-center">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                </li>
              </ul>
            </div>

            {/* Widget 4 */}
            <div>
              <h4 className="text-lg font-semibold">Newsletter</h4>
              <p className="text-gray-400">Subscribe to our newsletter for updates.</p>
              <form className="flex space-x-2 mt-2">
                <input type="email" placeholder="Your Email" className="p-2 rounded-md"/>
                <Button variant="default" className="text-white">Subscribe</Button>
              </form>
            </div>
          </div>

          <p className="text-gray-400">© 2024 HR Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
