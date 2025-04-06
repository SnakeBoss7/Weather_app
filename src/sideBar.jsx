import React from 'react';
import './sideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faCloud, faCross, faGear, faHome, faXmark } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ setSelectedOption,opac,handleOpac }) => {
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
    </div>
  );
};

export default SideBar;
