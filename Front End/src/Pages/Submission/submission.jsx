import React from 'react';
import './submission.css';
//import ImagePlaceholder from './image-placeholder.png'; // Replace with your actual image path

const Submission = () => {
  return (
    <div className="submission-container">
      <div className="header"> */}
       {/* <img src={ImagePlaceholder} alt="Form Logo" className="logo" /> */}
        <h2>Submission Form</h2>
      </div>
      <form className="submission-form">
        <div className="form-group">
          <label htmlFor="nic">NIC:</label>
          <input type="text" id="nic" name="nic" placeholder="Enter NIC" />
        </div>

        <div className="address-group">
          <h3>Permanent Address</h3>
          <div className="form-group">
            <label htmlFor="street1">Street 1:</label>
            <input type="text" id="street1" name="street1" placeholder="Enter Street 1" />
          </div>

          <div className="form-group">
            <label htmlFor="street2">Street 2:</label>
            <input type="text" id="street2" name="street2" placeholder="Enter Street 2" />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter City" />
          </div>

          <div className="form-group">
            <label htmlFor="postalcode">Postal Code:</label>
            <input type="text" id="postalcode" name="postalcode" placeholder="Enter Postal Code" />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Submission;