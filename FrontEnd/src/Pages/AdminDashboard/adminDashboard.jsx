import React from 'react';
import "../../Components/MenuBar/menubar.css";
import TanstackTable from '../../Components/TanstackTable/TanstackTable.jsx';
import './adminDashboard.css'
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "../../Components/MenuBar/menubar.css";



const AdminDashboard = () => {
    return (
        <div>
          <MenuBar />
          <div className='main-container2'>
          <div><h1>Certificate Requests</h1></div>
          <TanstackTable />
        </div> 

        </div>
      );
    };

export default AdminDashboard;
