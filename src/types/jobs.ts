export interface Job {
  id: number;
  title: string;
  company_name: string;
  company_logo: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  url: string;
}