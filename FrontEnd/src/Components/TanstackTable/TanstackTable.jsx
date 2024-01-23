import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import CircleLoader from "react-spinners/CircleLoader";
import './TanstackTable.css'
import Swal from 'sweetalert2'


// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;




const handleClickMore = (row)=>{

    axios
    .get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/police-check-service-rop/policecheck-f88/v1.0/checkCriminalRecords?NIC=${row.NIC}`)
    .then(
        (res)=>{
            //const ids =res.data.map((row)=>({a:row.id,n:row.name}))
           //console.log(res.data.userCriminalRecords[0]
           console.log("123***");
           console.log(res.data.userCriminalRecords);
            console.log("789***");


            Swal.fire({
                title: "Criminal Record Info",
                width:1000,
                html: `<table>${formatTableFromJson(res.data.userCriminalRecords)}</table>`,
             
            
            });
        

        }
    ).catch((err)=>{
        console.log(err)
    })

    function formatTableFromJson(jsonData) {
        let tableRows = '';
      
        // Define keys to omit
        const keysToOmit = ['severity', 'id'];
      
        // Create header row
        tableRows += '<tr style="background-color: #f2f2f2;">';
        for (const key in jsonData[0]) {
          if (jsonData[0].hasOwnProperty(key) && !keysToOmit.includes(key)) {
            tableRows += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${key}</th>`;
          }
        }
        tableRows += '</tr>';
      
        // Create data rows
        jsonData.forEach((record, index) => {
          tableRows += `<tr${index % 2 === 0 ? ' style="background-color: #f9f9f9;"' : ''}>`;
          for (const key in record) {
            if (record.hasOwnProperty(key) && !keysToOmit.includes(key)) {
              const cellValue = key === 'convictionDate' ? formatDate(record[key]) : record[key];
              tableRows += `<td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${cellValue}</td>`;
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




    function formatTableFromJson2(jsonData) {
        let tableRows = '';
      
        // Define keys to omit
        const keysToOmit = ['severityLevel'];
      
        // Create header row
        tableRows += '<tr style="background-color: #f2f2f2;">';
        for (const key in jsonData[0]) {
          if (jsonData[0].hasOwnProperty(key) && !keysToOmit.includes(key)) {
            tableRows += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${key}</th>`;
          }
        }
        tableRows += '</tr>';
      
        // Create data rows
        jsonData.forEach((record, index) => {
          tableRows += `<tr${index % 2 === 0 ? ' style="background-color: #f9f9f9;"' : ''}>`;
          for (const key in record) {
            if (record.hasOwnProperty(key) && !keysToOmit.includes(key)) {
              tableRows += `<td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${record[key]}</td>`;
            }
          }
          tableRows += '</tr>';
        });
      
        return tableRows;
      }
      


}

const TanstackTable =() =>{
    const [isLoading,setLoading]=useState(true);
    const [data, setData] = useState([]);
    const [filteredData,setFilteredData]=useState([])

    const [expandedRows, setExpandedRows] = useState([]);

    const columns = [
        {
            name: 'RequestID',
            selector: row => row.req_id,
        },
        {
            name: `Division ID .`,
            selector: row => row.division_id,
        },
        {
            name: `Requester's NIC`,
            selector: row => row.NIC,
        },
        {
            name: `Requester's Phone Number`,
            selector: row => row.phoneNo,
        },
        {
            name: 'Identity Check',
            selector: row => row.Id_check,
            cell: row => (
                row.Id_check > 0  
                    ? <img  className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Identity check failed img" />
                    : <img  className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Identity check passed img" />
            ),
        },
        {
            name: 'Address Check',
            selector: row => row.address_check,
            cell: row => (
                row.address_check> 0 
                    ? <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Address check failed img" />
                    : <img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Address check passed img" />
            ),
        },
        {
            name: 'Police Check',
            selector: row =>row.police_check,
            cell: row => (
                row.police_check > 0   
                    ? <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Police check failed img" />
                    : <img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Police check passed img" />
            ),
        },
        {
            name: 'Status',
            selector: row => row.status,
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
                    : row.status == 2
                        ? <><button className="table-button" onClick={()=> handleClickMore(row)} >expand</button></>
                        :<></>
            ),
        },
    ];

  const handleExpandRow = (row) => {
    console.log("***")
   
    let temp=filteredData
    axios
    .get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/police-check-service-rop/policecheck-f88/v1.0/checkCriminalRecords?NIC=${row.NIC}`)
    .then(
        (res)=>{
            //const ids =res.data.map((row)=>({a:row.id,n:row.name}))
           //console.log(res.data.userCriminalRecords[0])
            temp[row.index].userCriminalRecords=res.data.userCriminalRecords;
            setFilteredData(temp)
            console.log(filteredData)
           
        }
    ).catch((err)=>{
        console.log(err)
    })
  };


 const expandableRowsComponent= (data) => <pre><b>{JSON.stringify(data, null, 2)}</b></pre>





  const handleClickNotify = (index)=>{

    axios.put(
        `https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/certify-service/gramacertificate-b76/v1.0/updateStatus?requestId=${filteredData[index].NIC}`,
    
    )
        .then((res) => {
            // Handle the response if needed
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
            progressPending={isLoading} 
            progressComponent={<CircleLoader color="#36d7b7" />}
            pagination={true}
            // expandableRows={true}
            // onRowExpandToggled={(status,row)=>handleExpandRow(row)}
            // expandableRowsComponent={expandableRowsComponent}
           
        />
        </>
    );
};

export default TanstackTable;