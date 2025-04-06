import logo from './logo.svg';
import './App.css';
import SideBar from './sideBar';
import { useState } from 'react';
import Main from './MAIN/main';
import Home from './MAIN/home';
import City, { PlaceProvider } from './MAIN/city';
import setting from './MAIN/setting';

function App() {
  const [selectedOption, setSelectedOption] = useState("city");
  const [selectedOpac, setSelectedOpac ]= useState("true");

  function setOpac(){
    setSelectedOpac(!selectedOpac);
  }
  return (
    <PlaceProvider>
    <div className="App">
      <SideBar setSelectedOption={setSelectedOption} opac={selectedOpac} handleOpac={setOpac} />
      <Main selectedOption={selectedOption}  handleOpac={setOpac}/>
    </div>
    </PlaceProvider>
  );
}

export default App;
