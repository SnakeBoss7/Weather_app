import React from 'react';
import './sideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faCloud, faCross, faGear, faHome, faXmark } from '@fortawesome/free-solid-svg-icons';
import { usePlace } from './MAIN/city';
import { UrlFinder } from './MAIN/city';
import { handle_submit} from './MAIN/city';
import { } from './MAIN/city';
const SideBar = ({ setSelectedOption,opac,handleOpac }) => {
  const {handle_submit }= usePlace();
   const { error,setError,place, setPlace, setWeatherInfo, aiResponse, setAiResponse,setVari,faren,setAiResponse_Tip } = usePlace();
  return (
    <div className={`${opac? 'open' : 'main'}`}>
      <div class="handler">
        <FontAwesomeIcon icon={faXmark} onClick={handleOpac} />

      </div>
      <div className="heading">
        <div className="icon">
          <FontAwesomeIcon icon={faCloud} />
        </div>
        <h1>Weather</h1>
      </div>
      <ul className="list">
        <h3 onClick={() =>{ setSelectedOption("home"); if (!opac) handleOpac(); }}>
          <div className="icon"><FontAwesomeIcon icon={faHome} /></div>
          HOME
        </h3>
        <h3 onClick={() =>{ setSelectedOption("city");if (!opac) handleOpac();}}>
          <div className="icon"><FontAwesomeIcon icon={faCity} /></div>
          CITY
        </h3>
        <h3  onClick={() =>{ setSelectedOption("setting");if (!opac) handleOpac();}}>
          <div className="icon"><FontAwesomeIcon icon={faGear} /></div>
          SETTINGS
        </h3>
      </ul>
                <button onClick={handle_submit}>LOCATE ME</button>
    </div>
  );
};

export default SideBar;
