import React from 'react';
import './setting.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { usePlace } from './city';

const Setting = ({handleOpac}) => {
    const {faren,setfaren} = usePlace();
    const handleChange = async (e) =>
        {
            if(e.target.checked === true)
            {
                console.log("Fahrenheit");
                await setfaren(true);
            }
            else
            {
                console.log("Celsius");
                await setfaren(false);
            }
        }
    return (
        <div className='setting_container'>
            <header>
                <div className='bars' onClick={handleOpac}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </header>
            <div className="setting_1">
                <h1 className='faren'>Fahrenheit</h1>   
                <div className="toggle-wrapper">
                    <input 
                        type="checkbox" 
                        id="checkboxInput" 
                        checked={faren} 
                        onChange={handleChange}
                    />
                    <label htmlFor="checkboxInput" className="toggleSwitch">
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Setting;
