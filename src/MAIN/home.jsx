import React, { useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCloudSun, faCompass, faDroplet, faSun, faWind } from "@fortawesome/free-solid-svg-icons";
import { usePlace } from '../MAIN/city';
import { addDiv } from '../MAIN/city';















const City = ({ handleOpac }) => {
    const { place, setPlace, weath_info, setWeath_info, ai_respose, setAi_response, vari, setVari } = usePlace();
    const [error, setError] = useState(null);

    console.log("Weather Info:", weath_info);
    console.log("Vari (as number):", Number(vari));

    return (
        <div className="main_container">
            <div className="container">
                <header>
                    <div onClick={handleOpac} className="fa_icon">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <input type="text" id="input_data" placeholder="Enter your location" />
                    <button onClick={() => addDiv(setError, setPlace, setWeath_info, setAi_response, setVari)}>SUBMIT</button>
                </header>

                {(place && weath_info) ? (
                    <>
                        <div className="weath_info_head">
                            <div className="weath_info_head_left">
                                <div className="data_heading">
                                    <h1>{place.name}</h1>
                                    <h2>{place.adminName1}</h2>
                                </div>
                                <p>{weath_info.current.last_updated}</p>
                                <p>{weath_info.current.temp_c} &#176; C</p>
                            </div>
                            <div className="weath_info_head_right">
                                <img src={weath_info.current.condition.icon} alt="Weather Icon" />
                            </div>
                        </div>

                        <div className="weath_info_data">
                            <div className="weath_info_data1">
                                <p className="forecast_heading">Today's Forecast</p>
                                <div className="weath_time_info">
                                    {weath_info ? (
                                        Array.from({ length: 5 }, (_, i) => {
                                            const hourIndex = Number(vari) + i;
                                            return weath_info.forecast.forecastday[0].hour[hourIndex] ? (
                                                <React.Fragment key={i}>
                                                    <div className="weath_time_info_1">
                                                        <p>{weath_info.forecast.forecastday[0].hour[hourIndex].time.split(" ")[1]}</p>
                                                        <img src={weath_info.forecast.forecastday[0].hour[hourIndex].condition.icon} alt="Weather Icon" />
                                                        <p>{weath_info.forecast.forecastday[0].hour[hourIndex].temp_c} &#176; C</p>
                                                    </div>
                                                    {i < 4 && <div className="line"></div>}
                                                </React.Fragment>
                                            ) : null;
                                        })
                                    ) : <p>Forecast data unavailable</p>}
                                </div>
                            </div>

                            <div className="weath_info_data2">
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faDroplet} />
                                        <p>Humidity</p>
                                    </div>
                                    {weath_info.current.humidity} %
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faSun} />
                                        <p>Sunrise</p>
                                    </div>
                                    {weath_info.forecast.forecastday[0].astro.sunrise}
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faCloudSun} />
                                        <p>Sunset</p>
                                    </div>
                                    {weath_info.forecast.forecastday[0].astro.sunset}
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faWind} />
                                        <p>Wind speed</p>
                                    </div>
                                    {weath_info.current.wind_kph} kph
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faCompass} />
                                        <p>Wind Direction</p>
                                    </div>
                                    {weath_info.current.wind_dir}
                                </div>



                            </div>
                        </div>
                    </>
                ) : (
                    <p>No weather data available</p>
                )}
            </div>
            <div class="right_container">

                {weath_info? (
                    weath_info.forecast.forecastday.map((day)=>
                        {
                            const day_date = new Date(day.date);
                            const option = { weekday: 'short'};
                            const day_name = day_date.toLocaleDateString('en-US', option);
                            console.log("Day Name:", day_name);
                            return(
                                <div class="week_day">
                                    <h2>${day_name}</h2>
                                    <img src={day.day.condition.icon} alt="Weather Icon" />
                                    <p>{day.day.avgtemp_c} &#176; C</p>
                                    <p>{day.day.condition.text}</p>
                                </div>
                            );
                        })
                ):null

                }

            </div>

        </div >

    );
};

export default City;