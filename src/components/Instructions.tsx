import React from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8 my-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">How to Record Your Video Essay</h1>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-2">1. Prepare Your Environment</h2>
            <p className="text-gray-600">Find a quiet space with good lighting and ensure your camera and microphone are working.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-2">2. Review the Prompt</h2>
            <p className="text-gray-600">You will have one minute to read and understand the essay prompt before starting your recording.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-2">3. Recording</h2>
            <p className="text-gray-600">Click the record button when ready. You'll have 30 seconds to answer each prompt.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-2">4. Submission</h2>
            <p className="text-gray-600">Each submission is final. You will not have a chance to re-record or review your answer when submitted.</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/video-essay')}
          className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Start Video Essay
        </button>
      </div>
    </div>
  );
};

export default Instructions;