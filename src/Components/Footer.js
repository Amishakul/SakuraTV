import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 shadow-inner mt-10">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-3xl font-extrabold text-pink-600 mb-3">🌸 Sakura TV</h2>
          <p className="text-md text-gray-800 max-w-xs leading-relaxed">
            Discover trending anime, movies — all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-pink-600">Quick Links</h3>
          <ul className="space-y-3 text-md">
            <li>
              <a href="/home" className="hover:text-pink-600 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/search" className="hover:text-pink-600 transition-colors duration-300">
                Search Anime
              </a>
            </li>
            <li>
              <a href="/request" className="hover:text-pink-600 transition-colors duration-300">
                Request Anime
              </a>
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="flex flex-col justify-center items-start md:items-end text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Sakura TV</p>
          <p className="mt-1 italic">Made with 💖 for anime lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
