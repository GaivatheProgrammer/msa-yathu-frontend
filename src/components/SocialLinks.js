import React from 'react';

const SocialLinks = () => {
  return (
    <div className="flex gap-4 justify-center">
      <a 
        href="https://facebook.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
      >
        📘
      </a>
      <a 
        href="https://wa.me/265886606571" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
      >
        💬
      </a>
      <a 
        href="https://linkedin.com/in/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition"
      >
        🔗
      </a>
      <a 
        href="https://github.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition"
      >
        🐙
      </a>
    </div>
  );
};

export default SocialLinks;




