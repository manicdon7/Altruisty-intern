import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css'

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
            setFormData({
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
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to create job post');
        }
    };

    return (
        <div id='rays' className="bg-gradient-to-r rays font-times from-blue-50 py-10 to-blue-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg px-8 py-6 w-10/12"
            >
                <h1 className="text-center text-3xl font-bold text-[#032d60] mb-4">Post Job Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Post Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter post name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package">
                            Package
                        </label>
                        <input
                            type="text"
                            name="package"
                            value={formData.package}
                            onChange={handleChange}
                            placeholder="Enter package details"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirements">
                            Requirements
                        </label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="Enter requirements"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillNeeded">
                            Skill Needed
                        </label>
                        <input
                            type="text"
                            name="skillNeeded"
                            value={formData.skillNeeded}
                            onChange={handleChange}
                            placeholder="Enter required skills"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responsibility">
                            Responsibility
                        </label>
                        <textarea
                            name="responsibility"
                            value={formData.responsibility}
                            onChange={handleChange}
                            placeholder="Enter responsibilities"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
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
                                <option value="Contract">Free-lancing</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                                Job Mode
                            </label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Job Mode</option>
                                <option value="Full-time">On-site</option>
                                <option value="Part-time">Remote</option>
                                <option value="Internship">Hybrid</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[#032d60] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default FormPage;
