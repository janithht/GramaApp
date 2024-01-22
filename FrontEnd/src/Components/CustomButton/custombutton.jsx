// // src/components/Button.js

// import React from 'react';
// import PropTypes from 'prop-types';
// import './button.css';

// const Button = ({ to, onClick, className, style, children }) => {
//   const buttonProps = {
//     className: `custom-button ${className || ''}`,
//     style: style || {}, 
//   };

//   if (to) {
//     return (
//       <a href={to} {...buttonProps}>
//         {children}
//       </a>
//     );
//   }

//   if (onClick) {
//     return (
//       <button type="button" onClick={onClick} {...buttonProps}>
//         {children}
//       </button>
//     );
//   }

//   return (
//     <button {...buttonProps}>
//       {children}
//     </button>
//   );
// };

// Button.propTypes = {
//   to: PropTypes.string,
//   onClick: PropTypes.func,
//   className: PropTypes.string,
//   style: PropTypes.object, // Allow a style prop to be passed
//   children: PropTypes.node.isRequired,
// };

// export default Button;

// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import './custombutton.css';

// const CustomButton = () => {


//   return (
//     <Button variant="secondary" size="lg" className='custom-button'></Button>
//   );
// };

// export default CustomButton;

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