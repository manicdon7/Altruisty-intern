import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#032d60] text-white py-8 font-times">
      <div className="lg:mx-40 mx-10 px-4">
        <div className="grid lg:grid-cols-3 grid-cols-1 md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/" className="hover:text-orange-500">Home</a></li>
              <li className="mb-2"><a href="#jobsearch" className="hover:text-orange-500">Job Search</a></li>
              <li className="mb-2"><a href="#companies" className="hover:text-orange-500">Top Companies</a></li>
              <li className="mb-2"><a href="#updates" className="hover:text-orange-500">Job Updates</a></li>
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
              <a href="https://youtube.com" className="text-white hover:text-orange-500">
                <FaYoutube className="w-6 h-6" />
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
