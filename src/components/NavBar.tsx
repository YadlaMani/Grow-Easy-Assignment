import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ads Banner</h1>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/yadla-mani/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/YadlaMani/Grow-Easy-Assignment"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
