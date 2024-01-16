import React, { useState } from 'react';
import MenuBar from '../../Components/MenuBar/menubar.jsx';
import InputField from "../../Components/Input/input.jsx"

const Application = () => {

    const [textInput, setTextInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];
    
      return (
        <div>
            <div className='container'>
                <MenuBar />
            </div>
            <div className="main-container"> 
                <form>
                    <InputField type="text" placeholder="Enter text" value={textInput} onChange={handleTextChange} />
                    <InputField type="select" options={dropdownOptions} value={dropdownValue} onChange={handleDropdownChange} />
                </form>
            </div>
        </div>
      );
    };
    
    export default Application;