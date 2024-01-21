// Import necessary modules and components
import React, { useState } from 'react';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import InputField from "../../Components/Input/input.jsx";
import "./application.css";
import applyCertificate from "../../Assets/Apply.png";
import Button from "../../Components/Button/button.jsx";



const Application = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [gramaSevaDivision, setGramaSevaDivision] = useState('');

  // Dropdown options for Grama Seva Division
  const gramaSevaDivisionOptions = [
    { value: 'division1', label: 'Division 1' },
    { value: 'division2', label: 'Division 2' },
    // Add more options as needed
  ];

  // Event handlers for form fields
  const handleNameChange = (e) => setName(e.target.value);
  const handleNICChange = (e) => setNIC(e.target.value);
  const handleAddressNumberChange = (e) => setAddressNumber(e.target.value);
  const handleStreet1Change = (e) => setStreet1(e.target.value);
  const handleStreet2Change = (e) => setStreet2(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleGramaSevaDivisionChange = (e) => setGramaSevaDivision(e.target.value);

  return (
    <div className='full-container'>
        <MenuBar />
      <div className="main-form-container">
        <div className="img-container">
          <div className='heading-3'>
            <h2 className='text'>Apply for Grama Sevaka Certificate Online!</h2>
            <p className='text'>Fill the details and click submit button. You will be notified once the certificate is ready</p>
          </div>
          <img className="side-image" src={applyCertificate} alt="Description" />
        </div>
        <div className="form-container">
          <form className='application-form'>
            <InputField type="text" placeholder="Name" value={name} onChange={handleNameChange} />
            <InputField type="text" placeholder="NIC" value={nic} onChange={handleNICChange} />
            <InputField type="text" placeholder="Address Number" value={addressNumber} onChange={handleAddressNumberChange} />
            <InputField type="text" placeholder="Street 1" value={street1} onChange={handleStreet1Change} />
            <InputField type="text" placeholder="Street 2" value={street2} onChange={handleStreet2Change} />
            <InputField type="text" placeholder="City" value={city} onChange={handleCityChange} />
            <InputField className='select-input' type="select" options={gramaSevaDivisionOptions} value={gramaSevaDivision} onChange={handleGramaSevaDivisionChange} />
            <Button className="submit-button">Submit Application</Button>
          </form>
        </div>
        {/* Image on the left side */}
        
      </div>
    </div>
  );
};

export default Application;
