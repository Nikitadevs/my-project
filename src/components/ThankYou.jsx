// src/components/ThankYou.jsx

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Updated import
import PropTypes from 'prop-types';

const ThankYou = ({ darkMode = false }) => {
  const navigate = useNavigate(); // Updated hook

  const handleBack = () => {
    navigate('/'); // Redirect to Home or adjust as needed
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
      aria-labelledby="thank-you-heading"
    >
      <section
        className="relative min-h-[40vh] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-2xl rounded-3xl shadow-2xl text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 drop-shadow-lg">
          Thank You!
        </h2>
        <p className="text-lg sm:text-xl mb-6 font-medium text-gray-700 dark:text-gray-200">
          Your message has been sent successfully. I appreciate your interest and will get back to you soon!
        </p>
        <div className="flex items-center justify-center">
          <svg className="w-16 h-16 text-green-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </section>
      <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        Back to Home
      </button>
    </motion.div>
  );
};

ThankYou.propTypes = {
  darkMode: PropTypes.bool,
};

export default ThankYou;
