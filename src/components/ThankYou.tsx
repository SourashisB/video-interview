import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          We appreciate your time in completing all three video essays. Your responses have been recorded successfully.
        </p>
        <div className="mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <p className="text-gray-500">
          Redirecting to login page in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default ThankYou;