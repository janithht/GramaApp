import React from 'react';
import Button from 'react-bootstrap/Button';
import './custombutton.css';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button variant="primary" size="sm" className='custom-button' {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;