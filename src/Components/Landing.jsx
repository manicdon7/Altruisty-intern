import React, { useState, useEffect } from 'react';
import heroimg from '../assets/co-workers-concept-landing-page_23-2148322670.png';
import { FiSearch } from "react-icons/fi";
import Type from './Type';
import UploadResumeModal from './UploadResumeModal';
import jobData from '../json/JobUpdates.json';
import internships from '../json/internships.json';
import jobs from '../json/jobs.json';
import programs from '../json/programs.json';
import rescents from '../json/recents.json';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Combine all job-related data into one array
    const allData = [...jobData, ...internships, ...jobs, ...programs, ...rescents];
    setCombinedData(allData);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.length > 2) {
      const filtered = combinedData.filter((job) => {
        const name = job.name ? job.name.toLowerCase() : '';
        const location = job.location ? job.location.toLowerCase() : '';

        return (
          name.includes(searchQuery.toLowerCase()) ||
          location.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
    setIsSearched(true);
  };

  return (
    <div>
      <div className='grid xl:grid-cols-2 grid-cols-1 xl:mx-10'>
        <div className='w-11/12 xl:mx-28 space-y-4'>
          <h1 className='capitalize xl:mt-28 mt-10 font-times xl:text-6xl text-4xl font-semibold mx-5 xl:mx-0'>Finding Your Next Jobs</h1>
          <h1 className='font-times text-lg mx-5 xl:mx-0'>"Finding Your Next Jobs" is your go-to resource for discovering new career opportunities. Explore a diverse range of job listings tailored to your skills and aspirations. Stay ahead in your career journey with expert advice and up-to-date industry insights.</h1>
          <button className='bg-[#ce4d2f] px-6 py-3 rounded-2xl my-5 text-white font-semibold text-xl font-times transition transform hover:scale-105 hover:text-[#eaf5fe] mx-5 xl:mx-0'>Explore Jobs</button>
        </div>
        <div className='flex justify-center'>
          <img src={heroimg} alt="heroimg" className='h-96 w-96' />
        </div>
      </div>
      <section className='flex space-x-10 justify-center my-6'>
        <div>
          <button
            className='uppercase bg-[#032d60] px-6 py-3 rounded-2xl my-5 text-white font-semibold text-xl font-times transition transform hover:scale-105 hover:text-[#eaf5fe] mx-5 xl:mx-0'
            onClick={() => setIsModalOpen(true)}
          >
            Upload Resume
          </button>
        </div>
        <div>
          <button className='uppercase bg-[#032d60] px-6 py-3 rounded-2xl my-5 text-white font-semibold text-xl font-times transition transform hover:scale-105 hover:text-[#eaf5fe] mx-5 xl:mx-0' onClick={()=> navigate('/postjob')} >Post Job</button>
        </div>
      </section>
      <section className='flex space-x-4 justify-center my-6' id='jobSearch'>
        <div className="relative w-80 border-2 rounded-full ml-10 bg-[#b7d4ff] hidden md:block">
          <input
            type="text"
            placeholder="Job Title, Keyword | 📍 Location"
            value={searchQuery}
            onChange={handleSearch}
            required
            className="w-full px-10 py-2 rounded-full bg-gray-50 font-times"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600" />
        </div>
        <div>
          <button
            className='uppercase bg-[#032d60] px-3 py-1 rounded-2xl my-1 text-white font-semibold text-xl font-times transition transform hover:scale-105 hover:text-[#eaf5fe] mx-5 xl:mx-0'
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </section>
      {isSearched && (
        filteredJobs.length > 0 ? (
          <section className='mt-10'>
            <div className='container mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredJobs.map((job) => (
                  <div key={job.id} className='border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                    <h2 className='text-2xl font-medium mb-4'>{job.name}</h2>
                    <p className='text-gray-700 mb-2'><strong>Company:</strong> {job.company}</p>
                    <p className='text-gray-700 mb-2'><strong>Location:</strong> {job.location}</p>
                    <p className='text-gray-700 mb-2'><strong>Domain:</strong> {job.domain}</p>
                    <p className='text-gray-700 mb-2'><strong>State:</strong> {job.state}</p>
                    <p className='text-gray-600 mb-2'>{job.description}</p>
                    <p className='text-gray-600 mb-2'><strong>Requirements:</strong> {job.requirements}</p>
                    <p className='text-gray-600 mb-4'><strong>Package:</strong> {job.package}</p>
                    <button className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300'>
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className='mt-10'>
            <p className='text-center text-gray-600 text-xl'>No match found</p>
          </section>
        )
      )}

      <Type />
      <UploadResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Landing;
