import React, { useState, useEffect } from 'react';
import MenuBar from '../../Components/MenuBar/menubar';
import './statuschecks.css'; 
import { FaChevronDown, FaChevronUp} from 'react-icons/fa';
import statusCheck from "../../Assets/Status.png";
import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";


const StatusChecks = () => {
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const {state, getBasicUserInfo } = useAuthContext() || {};
  
    useEffect(() => {
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/certify-service/gramacertificate-b76/v1.0/getUserRequest?email=${state.email}`);
          const sortedData = response.data.sort((a, b) => b.req_id - a.req_id);
          setData(sortedData);
          console.log(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const toggleRowExpansion = (rowId) => {
      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.includes(rowId)
          ? prevExpandedRows.filter((id) => id !== rowId)
          : [...prevExpandedRows, rowId]
      );
    };

    const getStatusText = (status) => {
        switch (status) {
          case 1:
            return 'Approved';
          case 2:
            return 'Rejected';
          case 3:
            return 'Completed';
          default:
            return 'Unknown';
        }
      };
  
    return (
      <div className='full-container'>
        <MenuBar />
        <div className="main-status-container">
          <div className='topic-container'>
            <div className='imgs-container'>
              <img src={statusCheck} alt="Status Check" className='status-image'/>
            </div>
            <div className='topic-text'>
              <p>Check Status of your Gramaseva Certificate</p>
            </div>
          </div>
          <div className='info-container'>
            <table>
              <thead>
                <tr>
                  <td>Tracking ID</td>
                  <td>NIC</td>
                  {/* <td>Email</td> */}
                  {/* <td>Telephone</td> */}
                  <td>Status</td>
                  <td>Date Submitted</td>
                  <td>Details</td>
                </tr>
              </thead>
              <tbody>
                {data.map((rowData) => (
                  <React.Fragment key={rowData.req_id}>
                    {/* Main Row */}
                    <tr>
                      <td>{rowData.req_id}</td>
                      <td>{rowData.NIC}</td>
                      <td>
                        <span className={`status-badge ${rowData.status === 1 ? 'status-approved' : (rowData.status === 2 ? 'status-rejected' : 'status-completed')}`}>
                            {getStatusText(rowData.status)}
                        </span>
                      </td>

                      <td>{rowData.date_submitted}</td>
                      
                      <td>
                        <span
                          className={`expand-icon ${expandedRows.includes(rowData.req_id) ? 'expanded' : ''}`}
                          onClick={() => toggleRowExpansion(rowData.req_id)}
                        >
                          {expandedRows.includes(rowData.req_id) ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </td>
                    </tr>
                    {/* Expanded Row */}
                    {expandedRows.includes(rowData.req_id) && (
                      <tr className="expanded-row">
                        <td colSpan="6">
                          <div className="expanded-row-div">
                            <span>Date Submitted : {rowData.date_submitted}</span>
                            <span>Tracking ID : {rowData.req_id}</span>
                            <span>National Identity Card Number : {rowData.NIC} <span className={rowData.identity_check ? 'incorrect-text' : 'approved-text'}>{rowData.identity_check ? "Incorrect" : "Approved"}</span></span>
                            <span>Address : {rowData.no}, {rowData.street1}, {rowData.street2}, {rowData.city}, {rowData.postalcode} <span className={rowData.address_check ? 'incorrect-text' : 'approved-text'}>{rowData.address_check ? "Incorrect" : "Approved"}</span> </span>
                            <span>Police Records : <span className={rowData.police_check ? 'incorrect-text' : 'approved-text'}>{rowData.police_check ? "Rejected" : "Approved"}</span></span>               
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatusChecks;