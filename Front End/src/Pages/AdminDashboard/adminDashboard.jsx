import React from 'react';
import "../../Components/MenuBar/menubar.css";
import TanstackTable from '../../Components/TanstackTable/TanstackTable.jsx';
import './adminDashboard.css'



const AdminDashboard = () => {
    return (
        <div className='main-container2'>
          <div><h1>Certificate Requests</h1></div>
          <TanstackTable />
        </div> 
      );
    };

export default AdminDashboard;
