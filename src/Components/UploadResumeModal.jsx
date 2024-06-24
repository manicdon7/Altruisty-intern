import React, { useState } from 'react';
import jsPDF from 'jspdf';

const UploadResumeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });

  const [isResumeBuilderOpen, setIsResumeBuilderOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleOpenResumeBuilder = () => {
    setIsResumeBuilderOpen(true);
  };

  const handleCloseResumeBuilder = () => {
    setIsResumeBuilderOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Resume (PDF, Image)</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-[#032d60] text-white rounded hover:bg-blue-900">
              Submit
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have a resume?</p>
          <button
            onClick={handleOpenResumeBuilder}
            className="mt-2 py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-300"
          >
            Build Your Resume Now
          </button>
        </div>
      </div>
      {isResumeBuilderOpen && (
        <ResumeBuilderModal resumeData={formData} isOpen={isResumeBuilderOpen} onClose={handleCloseResumeBuilder} />
      )}
    </div>
  );
};

const ResumeBuilderModal = ({ isOpen, onClose, resumeData }) => {
  const [previewData, setPreviewData] = useState(resumeData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPreviewData({
      ...previewData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(previewData);
    onClose();
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const imgData = data.profilePicture ? URL.createObjectURL(data.profilePicture) : null;

    if (imgData) {
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        doc.addImage(img, 'JPEG', 10, 10, 30, 30);
        addResumeContent(doc, data);
        doc.save('resume.pdf');
      };
    } else {
      addResumeContent(doc, data);
      doc.save('resume.pdf');
    }
  };

  const addResumeContent = (doc, data) => {
    // Add content to PDF document
    doc.setFontSize(12);
    doc.text(`Full Name: ${data.fullName}`, 20, 40);
    doc.text(`Email: ${data.email}`, 20, 50);
    doc.text(`Phone: ${data.phone}`, 20, 60);
    doc.text('Professional Summary:', 20, 70);
    doc.text(data.summary, 20, 80);
    doc.text('Education:', 20, 100);
    doc.text(data.education, 20, 110);
    doc.text('Experience:', 20, 130);
    doc.text(data.experience, 20, 140);
    doc.text('Skills:', 20, 160);
    doc.text(data.skills, 20, 170);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-4xl p-8 flex">
        <div className="w-2/3 pr-8">
          <h2 className="text-2xl font-semibold mb-4 mt-96">Build Your Resume</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={previewData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={previewData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={previewData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Professional Summary</label>
              <textarea
                name="summary"
                value={previewData.summary}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Education</label>
              <textarea
                name="education"
                value={previewData.education}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Experience</label>
              <textarea
                name="experience"
                value={previewData.experience}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Skills</label>
              <textarea
                name="skills"
                value={previewData.skills}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-4 py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" className="py-2 px-4 bg-[#032d60] text-white rounded hover:bg-blue-900">
                Generate PDF
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/3 border-l pl-8 mt-96">
          <div className="relative border rounded-lg border-gray-300 p-4 h-full">
            <h2 className="absolute top-0 left-0 bg-white px-2 -mt-4">Resume Preview</h2>
            <div className="flex items-center justify-center mb-4">
              {previewData.profilePicture && (
                <img
                  src={URL.createObjectURL(previewData.profilePicture)}
                  alt="Profile"
                  className="rounded-full w-20 h-20 object-cover"
                />
              )}
              {!previewData.profilePicture && (
                <div className="rounded-full w-20 h-20 border-2 border-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="mb-4">
              <p className="font-semibold">Full Name:</p>
              <p>{previewData.fullName}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Email:</p>
              <p>{previewData.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Phone:</p>
              <p>{previewData.phone}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Professional Summary:</p>
              <p>{previewData.summary}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Education:</p>
              <p>{previewData.education}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Experience:</p>
              <p>{previewData.experience}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Skills:</p>
              <p>{previewData.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResumeModal;
