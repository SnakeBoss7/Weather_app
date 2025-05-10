import React, { useState } from 'react';
import SideBar from './sideBar';
import InputComponent from './InputComponent'; // replace with your actual input component

const App = () => {
  const [opac, setOpac] = useState(false);

  const handleOpac = () => setOpac(prev => !prev);

  return (
    <div>
      <SideBar opac={opac} handleOpac={handleOpac} setSelectedOption={() => {}} />
      <InputComponent hide={opac} />
    </div>
  );
};

export default App;