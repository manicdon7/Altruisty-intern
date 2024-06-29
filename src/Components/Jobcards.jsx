import React from 'react';

const Jobcards = () => {
  const domains = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer",
    "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Cloud Architect",
    "Product Manager", "Digital Marketer", "Content Writer", "Graphic Designer"
  ];

  const topCompanies = [
    "Chennai", "Mumbai", "Delhi", "Bangalore", "Kerala", "Maharashtra", "Pune", "Kolkata"
  ];

  return (
    <div className='mx-10 my-10'>
      <div className="mb-12">
        <h1 className='font-semibold font-times text-3xl mb-6 text-center'>Explore Job Domains</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {domains.map((domain, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer"
            >
              <button 
                className="text-lg font-medium px-6 py-3 bg-[#032d60] rounded-full text-white hover:bg-blue-700 transition-colors duration-300 shadow-lg font-times"
              >
                {domain}
              </button>
              <div className="absolute inset-0 bg-[#032d60] opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-full">
                <p className="text-white font-semibold font-times text-center flex items-center justify-center h-full">Explore</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className='font-semibold font-times text-3xl mb-6 text-center'>Top Companies In</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {topCompanies.map((company, index) => (
            <div 
              key={index} 
              className="relative bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <a href='/' className="text-lg font-medium font-times text-gray-800 block text-center">{company}</a>
              <div className="absolute inset-0 bg-[#032d60] opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-lg">
                <p className="text-white font-times font-semibold text-center flex items-center justify-center h-full">Learn More</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobcards;
