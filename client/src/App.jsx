import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/index';
import City from './pages/outlets/city';
import './App.css'
import WeatherPage from './pages/outlets/weather' 
const App = () => {
  const [opac, setOpac] = useState(false);

  const handleOpac = () => setOpac(prev => !prev);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}>
      <Route  index element={<City/>}/>
      {/* <Route path="locationInfo" element={<Home/>}/> */}
      {/* <Route path="WeatherData" element={<Home/>}/> */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;