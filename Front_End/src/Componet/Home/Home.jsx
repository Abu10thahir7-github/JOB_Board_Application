
import React, { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:2000/jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      job.companyName.toLowerCase().includes(lowerCaseQuery) ||
      job.role.toLowerCase().includes(lowerCaseQuery) ||
      job.experience.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
   
      <section className="section__container destination__container">
        <div className="section__header">
          <div>
            <h2 className="section__title">Explore top Jobs</h2>
          
          </div>
         
        </div>
        <div className="search__bar" style={{margin:'1rem'}}>
          <Input  style={{width:'500px',height:'40px',borderRadius:'10px'}}
            type="text"
            placeholder="Search for jobs by title, experience, or company..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="destination__grid">
          {filteredJobs.map((job, index) => (
            <div className="destination__card" key={index}>

              <div className="destination__details">
                <p className="destination__title">{job.companyName}</p>
                <p className="destination__subtitle">{job.role}</p>
                <p className="destination__subtitle">{job.experience}</p>
                <p className="destination__subtitle">{job.place}</p>
                <Button className="" sx={{borderRadius:'10px' , marginTop:'13px'} } variant='soft' onClick={() => navigate('/form')}>Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;