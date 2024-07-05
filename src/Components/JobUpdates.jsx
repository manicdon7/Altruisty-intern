import React, { useState, useEffect } from 'react';
import jobUpdates from '../json/JobUpdates.json';

const JobUpdates = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobUpdates);
  }, []);

  return (
    <div className="mx-auto my-8 px-4" id='updates'>
      <h1 className="font-semibold font-times text-4xl mb-8 text-center">Recommended Job Updates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-300">
            <img src={job.image} alt={job.title} className="w-full h-40 object-cover rounded-t-xl" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600 mb-2"><strong>Domain:</strong> {job.domain}</p>
              <p className="text-gray-600 mb-4"><strong>State:</strong> {job.state}</p>
              <p className="text-gray-700">{job.description.slice(0, 100)}...</p>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 py-2 px-4 bg-[#032d60] text-white rounded-full hover:bg-blue-900 transition-colors duration-300">
                  Read More
                </button>
                <button className="flex-1 py-2 px-4 bg-[#ce4d2f] text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobUpdates;
