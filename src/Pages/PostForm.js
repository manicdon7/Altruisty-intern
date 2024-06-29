import React, { useState } from 'react';

const FormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        package: '',
        requirements: '',
        skillNeeded: '',
        responsibility: '',
        category: '',
        jobType: '',
        experience: '',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/postData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Job post created successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to create job post');
        }
    };

    return (
        <div className="p-4 bg-[#eaf5fe] pb-9">
            <div>
                <h1 className='text-center font-bold text-3xl my-8'>Post Job Details</h1>
            </div>
            <form onSubmit={handleSubmit} className="mb-4 mx-20">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Post Name"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <input
                    type="text"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    placeholder="Package"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Requirements"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <input
                    type="text"
                    name="skillNeeded"
                    value={formData.skillNeeded}
                    onChange={handleChange}
                    placeholder="Skill Needed"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <textarea
                    name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    placeholder="Responsibility"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 block w-full"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                            Job Type
                        </label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                            Experience
                        </label>
                        <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Experience</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-[#032d60] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormPage;
