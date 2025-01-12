import React from 'react';
import { ExternalLink, MapPin, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '../types/jobs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {job.company_logo && (
          <img 
            src={job.company_logo} 
            alt={`${job.company_name} logo`}
            className="w-16 h-16 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <Link to={`/job/${job.id}`} className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">{job.title}</h2>
              <p className="text-gray-600 font-medium">{job.company_name}</p>
            </Link>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 ml-4"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {job.job_type}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <MapPin className="w-4 h-4 mr-1" />
              {job.candidate_required_location}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <Clock className="w-4 h-4 mr-1" />
              {formatDate(job.publication_date)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}