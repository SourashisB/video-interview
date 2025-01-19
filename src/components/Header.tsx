import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          HEC Paris Video Interview 
        </h1>
        <img
          src={require('../assets/logo.jpg')}
          alt="Platform Logo"
          className="h-10 w-50"
        />
      </div>
    </header>
  );
};

export default Header;