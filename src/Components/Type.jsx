import React, { useState, useEffect, useRef } from 'react';

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
    let filteredData = posts.filter(post => true);
    setFilteredPosts(filteredData);
  };

  useEffect(() => {
    filterPosts();
  }, [posts]);

  const Card = ({ post }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    useEffect(() => {
      if (isMenuOpen) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isMenuOpen]);

    return (
      <div className="relative lg:w-96 border p-4 mx-2 rounded-lg shadow-lg font-times transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300 h-96 overflow-hidden">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className='flex justify-between'>
              <h2 className="text-2xl font-semibold mb-2 truncate">{post.name}</h2>
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v0m0 6v0m0 6v0" />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute z-30 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Details</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Save Post</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Not Interested</a>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex"><strong className="w-28">Description:</strong> <span className="line-clamp-2">{post.description}</span></p>
              <p className="flex"><strong className="w-28">Requirements:</strong> <span className="line-clamp-2">{post.requirements}</span></p>
              <p className="flex"><strong className="w-28">Category:</strong> <span>{post.category}</span></p>
              <p className="flex"><strong className="w-28">Job Mode:</strong> <span>{post.jobType}</span></p>
              <p className="flex"><strong className="w-28">Location:</strong> <span>{post.location}</span></p>
              <p className="flex"><strong className="w-28">Package:</strong> <span>{post.package}</span></p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="py-2 px-4 bg-[#032d60] text-white rounded hover:bg-blue-900 transition-colors duration-300">Apply</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:p-4 font-times overflow-x-hidden">
      <div className="flex flex-wrap justify-evenly lg:justify-around space-y-4 md:space-y-0 md:space-x-4 md:justify-start mb-4">
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
      <hr className='lg:mx-20 my-3 border-1 border-black' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-20 my-5">
        {filteredPosts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Type;
