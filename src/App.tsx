import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobList } from './pages/JobList';
import { JobDetails } from './pages/JobDetails';
import { Job } from './types/jobs';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://remotive.com/api/remote-jobs');
      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<JobList jobs={jobs} loading={loading} error={error} />} 
        />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;