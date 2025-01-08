import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 ">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LearnSyntax</h2>
          <p className="text-gray-400">
            LearnSyntax offers quality coding education for all levels. Master
            the skills needed to excel in software development.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">123 LearnSyntax Lane, Code City</p>
          <p className="text-gray-400">Email: support@learnsyntax.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
             <FaFacebook size="23"/>

            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="github"
            >
            <FaGithub size="23"/>

            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram  size="23"/>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin  size="23"/>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 mt-8">
        <p>
          &copy; {new Date().getFullYear()} LearnSyntax. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
