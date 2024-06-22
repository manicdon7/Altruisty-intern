import React, { useState, useEffect } from 'react';
import jobUpdates from '../json/JobUpdates.json';

const JobUpdates = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobUpdates);
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="font-semibold font-sans text-4xl mb-8 text-center">Recommended Job Updates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-blue-100 border p-3 border-gray-200 w-96 h-full rounded-3xl shadow-xl hover:scale-105 transition transform hover:shadow-2xl duration-200">
            <img src={job.image} alt={job.title} className="w-80 h-40 object-cover rounded-lg mb-4" />
            <div className="px-6">
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-500 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-500 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-500 mb-1"><strong>Domain:</strong> {job.domain}</p>
              <p className="text-gray-500 mb-2"><strong>State:</strong> {job.state}</p>
              <p className="text-gray-600 mb-4">{job.introduction}</p>
              <p className="text-gray-600 mb-4">{job.description.slice(0, 100)}...</p>
              <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
                Read More
              </button>
              <button className="ml-2 py-2 px-4 bg-[#ce4d2f] text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
                Apply Now
              </button>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default JobUpdates;
