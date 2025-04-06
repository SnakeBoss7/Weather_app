import React, { createContext, useContext, useState, useEffect } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe, faLocation, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { queryTogetherAI } from "../CHAT_API/api";

export const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
  const [place, setPlace] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [vari, setVari] = useState(null);
  
  return (
    <PlaceContext.Provider value={{ place, setPlace, weatherInfo, setWeatherInfo, aiResponse, setAiResponse, vari, setVari }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const usePlace = () => useContext(PlaceContext);

export const extractNumber = (num) => (num < 10 ? num.slice(-1) : num);

export const UrlFinder = async (type) => {
  const username = "insane9988";
  let url = "";

  if (type === "first") {
    const location = document.querySelector("#input_data").value.trim();
    if (location) {
      url = isNaN(location)
        ? `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(location)}&featureClass=P&maxRows=10&username=${username}`
        : `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(location)}&maxRows=1&username=${username}`;
    }
  } else if (type === "second" && navigator.geolocation) {
    url = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          resolve(`https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${username}`),
        (error) => reject(error)
      );
    });
  }

  return url;
};

export const fetchPlaceData = async (setError, setPlace, setWeatherInfo, setAiResponse, setVari, type, fetchUrl) => {
  try {
    const url = await fetchUrl(type);
    if (!url) return setError("Enter the name of the place");

    const response = await fetch(url);
    const data = await response.json();
    const fetchedPlace = data.geonames?.[0] || data.postalCodes?.[0];

    if (!fetchedPlace) {
      setPlace(null);
      return setError("Can't fetch data for the specified location");
    }

    setPlace(fetchedPlace);
    setError("");

    const weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=453b48bde3544a35b6683930252803&q=${fetchedPlace.lat},${fetchedPlace.lng}&days=7&aqi=yes&alerts=no`;
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();
    setWeatherInfo(weatherData);
    setVari(extractNumber(weatherData.current.last_updated.split(" ")[1].split(":"))[0]);

    const aiFact = await queryTogetherAI(`Tell me the most shocking fact about ${fetchedPlace.name} in ${fetchedPlace.adminName1} in 30 words`);
    setAiResponse(aiFact);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError("Can't fetch data for the specified location");
  }
};

const City = ({ handleOpac }) => {
  const { place, setPlace, weatherInfo, setWeatherInfo, aiResponse, setAiResponse, vari, setVari } = usePlace();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (place) {
      queryTogetherAI(`Tell me the most shocking fact about ${place.name} in ${place.adminName1} in 30 words`).then(setAiResponse);
    }
  }, [place]);

  return (
    <div className="main_container">
      <div className="container">
        <header>
          <div onClick={handleOpac} className="fa_icon">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <input type="text" id="input_data" placeholder="Enter your location" />
          <button onClick={() => fetchPlaceData(setError, setPlace, setWeatherInfo, setAiResponse, setVari, "first", UrlFinder)}>SUBMIT</button>
          <button onClick={() => fetchPlaceData(setError, setPlace, setWeatherInfo, setAiResponse, setVari, "second", UrlFinder)}>Current Location</button>
        </header>
        <div className="display_area">
          {error ? <p>{error}</p> : place && (
            <>
              <div className="name_sec">
                <h1>{place.name}</h1>
                <h2>{place.adminName1}</h2>
              </div>
              <div className="data_sec">
                <div className="population"><FontAwesomeIcon icon={faPeopleGroup} /><span>{place.population}</span></div>
                <div className="Country"><FontAwesomeIcon icon={faGlobe} /><span>{place.countryName}</span></div>
                <div className="Longitude"><FontAwesomeIcon icon={faLocation} /><span>{place.lng}</span></div>
                <div className="Latitude"><FontAwesomeIcon icon={faLocation} /><span>{place.lat}</span></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="info">
        {place && <div className="fact_info"><h1>Fun Fact</h1><p>{aiResponse}</p></div>}
        {place && (
          <div className='map'>
            <iframe className="foot_frame" src={`https://www.openstreetmap.org/export/embed.html?bbox=${place.lng - 0.01},${place.lat - 0.01},${place.lng + 0.01},${place.lat + 0.01}&layer=mapnik&marker=${place.lat},${place.lng}`}></iframe>
            <small><a href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=12/${place.lat}/${place.lng}&layers=N`}>View Larger Map</a></small>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
