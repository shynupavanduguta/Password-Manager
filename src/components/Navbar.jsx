import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-200 via-black-200 to-green-200 text-black text-2xl shadow-md">
      <div className="flex justify-between items-center px-6 py-4 h-14">
        {/* Logo */}
        <div className="logo font-bold text-black-700">
          <span className="text-black">&lt;</span>
          Pass<span className="text-green-700">Manager/&gt;</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-8">
          <li>
            <a
              className="hover:font-bold hover:text-blue-600 transition duration-300"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:font-bold hover:text-blue-600 transition duration-300"
              href="#"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className="hover:font-bold hover:text-blue-600 transition duration-300"
              href="#"
            >
              About
            </a>
          </li>
        </ul>

        {/* GitHub Button */}
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300"
        >
          {/* GitHub Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577 0-.285-.011-1.242-.017-2.247-3.338.727-4.042-1.611-4.042-1.611-.546-1.387-1.334-1.758-1.334-1.758-1.09-.745.082-.73.082-.73 1.204.084 1.838 1.237 1.838 1.237 1.07 1.835 2.805 1.305 3.49.998.108-.774.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.305-.535-1.53.118-3.188 0 0 1.007-.322 3.3 1.231.957-.266 1.983-.399 3.003-.405 1.02.006 2.046.139 3.003.405 2.292-1.553 3.297-1.231 3.297-1.231.655 1.658.243 2.883.119 3.188.77.84 1.236 1.911 1.236 3.221 0 4.61-2.806 5.623-5.479 5.92.429.369.812 1.096.812 2.21 0 1.596-.014 2.884-.014 3.272 0 .32.216.694.825.577C20.565 21.796 24 17.299 24 12 24 5.372 18.628 0 12 0z"
              clipRule="evenodd"
            />
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
