import React, { useState, useEffect } from 'react';

const Type = () => {
  const [selectedType, setSelectedType] = useState('jobs');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchData(selectedType);
  }, [selectedType]);

  const fetchData = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    fetchData(type);
  };

  const filterPosts = () => {
    // Example filtering logic (customize as per your requirements)
    let filteredData = posts.filter(post => {
      // Example: filter by job type, remote, etc.
      return true;
    });
    setFilteredPosts(filteredData);
  };

  useEffect(() => {
    filterPosts();
  }, [posts]);

  const Card = ({ post }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <div className="relative border p-4 rounded-lg shadow-lg font-times transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300 h-96 overflow-hidden">
        <div className="flex justify-between items-start h-full">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2 truncate">{post.name}</h2>
              <p className="mb-2 line-clamp-2"><strong>Description:</strong>{post.description}</p>
              <p className="mb-2"><strong>Package:</strong> {post.package}</p>
              <p className="mb-2 line-clamp-2"><strong>Requirements:</strong> {post.requirements}</p>
              <p className="mb-2"><strong>Category:</strong> {post.category}</p>
              <p className="mb-2"><strong>Job Type:</strong> {post.jobType}</p>
              <p className="mb-2"><strong>Location:</strong> {post.location}</p>
            </div>
            <button className="mt-2 py-2 px-4 bg-[#032d60] text-white rounded hover:bg-blue-900 transition-colors duration-300">Apply</button>
          </div>
          <div className="relative">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v0m0 6v0m0 6v0" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Details</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Save Post</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Not Interested</a>
              </div>
            )}
          </div>
        </div>
      </div>

    );
  };

  return (
    <div className="p-4 font-times">
      <div className="flex justify-around space-x-4 mb-4 mx-20">
        <button onClick={() => handleTypeChange('jobs')} className={`py-2 px-4 rounded ${selectedType === 'jobs' ? 'bg-[#ce4d2f] text-white' : 'bg-gray-200'}`}>
          Jobs
        </button>
        <button onClick={() => handleTypeChange('internships')} className={`py-2 px-4 rounded ${selectedType === 'internships' ? 'bg-[#ce4d2f] text-white' : 'bg-gray-200'}`}>
          Internships
        </button>
        <button onClick={() => handleTypeChange('programs')} className={`py-2 px-4 rounded ${selectedType === 'programs' ? 'bg-[#ce4d2f] text-white' : 'bg-gray-200'}`}>
          Programs
        </button>
        <button onClick={() => handleTypeChange('recents')} className={`py-2 px-4 rounded ${selectedType === 'recents' ? 'bg-[#ce4d2f] text-white' : 'bg-gray-200'}`}>
          Recent
        </button>
      </div>
      <hr className='mx-20 my-3 border-1 border-black' />
      <div className="flex justify-around space-x-4 mb-4 mx-20">
        <div className="w-48">
          <label className="block text-gray-700">Date Posted</label>
          <select className="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-gray-700">Remote</label>
          <select className="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
            <option>Remote</option>
            <option>On-site</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-gray-700">Job Type</label>
          <select className="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-gray-700">Experience</label>
          <select className="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-gray-700">Location</label>
          <select className="mt-1 block w-full bg-white border border-gray-300 rounded shadow-sm py-2 px-3">
            <option>New York</option>
            <option>San Francisco</option>
            <option>Remote</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 my-5">
        {filteredPosts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Type;
