import React, { useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCloudSun, faCompass, faDroplet, faSun, faUmbrella, faUmbrellaBeach, faWind } from "@fortawesome/free-solid-svg-icons";
import { UrlFinder, usePlace } from '../MAIN/city';
import { fetchPlaceData } from '../MAIN/city';
const City = ({ handleOpac }) => {
    const { place, setPlace, weatherInfo, setWeatherInfo, vari, setVari,faren} = usePlace();
    const [error, setError] = useState(null);

    console.log("Weather Info:", weatherInfo);
    console.log("Vari (as number):", Number(vari));

    return (
        <div className="main_container">
            <div className="container">
                <header>
                    <div onClick={handleOpac} className="fa_icon">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <input type="text" id="input_data" placeholder="Enter your location" />
                    <button onClick={() => fetchPlaceData(setError, setPlace, setWeatherInfo, null, setVari, "first", UrlFinder)}>SUBMIT</button>
                   
                </header>
                {(place && weatherInfo) ? (
                    <>
                        <div className="weath_info_head">
                            <div className="weath_info_head_left">
                                <div className="data_heading">
                                    <h1>{place.name}</h1>
                                    <h2>{place.adminName1}</h2>
                                </div>
                                <p>{weatherInfo.current.last_updated}</p>
                                <p> {faren
                                    ? `${weatherInfo.current.temp_f} °F`
                                    : `${weatherInfo.current.temp_c} °C`
                                }</p>
                            </div>
                            <div className="weath_info_head_right">
                                <img src={weatherInfo.current.condition.icon} alt="Weather Icon" />
                            </div>
                        </div>

                        <div className="weath_info_data">
                            <div className="weath_info_data1">
                                <p className="forecast_heading">Today's Forecast</p>
                                <div className="weath_time_info">
                                    {weatherInfo ? (
                                        Array.from({ length: 5 }, (_, i) => {
                                            const hourIndex = Number(vari) + i;
                                            return weatherInfo.forecast.forecastday[0].hour[hourIndex] ? (
                                                <React.Fragment key={i}>
                                                    <div className="weath_time_info_1">
                                                        <p>{weatherInfo.forecast.forecastday[0].hour[hourIndex].time.split(" ")[1]}</p>
                                                        <img src={weatherInfo.forecast.forecastday[0].hour[hourIndex].condition.icon} alt="Weather Icon" />
                                                        <p>
                                                            {faren?
                                                                `${weatherInfo.forecast.forecastday[0].hour[hourIndex].temp_f} °F` :
                                                                `${weatherInfo.forecast.forecastday[0].hour[hourIndex].temp_c} °C`}
                                                        </p>
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
                                    {weatherInfo.current.humidity} %
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faSun} />
                                        <p>Sunrise</p>
                                    </div>
                                    {weatherInfo.forecast.forecastday[0].astro.sunrise}
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faCloudSun} />
                                        <p>Sunset</p>
                                    </div>
                                    {weatherInfo.forecast.forecastday[0].astro.sunset}
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faWind} />
                                        <p>Wind speed</p>
                                    </div>
                                    {weatherInfo.current.wind_kph} kph
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faCompass} />
                                        <p>Wind Direction</p>
                                    </div>
                                    {weatherInfo.current.wind_dir}
                                </div>
                                <div class="in_data">
                                    <div class="meta_data">
                                        <FontAwesomeIcon icon={faUmbrellaBeach} />
                                        <p>UV index</p>
                                    </div>
                                    {weatherInfo.current.uv}
                                </div>



                            </div>
                        </div>
                    </>
                ) : (
                    <p>No weather data available</p>
                )}
            </div>
            <div class="right_container">

                {weatherInfo ? (
                    weatherInfo.forecast.forecastday.map((day) => {
                        const day_date = new Date(day.date);
                        const option = { weekday: 'short' };
                        const day_name = day_date.toLocaleDateString('en-US', option);
                        console.log("Day Name:", day_name);
                        return (
                            <div class="week_day">
                                <div className="less_space">
                                <h2>{day_name}</h2>
                                <img src={day.day.condition.icon} alt="Weather Icon" />
                                <p>
                                    {faren ?
                                        `${day.day.maxtemp_f} °F` :
                                        `${day.day.maxtemp_c} °C`
                                    }
                                </p>

                                </div>
                                <div className="more_space">
                                <p>{day.day.condition.text}</p>

                                </div>
                            </div>
                        );
                    })
                ) : null

                }

            </div>

        </div >

    );
};

export default City;