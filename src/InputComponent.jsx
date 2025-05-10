import React from 'react';

const InputComponent = ({ hide }) => {
  if (hide) return null;
  return (
    <input type="text" placeholder="Enter text" />
  );
};

export default InputComponent;