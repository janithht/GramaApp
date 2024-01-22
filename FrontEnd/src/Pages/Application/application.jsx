import React, {useState,useEffect} from 'react';
import { useFormik } from 'formik';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "./application.css";
import applyCertificate from "../../Assets/Apply.png";
import validationSchema from "./validationSchema.js";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationModal from "./confirmationmodal.jsx"
import ApplicationForm from  "./applicationform.jsx"


const Application = () => {
    
    const [showModal, setShowModal] = useState(false);
    const {state, getBasicUserInfo } = useAuthContext() || {};
    const [userEmail, setUserEmail] = useState();

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

      // Format the phone number before submission
      const formattedPhoneNumber = formatPhoneNumber(values.tele);

      // Validate all fields before submission
      const errors = handleValidation({ ...values, tele: formattedPhoneNumber });
  
      if (Object.keys(errors).length > 0) {
        actions.setErrors(errors);
      } else {

        const requestData = {
          NIC: values.nic,
          city: values.city,
          division_id: parseInt(values.gramaSevaDivision, 10), 
          email: "hello@123.com",
          no: values.addressNumber,
          phoneNo: formattedPhoneNumber,
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
          setShowModal(true);
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

    const formatPhoneNumber = (phoneNumber) => {
      // Remove spaces and dashes
      const cleanedPhoneNumber = phoneNumber.replace(/[\s-]/g, '');
    
      // Check if the number starts with '0'
      if (cleanedPhoneNumber.startsWith('0')) {
        // Convert '0xxxxxxxxx' to '+94xxxxxxxxx'
        return `+94${cleanedPhoneNumber.substring(1)}`;
      } else if (cleanedPhoneNumber.startsWith('+940')) {
        // Convert '+940xxxxxxxx' to '+94xxxxxxxxx'
        return `+94${cleanedPhoneNumber.substring(4)}`;
      } else {
        // Keep the number as it is
        return cleanedPhoneNumber;
      }
    };
  
    useEffect(() => {
        getBasicUserInfo().then((response) => {
        setUserEmail(response.email);
        console.log("email : ",response.email);
        });
    }, [getBasicUserInfo]);

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
          <ApplicationForm formik={formik} />
        </div>
      </div>
      <ConfirmationModal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default Application;
