import React from 'react';
import { Job } from '../types/jobs';

interface JobSchemaProps {
  job: Job;
}

export function JobSchema({ job }: JobSchemaProps) {
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "datePosted": job.publication_date,
    "description": job.description,
    "employmentType": job.job_type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company_name,
      "logo": job.company_logo
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "United States"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jobSchema)}
    </script>
  );
}