import React from 'react';

const Jobcards = () => {
  const domains = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer",
    "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Cloud Architect",
    "Product Manager", "Digital Marketer", "Content Writer", "Graphic Designer"
  ];

  const topCompanies = [
    "Chennai", "Mumbai", "Delhi", "Banglore", "Kerala", "Maharastra", "pune", "Kolatta"
  ];

  return (
    <div className='mx-10 my-10' id='companies'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className='font-semibold font-sans text-3xl mb-4'>Job Domains</h1>
          <div className="flex flex-wrap gap-4">
            {domains.map((domain, index) => (
              <button key={index} className="text-xl font-normal px-6 py-3 bg-[#032d60] rounded-full text-white hover:bg-orange-500 transition-colors duration-300">
                {domain}
              </button>
            ))}
          </div>
        </div>
        <div className=''>
          <h1 className='font-semibold font-sans text-3xl mb-4'>Top Companies in</h1>
          <div className="grid grid-cols-2 gap-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <a href='/' className="text-lg font-medium text-gray-800">{company}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobcards;
