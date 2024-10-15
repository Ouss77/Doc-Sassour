import React, { useState, useEffect } from 'react';
import docImage from '../assets/doc-icone.jpg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setIsAdmin(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-20 to-blue-50 bg-opacity-20 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={docImage} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Med Sassour</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to="/login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700
            dark:focus:ring-blue-800"
          >
            Connecter
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? 'block' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activePage === '/'
                    ? 'text-white dark:text-white'
                    : 'text-gray-900 dark:text-gray-400'
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  activePage === '/About'
                    ? 'text-white dark:text-white'
                    : 'text-gray-900 dark:text-gray-400'
                }`}
              >
                About
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/Patient"
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      activePage === '/Patient'
                        ? 'text-white dark:text-white'
                        : 'text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Patients
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Consultation"
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      activePage === '/Consultation'
                        ? 'text-white dark:text-white'
                        : 'text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Ordonance"
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      activePage === '/Ordonance'
                        ? 'text-white dark:text-white'
                        : 'text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Ordonnance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Medicament"
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                      activePage === '/Medicament'
                        ? 'text-white dark:text-white'
                        : 'text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Medicament
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/Contact"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  activePage === '/Contact'
                    ? 'text-white dark:text-white'
                    : 'text-gray-900 dark:text-gray-400'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
