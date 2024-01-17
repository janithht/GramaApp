import React ,{useEffect} from 'react';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import "../../Components/MenuBar/menubar.css";
import applyCertificate from "../../Assets/Apply.png";
import statusCheck from "../../Assets/Status.png";
import help from "../../Assets/Help.png";
import './dashboard.css';
import Tile from "../../Components/Tile/tile.jsx"
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

const navigate = useNavigate();

  return (
    <div>
        <div className='container'>
            <MenuBar />
        </div>
        <div className="main-container"> 
            <div className="menu-container">
<<<<<<< HEAD
                <Tile text="Apply for Certificate" image={applyCertificate} onClick={()=>navigate("/application")}/>
=======
                <Tile text="Apply for Certificate" image={applyCertificate} onClick={()=> navigate("/application")}/>
>>>>>>> adb94d9bff6928078568d25942777f406e5b75dc
                <Tile text="Check the Status" image={statusCheck}  />
                <Tile text="Ask for Help" image={help}  />
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
