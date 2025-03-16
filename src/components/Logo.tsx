import React from 'react';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <div className="ladle ladle-left"></div>
      <div className="ladle ladle-right"></div>
      <div className="metal-stream metal-left"></div>
      <div className="metal-stream metal-right"></div>
      <div className="rsp-text">РСП-Т</div>
    </div>
  );
};

export default Logo; 