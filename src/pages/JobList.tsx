import React, { useState, useEffect } from 'react';
import { Job } from '../types/jobs';
import { JobCard } from '../components/JobCard';
import { Pagination } from '../components/Pagination';
import { Navbar } from '../components/Navbar';
import { Filters } from '../components/Filters';
import { Search, Briefcase, Loader2, MapPin, Users, TrendingUp, Building2 } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error: string;
}

export function JobList({ jobs, loading, error }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const jobsPerPage = 10;

  // Extract unique countries and tags from jobs
  const countries = Array.from(new Set(jobs.map(job => job.candidate_required_location))).sort();
  const allTags = Array.from(new Set(jobs.flatMap(job => job.tags))).sort();
  const popularTags = allTags.slice(0, 15); // Show top 15 tags

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCountry = !selectedCountry || job.candidate_required_location === selectedCountry;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => job.tags.includes(tag));

      return matchesSearch && matchesCountry && matchesTags;
    });
    
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [jobs, searchTerm, selectedCountry, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredCompanies = [
    'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=100&h=100&q=80',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Remote Job in the USA
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100">
              Discover thousands of remote opportunities from top US companies
            </p>
            <div className="max-w-3xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-lg"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-gray-600">Companies Hiring</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-gray-600">Remote Workers</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Companies */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Trusted by Leading Companies
          </h2>
          <div className="flex justify-center space-x-8">
            {featuredCompanies.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Featured company ${index + 1}`}
                className="h-16 w-16 object-contain rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              availableTags={popularTags}
              countries={countries}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Available Positions
                  </h2>
                  <p className="text-gray-600">
                    Found {filteredJobs.length} jobs
                  </p>
                </div>
                <div className="space-y-6">
                  {paginatedJobs.length > 0 ? (
                    <>
                      {paginatedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                      {totalPages > 1 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <div className="text-gray-500 mb-4">
                        No jobs found matching your search criteria
                      </div>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCountry('');
                          setSelectedTags([]);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}