import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const FormPage = ({ onNextPage }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      // Handle the next steps here
      console.log("Form submitted with choice:", selectedOption);
      onNextPage(); // Call the function to move to the next page
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-50">
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <div className="mb-4 text-center">
              <p className="h3">Who Do You Choose To Pay For?</p>
            </div>
            <div className="form-check mb-3">
              <input 
                className="form-check-input" 
                type="radio" 
                id="myself" 
                value="Myself" 
                checked={selectedOption === 'Myself'} 
                onChange={handleOptionChange} 
                required 
              />
              <label className="form-check-label" htmlFor="myself">
                <b>Myself</b>
              </label>
            </div>
            <div className="form-check mb-4">
              <input 
                className="form-check-input" 
                type="radio" 
                id="forSomeone" 
                value="For Someone" 
                checked={selectedOption === 'For Someone'} 
                onChange={handleOptionChange} 
                required 
              />
              <label className="form-check-label" htmlFor="forSomeone">
                <b>For Someone</b>
              </label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">Next</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormPage;

