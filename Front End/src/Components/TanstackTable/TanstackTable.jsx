import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import CircleLoader from "react-spinners/CircleLoader";
import './TanstackTable.css'
import Swal from 'sweetalert2'


const handleClickNotify = ()=>{
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
        title: "Successfully notified user"
      });

}

const handleClickMore = ()=>{

    Swal.fire({
        title: "Criminal Record Info",
        text: "Something went wrong!",
       
      });

}





const columns = [
	{
		name: 'RequestID',
		selector: row => row.id,
	},
    {
		name: `Requester's NIC`,
		selector: row => row.name,
	},
	{
		name: `Requester's Name`,
		selector: row => row.name,
	},
    {
		name: 'Identity Check',
		selector: row => row.id,
        cell: row => (
            row.id > 5
                ? <img  className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Identity check passed img" />
                : <img  className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Identity check failed img" />
        ),
	},
    {
		name: 'Address Check',
		selector: row => row.id,
        cell: row => (
            row.id > 5
                ? <img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Address check passed img" />
                : <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Address check failed img" />
        ),
	},
    {
		name: 'Police Check',
		selector: row => row.id,
        cell: row => (
            row.id > 5
                ? <img className="tick" src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Police check passed img" />
                : <img className="cross" src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="Police check failed img" />
        ),
	},
    {
		name: 'Status',
		selector: row => row.website,
	},
    {
		name: 'Notify',
		// selector: row => <button className="table-button">notify</button>,
        cell: row => (
            row.id > 5
                ? <button className="table-button" onClick={()=> handleClickNotify()} >notify</button>
                : <button className="table-button" onClick={()=> handleClickMore()} >more</button>
        ),
	},
];

const TanstackTable =() =>{
    const [isLoading,setLoading]=useState(true);
    const [data, setData] = useState([]);
    const [filteredData,setFilteredData]=useState([])

  useEffect(() => {
    setLoading(true);
    axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(
        (res)=>{
            //const ids =res.data.map((row)=>({a:row.id,n:row.name}))
            //console.log(res)
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
        setFilteredData(
            data.filter((row)=>row.name.includes(event.target.value)))
    }


    return(
        <>
        <div class="searchBar" >
        <input id="searchQueryInput" placeholder="Search" type="text" onChange={onSearch} />
        </div>

        <DataTable 
            data={filteredData} 
            columns={columns} 
            selectableRows={true} 
            progressPending={isLoading} 
            progressComponent={<CircleLoader color="#36d7b7" />}
            pagination={true}
            
        />
        </>
    );
};

export default TanstackTable;