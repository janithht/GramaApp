import React, {useState,useEffect} from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "./application.css";
import applyCertificate from "../../Assets/Apply.png";
import CustomButton from "../../Components/CustomButton/custombutton.jsx";
import validationSchema from "./validationSchema.js";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAuthContext } from "@asgardeo/auth-react";
import axios from 'axios';
import { toast } from 'react-toastify';


const Application = () => {

    const {state, getBasicUserInfo } = useAuthContext() || {};
    const [userEmail, setUserEmail] = useState();
  
    useEffect(() => {
        getBasicUserInfo().then((response) => {
        setUserEmail(response.email);
        console.log("email : ",response.email);
        });
    }, [getBasicUserInfo]);

    const validateField = (field, value) => {
        try {
          validationSchema.fields[field].validateSync(value);
          return ''; // No error
        } catch (error) {
          return error.message;
        }
      };
    
      const handleValidation = (values) => {
        const errors = {};
        Object.keys(values).forEach((field) => {
          const errorMessage = validateField(field, values[field]);
          if (errorMessage) {
            errors[field] = errorMessage;
          }
        });
        return errors;
      };
    
      const handleSubmit = async (values, actions) => {

        // Validate all fields before submission
        const errors = handleValidation(values);
    
        if (Object.keys(errors).length > 0) {
          actions.setErrors(errors);
        } else {

          const requestData = {
            NIC: values.nic,
            city: values.city,
            division_id: parseInt(values.gramaSevaDivision, 10), 
            email: "hello@123.com",
            no: values.addressNumber,
            phoneNo: values.tele,
            postalcode: values.postalcode,
            street1: values.street1,
            street2: values.street2,            
          };

          try {
            console.log("aaaa",requestData);
            const response = await axios.post(
              'https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/certify-service/gramacertificate-b76/v1.0/addCertificateRequest',
              requestData
            );
      
            console.log('API response:', response.data);
          } catch (error) {
            console.error('Error occurred while submitting form:', error);
                toast.error('Error occurred while submitting form:', error);
                if (error.response) {
                    console.error('Response Data:', error.response.data);
                    console.error('Response Status:', error.response.status);
                    console.error('Response Headers:', error.response.headers);
                }
          }
        }
      };
    
      const formik = useFormik({
        initialValues: {
          tele: '',
          nic: '',
          addressNumber: '',
          street1: '',
          street2: '',
          city: '',
          postalcode: '',
          gramaSevaDivision: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
          handleSubmit(values, actions);
        },
      });

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
          <form className='application-form' onSubmit={formik.handleSubmit}>
            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="tele-label">Telephone Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="tele"
                  name="tele"
                  value={formik.values.tele}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Telephone Number"
                  aria-describedby="tele-label"
                />
              </InputGroup>
              {formik.touched.tele && formik.errors.tele && (
                <div className="error-message">{formik.errors.tele}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="nic-label">NIC</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="nic"
                  name="nic"
                  value={formik.values.nic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="NIC"
                  aria-describedby="nic-label"
                />
              </InputGroup>
              {formik.touched.nic && formik.errors.nic && (
                <div className="error-message">{formik.errors.nic}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="address-label">Address Number</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="addressNumber"
                  name="addressNumber"
                  value={formik.values.addressNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Address Number"
                  aria-describedby="address-label"
                />
              </InputGroup>
              {formik.touched.addressNumber && formik.errors.addressNumber && (
                <div className="error-message">{formik.errors.addressNumber}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="street1-label">Street 1</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="street1"
                  name="street1"
                  value={formik.values.street1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Street 1"
                  aria-describedby="street1-label"
                />
              </InputGroup>
              {formik.touched.street1 && formik.errors.street1 && (
                <div className="error-message">{formik.errors.street1}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="street2-label">Street 2</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="street2"
                  name="street2"
                  value={formik.values.street2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Street 2"
                  aria-describedby="street2-label"
                />
              </InputGroup>
              {formik.touched.street2 && formik.errors.street2 && (
                <div className="error-message">{formik.errors.street2}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="city-label">City</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="City"
                  aria-describedby="city-label"
                />
              </InputGroup>
              {formik.touched.city && formik.errors.city && (
                <div className="error-message">{formik.errors.city}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="postalcode-label">Postal Code</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="postalcode"
                  name="postalcode"
                  value={formik.values.postalcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Postal Code"
                  aria-describedby="postalcode-label"
                />
              </InputGroup>
              {formik.touched.postalcode && formik.errors.postalcode && (
                <div className="error-message">{formik.errors.postalcode}</div>
              )}
            </div>

            <div className="input-field-div">
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="gramaSevaDivision-label">Grama Seva Division</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="gramaSevaDivision"
                  name="gramaSevaDivision"
                  value={formik.values.gramaSevaDivision}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="Grama Seva Division"
                  aria-describedby="gramaSevaDivision-label"
                />
              </InputGroup>
              {formik.touched.gramaSevaDivision && formik.errors.gramaSevaDivision && (
                <div className="error-message">{formik.errors.gramaSevaDivision}</div>
              )}
            </div>

            <CustomButton type="submit" onSubmit={() => formik.handleSubmit()}>Submit Application</CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
