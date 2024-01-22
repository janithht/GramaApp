import React, { useState } from 'react';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "./application.css";
import applyCertificate from "../../Assets/Apply.png";
import CustomButton from "../../Components/CustomButton/custombutton.jsx";
import validationSchema from "./validationSchema.js";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CustomButton from "../../Components/CustomButton/custombutton.jsx";
import validationSchema from "./validationSchema.js";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Application = () => {
  const [tele, setTele] = useState('');
  const [nic, setNIC] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [gramaSevaDivision, setGramaSevaDivision] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const gramaSevaDivisionOptions = [
    { value: 'division1', label: 'Division 1' },
    { value: 'division2', label: 'Division 2' },
  ];

  const handleTeleChange = (e) => setTele(e.target.value);
  const handleTeleChange = (e) => setTele(e.target.value);
  const handleNICChange = (e) => setNIC(e.target.value);
  const handleAddressNumberChange = (e) => setAddressNumber(e.target.value);
  const handleStreet1Change = (e) => setStreet1(e.target.value);
  const handleStreet2Change = (e) => setStreet2(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleGramaSevaDivisionChange = (e) => setGramaSevaDivision(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema.validate({
      tele,
      nic,
      addressNumber,
      street1,
      street2,
      city,
      gramaSevaDivision,
    }, { abortEarly: false })
      .then(() => console.log('Form is valid. Submitting...'))
      .catch((err) => {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema.validate({
      tele,
      nic,
      addressNumber,
      street1,
      street2,
      city,
      gramaSevaDivision,
    }, { abortEarly: false })
      .then(() => console.log('Form is valid. Submitting...'))
      .catch((err) => {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      });
  };

  return (
    <div className='full-container'>
      <MenuBar />
    <div className='full-container'>
      <MenuBar />
      <div className="main-form-container">
        <div className="img-container">
        <div className="img-container">
          <div className='heading-3'>
            <h2 className='text'>Apply for Grama Sevaka Certificate Online!</h2>
            <p className='text'>Fill the details and click submit button. You will be notified once the certificate is ready</p>
          </div>
          <img className="side-image" src={applyCertificate} alt="Description" />
        </div>
        <div className="form-container">
          <form className='application-form' onSubmit={handleSubmit}>
            <div className="input-field-div" >
              <InputGroup className={`mb-3 ${validationErrors.tele ? 'error' : ''}`}>
                <InputGroup.Text id="name-label">Telephone Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Telephone Number"
                  value={tele}
                  onChange={handleTeleChange}
                  aria-label="Telephone Number"
                  aria-describedby="name-label"
                />
              </InputGroup>
              {validationErrors.tele && <div className="error-message">{validationErrors.tele}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.nic ? 'error' : ''}`}>
                <InputGroup.Text id="nic-label">NIC</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="NIC"
                  value={nic}
                  onChange={handleNICChange}
                  aria-label="NIC"
                  aria-describedby="nic-label"
                />
              </InputGroup>
              {validationErrors.nic && <div className="error-message">{validationErrors.nic}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.addressNumber ? 'error' : ''}`}>
                <InputGroup.Text id="address-label">Address Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Address Number"
                  value={addressNumber}
                  onChange={handleAddressNumberChange}
                  aria-label="Address Number"
                  aria-describedby="address-label"
                />
              </InputGroup>
              {validationErrors.addressNumber && <div className="error-message">{validationErrors.addressNumber}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.street1 ? 'error' : ''}`}>
                <InputGroup.Text id="street1-label">Street 1</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Street 1"
                  value={street1}
                  onChange={handleStreet1Change}
                  aria-label="Street 1"
                  aria-describedby="street1-label"
                />
              </InputGroup>
              {validationErrors.street1 && <div className="error-message">{validationErrors.street1}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.street2 ? 'error' : ''}`}>
                <InputGroup.Text id="street2-label">Street 2</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Street 2"
                  value={street2}
                  onChange={handleStreet2Change}
                  aria-label="Street 2"
                  aria-describedby="street2-label"
                />
              </InputGroup>
              {validationErrors.street2 && <div className="error-message">{validationErrors.street2}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.city ? 'error' : ''}`}>
                <InputGroup.Text id="city-label">City</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="City"
                  value={city}
                  onChange={handleCityChange}
                  aria-label="City"
                  aria-describedby="city-label"
                />
              </InputGroup>
              {validationErrors.city && <div className="error-message">{validationErrors.city}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.gramaSevaDivision ? 'error' : ''}`}>
                <InputGroup.Text id="division-label">Grama Seva Division</InputGroup.Text>
                <Form.Control
                  as="select"
                  className="select-input"
                  value={gramaSevaDivision}
                  onChange={handleGramaSevaDivisionChange}
                  aria-label="Grama Seva Division"
                  aria-describedby="division-label"
                >
                  {gramaSevaDivisionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
              {validationErrors.gramaSevaDivision && <div className="error-message">{validationErrors.gramaSevaDivision}</div>}
            </div>

            <CustomButton type="submit">Submit Application</CustomButton>
          <form className='application-form' onSubmit={handleSubmit}>
            <div className="input-field-div" >
              <InputGroup className={`mb-3 ${validationErrors.tele ? 'error' : ''}`}>
                <InputGroup.Text id="name-label">Telephone Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Telephone Number"
                  value={tele}
                  onChange={handleTeleChange}
                  aria-label="Telephone Number"
                  aria-describedby="name-label"
                />
              </InputGroup>
              {validationErrors.tele && <div className="error-message">{validationErrors.tele}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.nic ? 'error' : ''}`}>
                <InputGroup.Text id="nic-label">NIC</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="NIC"
                  value={nic}
                  onChange={handleNICChange}
                  aria-label="NIC"
                  aria-describedby="nic-label"
                />
              </InputGroup>
              {validationErrors.nic && <div className="error-message">{validationErrors.nic}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.addressNumber ? 'error' : ''}`}>
                <InputGroup.Text id="address-label">Address Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Address Number"
                  value={addressNumber}
                  onChange={handleAddressNumberChange}
                  aria-label="Address Number"
                  aria-describedby="address-label"
                />
              </InputGroup>
              {validationErrors.addressNumber && <div className="error-message">{validationErrors.addressNumber}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.street1 ? 'error' : ''}`}>
                <InputGroup.Text id="street1-label">Street 1</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Street 1"
                  value={street1}
                  onChange={handleStreet1Change}
                  aria-label="Street 1"
                  aria-describedby="street1-label"
                />
              </InputGroup>
              {validationErrors.street1 && <div className="error-message">{validationErrors.street1}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.street2 ? 'error' : ''}`}>
                <InputGroup.Text id="street2-label">Street 2</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="Street 2"
                  value={street2}
                  onChange={handleStreet2Change}
                  aria-label="Street 2"
                  aria-describedby="street2-label"
                />
              </InputGroup>
              {validationErrors.street2 && <div className="error-message">{validationErrors.street2}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.city ? 'error' : ''}`}>
                <InputGroup.Text id="city-label">City</InputGroup.Text>
                <Form.Control
                  type="text"
                  // placeholder="City"
                  value={city}
                  onChange={handleCityChange}
                  aria-label="City"
                  aria-describedby="city-label"
                />
              </InputGroup>
              {validationErrors.city && <div className="error-message">{validationErrors.city}</div>}
            </div>

            <div className='input-field-div'>
            <InputGroup className={`mb-3 ${validationErrors.gramaSevaDivision ? 'error' : ''}`}>
                <InputGroup.Text id="division-label">Grama Seva Division</InputGroup.Text>
                <Form.Control
                  as="select"
                  className="select-input"
                  value={gramaSevaDivision}
                  onChange={handleGramaSevaDivisionChange}
                  aria-label="Grama Seva Division"
                  aria-describedby="division-label"
                >
                  {gramaSevaDivisionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
              {validationErrors.gramaSevaDivision && <div className="error-message">{validationErrors.gramaSevaDivision}</div>}
            </div>

            <CustomButton type="submit">Submit Application</CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;