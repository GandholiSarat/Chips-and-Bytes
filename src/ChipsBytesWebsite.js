// Updated ChipsBytesWebsite.jsx with new tabs and no icons

import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Pages/HomePage';
import './style.css';

const ChipsBytesWebsite = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomePage />
    </div>
  );
};

export default ChipsBytesWebsite;