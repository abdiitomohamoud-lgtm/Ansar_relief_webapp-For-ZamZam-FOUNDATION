import React from 'react';
import PropTypes from 'prop-types';

const CardBody = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default CardBody; 