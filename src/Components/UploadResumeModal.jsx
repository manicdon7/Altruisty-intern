import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FaLinkedin, FaTwitter, FaGithub, FaBehance } from 'react-icons/fa';

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
    // Define the positions and line height
    const startX = 20;
    let currentY = 20;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
  
    // Helper function to add text and update currentY
    const addText = (text, isBold = false) => {
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      doc.text(text, startX, currentY);
      currentY += lineHeight;
    };
  
    // Header with name and contact information
    doc.setFontSize(16);
    addText(data.fullName, true);
  
    doc.setFontSize(12);
    addText(`Email: ${data.email}`);
    addText(`Phone: ${data.phone}`);
  
    // Professional Summary
    doc.setFontSize(14);
    addText('Professional Summary', true);
  
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
    summaryLines.forEach(line => addText(line));
  
    // Education
    doc.setFontSize(14);
    addText('Education', true);
  
    doc.setFontSize(12);
    const educationLines = doc.splitTextToSize(data.education, contentWidth);
    educationLines.forEach(line => addText(line));
  
    // Experience
    doc.setFontSize(14);
    addText('Experience', true);
  
    doc.setFontSize(12);
    const experienceLines = doc.splitTextToSize(data.experience, contentWidth);
    experienceLines.forEach(line => addText(line));
  
    // Skills
    doc.setFontSize(14);
    addText('Skills', true);
  
    doc.setFontSize(12);
    const skillsLines = doc.splitTextToSize(data.skills, contentWidth);
    skillsLines.forEach(line => addText(line));
  
    // Certifications
    doc.setFontSize(14);
    addText('Certifications', true);
  
    doc.setFontSize(12);
    const certificationsLines = doc.splitTextToSize(data.certifications, contentWidth);
    certificationsLines.forEach(line => addText(line));
  
    // Personal Details
    doc.setFontSize(14);
    addText('Personal Details', true);
  
    doc.setFontSize(12);
    const personalDetailsLines = doc.splitTextToSize(data.personalDetails, contentWidth);
    personalDetailsLines.forEach(line => addText(line));
  
    // Social Media Links
    doc.setFontSize(14);
    addText('Social Media Links', true);
  
    doc.setFontSize(12);
    addText(`LinkedIn: ${data.linkedin}`);
    addText(`Twitter: ${data.twitter}`);
    addText(`GitHub: ${data.github}`);
    if (data.behance) {
      addText(`Behance: ${data.behance}`);
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-4xl p-8 mx-auto my-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-2/3 px-4">
            <h2 className="text-2xl font-semibold mb-4">Build Your Resume</h2>
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
                <label className="block text-gray-700">Technical Skills</label>
                <textarea
                  name="technicalSkills"
                  value={previewData.technicalSkills}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Certifications</label>
                <textarea
                  name="certifications"
                  value={previewData.certifications}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Co-curricular Activities</label>
                <textarea
                  name="activities"
                  value={previewData.activities}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={previewData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={previewData.motherName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={previewData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={previewData.linkedin}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={previewData.twitter}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={previewData.github}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Behance</label>
                <input
                  type="url"
                  name="behance"
                  value={previewData.behance}
                  onChange={handleChange}
                  required
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
          <div className="w-full md:w-1/3 px-4 mt-8 md:mt-0">
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
                <p className="font-semibold">Technical Skills:</p>
                <p>{previewData.technicalSkills}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Certifications:</p>
                <p>{previewData.certifications}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Co-curricular Activities:</p>
                <p>{previewData.activities}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Father's Name:</p>
                <p>{previewData.fatherName}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Mother's Name:</p>
                <p>{previewData.motherName}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Date of Birth:</p>
                <p>{previewData.dob}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">LinkedIn:</p>
                <p>{previewData.linkedin && <a href={previewData.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="inline-block mr-2" />{previewData.linkedin}</a>}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Twitter:</p>
                <p>{previewData.twitter && <a href={previewData.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="inline-block mr-2" />{previewData.twitter}</a>}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">GitHub:</p>
                <p>{previewData.github && <a href={previewData.github} target="_blank" rel="noopener noreferrer"><FaGithub className="inline-block mr-2" />{previewData.github}</a>}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Behance:</p>
                <p>{previewData.behance && <a href={previewData.behance} target="_blank" rel="noopener noreferrer"><FaBehance className="inline-block mr-2" />{previewData.behance}</a>}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResumeModal;
