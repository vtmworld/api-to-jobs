import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RemoteUSA</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                All Jobs
              </Link>
              <Link
                to="/tech"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Tech
              </Link>
              <Link
                to="/marketing"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Marketing
              </Link>
              <Link
                to="/design"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Design
              </Link>
            </div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              All Jobs
            </Link>
            <Link
              to="/tech"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50"
            >
              Tech
            </Link>
            <Link
              to="/marketing"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50"
            >
              Marketing
            </Link>
            <Link
              to="/design"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50"
            >
              Design
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}