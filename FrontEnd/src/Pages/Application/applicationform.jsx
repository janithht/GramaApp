import React , {useState, useEffect} from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import CustomButton from '../../Components/CustomButton/custombutton';
import Select from 'react-select';
import axios from 'axios';  

const ApplicationForm = ({ formik }) => {

  const [selectedGramaSevaDivision, setSelectedGramaSevaDivision] = useState(null);
  const [gramaSevaDivisionOptions, setGramaSevaDivisionOptions] = useState([]);
// const gramaSevaDivisionOptions = [
//     { value: 'division1', label: 'Division 1' },
//     { value: 'division2', label: 'Division 2' },
//     // Add more divisions as needed
// ];

useEffect(() => {
  const fetchGramaSevaDivisionOptions = async () => {
    try {
      const response = await axios.get(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/address-check-service-zcw/gramasevadivision-9d8/v1.0/allGramasevaDivisions`
      );
      const options = response.data.map((division) => ({
        value: division.division_id,
        label: division.div_name,
      }));

      setGramaSevaDivisionOptions(options);
    } catch (error) {
      console.error('Error occurred while getting divisions', error);
    }
  };

  fetchGramaSevaDivisionOptions();
}, [formik]); // Include formik as a dependency



  return (

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
            <InputGroup className={`mb-3 class-select-field`} >
          <Select
            id="gramaSevaDivision"
            name="gramaSevaDivision"
            value={selectedGramaSevaDivision}
            onChange={(selectedOption) => {
              formik.setFieldValue('gramaSevaDivision', selectedOption ? selectedOption.value : '');
              setSelectedGramaSevaDivision(selectedOption);
            }}
            options={gramaSevaDivisionOptions}
            isSearchable
            placeholder="Select Grama Seva Division"
            className="select-field"
          />
        </InputGroup>
        {formik.touched.gramaSevaDivision && formik.errors.gramaSevaDivision && (
          <div className="error-message">{formik.errors.gramaSevaDivision}</div>
        )}
            </div>
            <CustomButton type="submit" onSubmit={() => formik.handleSubmit()}>Submit Application</CustomButton>
          </form>
          );
        };
        
        export default ApplicationForm;