import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import CircleLoader from "react-spinners/CircleLoader";
import './TanstackTable.css'
import Swal from 'sweetalert2'


// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const ExpandedComponent = ({ data }) => <pre><h1>abcd</h1></pre>;


const handleClickMore = ()=>{

    Swal.fire({
        title: "Criminal Record Info",
        text: "Something went wrong!",
       
      });

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
                    ?  <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Police check failed img" />
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
                    : <></>
            ),
        },
    ];

  const handleExpandRow = (row) => {
    let temp=filteredData
    axios
    .get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/police-check-service-rop/policecheck-f88cons/v1.0/checkCriminalRecords?NIC=${row.NIC}`)
    .then(
        (res)=>{
            //const ids =res.data.map((row)=>({a:row.id,n:row.name}))
            console.log(res.data)
            temp[row.index].userCriminalRecords=res.data[0].userCriminalRecords;
            setFilteredData(temp)
        }
    ).catch((err)=>{
        console.log(err)
    })
  };

  const handleClickNotify = (index)=>{
    let msg=`We are pleased to inform you (NIC - ${filteredData[index].NIC}) that your GRAMA certificate has been successfully read and verified! You can now pick up your original certificate in person at our office`
    
    // axios
    // .get(`https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/bwsu/sms-service/smsservice-928/v1.0/send_message?phoneNo=%2B${filteredData[index].phoneNo}&message=${msg}`)
    // .then(
    //     (res)=>{ 
    //     }
    // ).catch((err)=>{
    //     console.log(err)
    // })

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

    const expandableRowsComponent= ({ data }) => <pre><b>{data.number}</b></pre>


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
            expandableRows={true}
            expandableRowsComponent={expandableRowsComponent}
            onRowExpandToggled={(status,row)=>handleExpandRow(row)}
        />
        </>
    );
};

export default TanstackTable;