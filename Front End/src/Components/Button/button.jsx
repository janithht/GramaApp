// src/components/Button.js

import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ to, onClick, className, style, children }) => {
  const buttonProps = {
    className: `custom-button ${className || ''}`,
    style: style || {}, 
  };

  if (to) {
    return (
      <a href={to} {...buttonProps}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} {...buttonProps}>
        {children}
      </button>
    );
  }

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object, // Allow a style prop to be passed
  children: PropTypes.node.isRequired,
};

export default Button;
