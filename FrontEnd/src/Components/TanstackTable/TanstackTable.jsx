import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import CircleLoader from "react-spinners/CircleLoader";
import './TanstackTable.css'
import Swal from 'sweetalert2'



const handleClickMore = (row)=>{

    axios
    .get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/police-check-service-rop/policecheck-f88/v1.0/checkCriminalRecords?NIC=${row.NIC}`)
    .then(
        (res)=>{
   
            Swal.fire({
              
                width:800,
                html: `
                 <p>Criminal Record Infomation</p>
                <table>${formatTableFromJson(res.data.userCriminalRecords)}</table> `,
            });
        

        }
    ).catch((err)=>{
        console.log(err)
    })

    function formatTableFromJson(jsonData) {
        let tableRows = '';
      
        // Define keys to omit
        const keysToOmit = ['severityLevel', ''];
      
        // Create header row
        tableRows += '<tr style="background-color: #f2f2f2;">';
        for (const key in jsonData[0]) {
          if (jsonData[0].hasOwnProperty(key) && !keysToOmit.includes(key)) {
            tableRows += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size : 12px ">${key}</th>`;
          }
        }
        tableRows += '</tr>';
      
        // Create data rows
        jsonData.forEach((record, index) => {
          tableRows += `<tr${index % 2 === 0 ? ' style="background-color: #f9f9f9;"' : ''}>`;
          for (const key in record) {
            if (record.hasOwnProperty(key) && !keysToOmit.includes(key)) {
              const cellValue = key === 'convictionDate' ? formatDate(record[key]) : record[key];
              tableRows += `<td style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size : 12px">${cellValue}</td>`;
            }
          }
          tableRows += '</tr>';
        });   
        return tableRows;
      }
      
      function formatDate(dateObj) {
        // Assuming dateObj has year, month, and day properties
        const formattedDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
        return formattedDate;
      }

}

const TanstackTable =() =>{
    const [isLoading,setLoading]=useState(true);
    const [data, setData] = useState([]);
    const [filteredData,setFilteredData]=useState([])

    // const [expandedRows, setExpandedRows] = useState([]);

    const columns = [
        {
            name: 'RequestID',
            selector: row => row.req_id,
            width: "7%"
        },
        {
            name: `DivisionID`,
            selector: row => row.division_id,
            width: "7%"
        },
        {
            name: `Requester's NIC`,
            selector: row => row.NIC,
            width: "10%"

        },
        {
            name: `Email`,
            selector: row => row.email,
            width: "15%"
        },
        {
            name: `Contact Number`,
            selector: row => row.phoneNo,
            width: "10%"
        },
        {
            name: 'Identity Check',
            selector: row => row.Id_check, 
            width: "8%",
            cell: row => (
                row.Id_check > 0  
                    ?  <span className="data-table-image"><img  className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Identity check failed img" /></span>
                    :<span className="data-table-image"> <img  className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Identity check passed img" /></span>
            ),
        },
        {
            name: 'Address Check',
            selector: row => row.address_check,
            width: "8.5%",
            cell: row => (
                row.address_check> 0 
                    ?<span className="data-table-image"><img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Address check failed img" /></span>
                    : <span className="data-table-image"><img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Address check passed img" /></span>
            ),
        },
        {
            name: 'Police Check',
            selector: row =>row.police_check,
            width: "8%",
            cell: row => (
                row.police_check > 0   
                    ? 
                    <span className="data-table-image"> <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Police check failed img" /></span>
                    :<span className="data-table-image"><img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Police check passed img" /></span>
            ),
        },
        {
            name: 'Status',
            selector: row => row.status,
            width: "10%",
            cell: row => (
                row.status === 3
                    ? <p>Nottified</p>
                    : row.status === 1
                        ? <p>Approved</p>
                        : <p>Rejected</p>
            ),
        },
        {
            name: 'Action',
            selector: row => <button className="table-button" >notify</button>,
            cell: (row,index) => (
                row.status === 1
                    ? <button className="table-button" onClick={()=> handleClickNotify(index)} >Notify</button>
                    : row.status === 2
                        ? <><button className="table-button" onClick={()=> handleClickMore(row)} >Details</button></>
                        :<></>
            ),
        },
    ];



  const handleClickNotify = (index)=>{

    axios.put(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/certify-service/gramacertificate-b76/v1.0/updateStatus?requestId=${filteredData[index].req_id}`,
    
    )
        .then((res) => {
            // Handle the response if needed
            const updatedData = [...filteredData];
            updatedData[index].status = 3; // Assuming 3 represents 'Notified'
            setFilteredData(updatedData);
        })
        
        .catch((err) => {
            console.error(err);
        });
    

    let msg=`            Your Grama Certificate is ready !!              We are pleased to inform you (NIC - ${filteredData[index].NIC}) that your GRAMA certificate has been successfully read and verified! You can now pick up your original certificate in person at our office.`
    axios.post(
        'https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/sms-service/smsservice-928/v1.0/send_message',
        {
          phoneNo: filteredData[index].phoneNo,
          message: msg
        }
      )
        .then((res) => {
          // Handle the response if needed
        })
        .catch((err) => {
          console.error(err);
        });
      
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: `Successfully notified user ${filteredData[index].phoneNo}`
      });

}




  useEffect(() => {
    setLoading(true);
    axios
    .get("https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/certify-service/gramacertificate-b76/v1.0/allCertRequests")
    .then(
        (res)=>{
            //const ids =res.data.map((row)=>({a:row.id,n:row.name}))
            res.data.forEach((row,index)=>{
                row.index=index;
            })
            setData(res.data)
            setFilteredData(res.data)
            setLoading(false)
        }
    ).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
  }, []);

    const onSearch=(event)=>{
        let temp= data.filter((row)=>row.NIC.includes(event.target.value))
        temp.forEach((row,index)=>{
            row.index=index;
        })
        setFilteredData(temp)
    }


    return(
        <>
        <div className="searchBar" >
        <input id="searchQueryInput" placeholder="Search" type="text" onChange={onSearch} />
        </div>

        <DataTable 
            data={filteredData} 
            columns={columns} 
            responsive ={true}
            progressPending={isLoading} 
            progressComponent={<CircleLoader color="#36d7b7" />}
            pagination={true}
           
        />
        </>
    );
};

export default TanstackTable;