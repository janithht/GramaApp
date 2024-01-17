import React from 'react';
import "../../Components/MenuBar/menubar.css";
import TanstackTable from '../../Components/TanstackTable/TanstackTable.jsx';



const AdminDashboard = () => {
    return (
        <div>
          <div><h1>Certificate Requests</h1></div>
          <TanstackTable />
        </div> 
      );
    };

export default AdminDashboard;
