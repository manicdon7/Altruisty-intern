import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="mx-40 px-4">
        <div className="grid grid-cols-3 md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/" className="hover:text-orange-500">Home</a></li>
              <li className="mb-2"><a href="/jobs" className="hover:text-orange-500">Jobs</a></li>
              <li className="mb-2"><a href="/internships" className="hover:text-orange-500">Internships</a></li>
              <li className="mb-2"><a href="/information" className="hover:text-orange-500">Information</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Help</h3>
            <ul>
              <li className="mb-2"><a href="/help" className="hover:text-orange-500">Help</a></li>
              <li className="mb-2"><a href="/guidelines" className="hover:text-orange-500">Guidelines</a></li>
              <li className="mb-2"><a href="/terms" className="hover:text-orange-500">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-orange-500">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-orange-500">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-orange-500">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-orange-500">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Altruisty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
