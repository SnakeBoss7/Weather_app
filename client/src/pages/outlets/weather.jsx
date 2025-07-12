import React, { useState, useEffect } from 'react';
// import './main.css';
const  WeatherPage = ({ handleOpac }) => {
    // const { aiResponse_Tip, setAiResponse_Tip,setAiResponse, place, setPlace, weatherInfo, setWeatherInfo, vari, setVari, faren } = usePlace();
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);

    // // Add Enter key functionality for the submit button
    // useEffect(() => {
    //     const input = document.getElementById("input_data");
    //     if (!input) return;
    //     const handleKeyDown = (e) => {
    //         if (e.key === "Enter") {
    //             document.getElementById("submit_btn")?.click();
    //         }
    //     };
    //     input.addEventListener("keydown", handleKeyDown);
    //     return () => input.removeEventListener("keydown", handleKeyDown);
    // }, []);

    // const handleSubmit = () => {
    //     setLoading(true);
    //     fetchPlaceData(
    //        faren,
    //        setAiResponse_Tip,    // function to set AI tips
    //        setError,             // function to set error
    //        setPlace,             // function to set place data
    //        setWeatherInfo,       // function to set weather info
    //        setAiResponse,        // function to set AI fact
    //        setVari,              // function to set vari
    //        "first",              // type of fetch (by input)
    //        UrlFinder 
    //     ).finally(() => setLoading(false));
    // };

    return (
        <div className='lg:w-[80%] w-full h-full bg-black '>

        </div>
        // <div className="main_container">
        //     <div className="container">
        //         <header>
        //             <div onClick={handleOpac} className="fa_icon">
        //                 <FontAwesomeIcon icon={faBars} />
        //             </div>
        //             <input type="text" id="input_data" placeholder="Enter your location" />
        //             <button
        //                 id="submit_btn"
        //                 onClick={handleSubmit}
        //                 disabled={loading}
        //             >
        //                 {loading ? "Loading..." : "SUBMIT"}
        //             </button>
        //         </header>
        //         {loading ? (
        //             <p className='loading_home_info_loading'>Loading weather data...</p>
        //         ) : (place && weatherInfo) ? (
        //             <>
        //                 <div className="weath_info_head">
        //                     <div className="weath_info_head_left">
        //                         <div className="data_heading">
        //                             <h1>{place.name}</h1>
        //                             <h2>{place.adminName1}</h2>
        //                         </div>
        //                         <p>{weatherInfo.current.last_updated}</p>
        //                         <p>
        //                             {faren
        //                                 ? `${weatherInfo.current.temp_f} °F`
        //                                 : `${weatherInfo.current.temp_c} °C`
        //                             }
        //                         </p>
        //                     </div>
        //                     <div className="weath_info_head_right">
        //                         <img src={weatherInfo.current.condition.icon} alt="Weather Icon" />
        //                     </div>
        //                 </div>

        //                 <div className="weath_info_data">
        //                     <div className="weath_info_data1">
        //                         <p className="forecast_heading">Today's Forecast</p>
        //                         <div className="weath_time_info">
        //                             {weatherInfo ? (
        //                                 Array.from({ length: 5 }, (_, i) => {
        //                                     const hourIndex = Number(vari) + i;
        //                                     return weatherInfo.forecast.forecastday[0].hour[hourIndex] ? (
        //                                         <React.Fragment key={i}>
        //                                             <div className="weath_time_info_1">
        //                                                 <p>{weatherInfo.forecast.forecastday[0].hour[hourIndex].time.split(" ")[1]}</p>
        //                                                 <img src={weatherInfo.forecast.forecastday[0].hour[hourIndex].condition.icon} alt="Weather Icon" />
        //                                                 <p>
        //                                                     {faren ?
        //                                                         `${weatherInfo.forecast.forecastday[0].hour[hourIndex].temp_f} °F` :
        //                                                         `${weatherInfo.forecast.forecastday[0].hour[hourIndex].temp_c} °C`}
        //                                                 </p>
        //                                             </div>
        //                                             {i < 4 && <div className="line"></div>}
        //                                         </React.Fragment>
        //                                     ) : null;
        //                                 })
        //                             ) : <p className='loading_info'>Forecast data unavailable</p>}
        //                         </div>
        //                     </div>

        //                     <div className="weath_info_data2">
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faDroplet} />
        //                                 <p>Humidity</p>
        //                             </div>
        //                             {weatherInfo.current.humidity} %
        //                         </div>
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faSun} />
        //                                 <p>Sunrise</p>
        //                             </div>
        //                             {weatherInfo.forecast.forecastday[0].astro.sunrise}
        //                         </div>
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faCloudSun} />
        //                                 <p>Sunset</p>
        //                             </div>
        //                             {weatherInfo.forecast.forecastday[0].astro.sunset}
        //                         </div>
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faWind} />
        //                                 <p>Wind speed</p>
        //                             </div>
        //                             {weatherInfo.current.wind_kph} kph
        //                         </div>
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faCompass} />
        //                                 <p>Wind Direction</p>
        //                             </div>
        //                             {weatherInfo.current.wind_dir}
        //                         </div>
        //                         <div className="in_data">
        //                             <div className="meta_data">
        //                                 <FontAwesomeIcon icon={faUmbrellaBeach} />
        //                                 <p>UV index</p>
        //                             </div>
        //                             {weatherInfo.current.uv}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </>
        //         ) : (
        //             <p className='loading_home_info'>No weather data available</p>
        //         )}
        //     </div>
        //     <div className="right_container">
        //           {weatherInfo && !loading ?   <h2 className='forecast_head'>3-Days Forecast</h2>: ""}
        //         <div className='week_container'>
        //             {weatherInfo  && !loading? (
        //             weatherInfo.forecast.forecastday.map((day, idx) => {
        //                 const day_date = new Date(day.date);
        //                 const option = { weekday: 'short' };
        //                 const day_name = day_date.toLocaleDateString('en-US', option);
        //                 return (
        //                     <div className="week_day" key={day.date || idx}>
        //                         <div className="less_space">
        //                             <h2>{day_name}</h2>
        //                             <img src={day.day.condition.icon} alt="Weather Icon" />
        //                             <p>
        //                                 {faren ?
        //                                     `${day.day.maxtemp_f} °F` :
        //                                     `${day.day.maxtemp_c} °C`
        //                                 }
        //                             </p>
        //                         </div>
        //                         <div className="more_space">
        //                             <p>{day.day.condition.text}</p>
        //                         </div>
        //                     </div>
        //                 );
        //             })
        //         ) : null}
        //         </div>
                
        //         {loading ? (
        //             <div className="visible loading_info">
        //                 <img src={lodingGif} alt="Loading..." />
        //             </div>
        //                            ) : aiResponse_Tip ? (
        //             <div className="outer_ai">

        //                 <h2>AI Tips</h2>
        //             <div className="ai_response">
        //                 {aiResponse_Tip.map((tip, index) => (
        //                     <p key={index}>{index + 1}. {tip}</p>
        //                 ))}
        //             </div>

        //             </div>
 
        //         ) : (
        
        //                 <p className='loading_info'>Enter some data</p>
                    
        //         )}
        //         {error && <p className="error">{error}</p>}
        //     </div>
        // </div>
    );
};

export default WeatherPage;