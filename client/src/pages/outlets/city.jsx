import { useEffect, useState } from "react";
import axios from "axios";
import Switch from "../../components/hamburger/hamburger";
import { DropDown } from "../../components/input/input";
import { useLocContext } from "../../context/locationContext";
const apiUrl = process.env.REACT_APP_API_URL;

const City = () => {
  const { location } = useLocContext();
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        let res = await axios.post(`${apiUrl}/getdata/getLocInfo`, { location });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.length > 0) {
      handleFetchData();
    }
  },[location]);
  return (
    <div className="bg-primary p-3 h-full w-full lg:w-[80%] flex flex-col">
      <header className="w-full flex justify-between w-full">
        {/* <input type="text" className="p-3 bg-accent-primary outline-secondary rounded-lg w-1/3 h-10" placeholder="Enter the name of the place..."/> */}
        <DropDown />
        <Switch />
      </header>
    </div>
  );
};

export default City;

// const [isLoading, setIsLoading] = useState(false);
// const {
//   aiResponse_Tip, setAiResponse_Tip, error, setError, place, setPlace,
//   weatherInfo, setWeatherInfo, aiResponse, setAiResponse, setVari,faren
// } = usePlace();

// // This code defines a memoized callback function called handleSubmit.
// // When called, it triggers fetchPlaceData with the current setters and dependencies.
// // The useCallback hook ensures that handleSubmit is only recreated if any dependency changes.

// const handleSubmit = useCallback(() => {
//       setIsLoading(true);
//   fetchPlaceData(
//     faren,
//     setAiResponse_Tip,    // function to set AI tips
//     setError,             // function to set error
//     setPlace,             // function to set place data
//     setWeatherInfo,       // function to set weather info
//     setAiResponse,        // function to set AI fact
//     setVari,              // function to set vari
//     "first",              // type of fetch (by input)
//     UrlFinder           // function to build the URL
//   ).finally(() => {setIsLoading(false);});
// }, [faren,setAiResponse_Tip, setError,place, setPlace, setWeatherInfo, setAiResponse, setVari]);

// // Add Enter key functionality
// useEffect(() => {
//   const input = document.getElementById("input_data");
//   if (!input) return;
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };
//   input.addEventListener("keydown", handleKeyDown);
//   return () => input.removeEventListener("keydown", handleKeyDown);
// }, [handleSubmit]);

// import { queryTogetherAI } from "../CHAT_API/api";
// import loadingGif from './img/output-onlinegiftools.gif';
// export const PlaceContext = createContext();

// export const PlaceProvider = ({ children }) => {
//   const [place, setPlace] = useState(null);
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const [aiResponse, setAiResponse] = useState(null);
//   const [aiResponse_Tip, setAiResponse_Tip] = useState(null);
//   const [vari, setVari] = useState(null);
//   const [faren, setfaren] = useState(false);
//   const [error, setError] = useState(true);

//   const contextValue = {
//     aiResponse_Tip, setAiResponse_Tip, setError, place, setPlace,
//     weatherInfo, setWeatherInfo, aiResponse, setAiResponse, vari, setVari, faren, setfaren, error
//   };

//   return (
//     <PlaceContext.Provider value={contextValue}>
//       {children}
//     </PlaceContext.Provider>
//   );
// };

// export const usePlace = () => useContext(PlaceContext);

// export const extractNumber = (num) => (num < 10 ? num.slice(-1) : num);

// export const UrlFinder = async (type) => {
//   const username = "insane9988";
//   let url = "";

//   if (type === "first") {
//     const location = document.querySelector("#input_data").value.trim();
//     if (location) {
//       url = isNaN(location)
//         ? `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(location)}&featureClass=P&maxRows=10&username=${username}`
//         : `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(location)}&maxRows=1&username=${username}`;
//     }
//   } else if (type === "second" && navigator.geolocation) {
//     url = await new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         ({ coords: { latitude, longitude } }) =>
//           resolve(`https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${username}`),
//         (error) => reject(error)
//       );
//     });
//   }

//   return url;
// };

// export const fetchPlaceData = async (faren,
//   setAiResponse_Tip, setError, setPlace, setWeatherInfo, setAiResponse, setVari, type, UrlFinder
// ) => {
//   try {
//     const url = await UrlFinder(type);
//     if (!url) return setError("Enter the name of the place");

//     const response = await fetch(url);
//     const data = await response.json();
//     const fetchedPlace = data.geonames?.[0] || data.postalCodes?.[0];
//     if (!fetchedPlace) {
//       setPlace(null);
//       return setError("Can't fetch data for the specified location");
//     }

//     setPlace(fetchedPlace);
//     console.log(fetchedPlace);
//     setError("");

//     const weatherURL = `https://api.weatherapi.com/v1/forecast.json?key=453b48bde3544a35b6683930252803&q=${fetchedPlace.lat},${fetchedPlace.lng}&days=7&aqi=yes&alerts=no`;
//     const weatherResponse = await fetch(weatherURL);
//     const weatherData = await weatherResponse.json();
//     setWeatherInfo(weatherData);
//     setVari(extractNumber(weatherData.current.last_updated.split(" ")[1].split(":"))[0]);

// const combinedPrompt = `
// Give me two separate outputs in this format:

// 1. A single-sentence shocking fact (30 words) about ${fetchedPlace.name} in ${fetchedPlace.adminName1} — do not add a "1." label, just the sentence.

// 2. Then, give 5 weather-related tips for ${weatherData.current.temp_c}°C, UV ${weatherData.current.uv}, wind ${weatherData.current.wind_kph} kph, and ${weatherData.current.condition.text} — also use emojis compatible with Chrome
// `;

// try {
//   const new_response = await queryTogetherAI(combinedPrompt);
//   console.log(new_response);

//   // Step 1: Extract fact and tips block
//   const [factBlock, ...rest] = new_response.trim().split(/Here (?:are|is)[^:]*:\s*/i);
//   const shockingFact = factBlock.trim();
//   const tipsBlockRaw = rest.join(':').trim();

//   // Step 2: Extract tips (numbered, bullets, or emoji-prefixed)
//   const tips = tipsBlockRaw
//     .split('\n')
//     .map(line => line.trim())
//     .filter(line =>
//       /^\d+\.\s/.test(line) ||     // 1. Tip
//       /^\*\s/.test(line) ||        // * Tip
//       /^[\p{Emoji_Presentation}|\p{Emoji}]/u.test(line) // Emoji-prefixed (💧, 🌟, etc.)
//     )
//     .map(line =>
//       line
//         .replace(/^\d+\.\s*/, '')     // Remove "1. ", "2. ", etc.
//         .replace(/^\*\s*/, '')        // Remove "* "
//         .trim()
//     );

//   // Final outputs
//   setAiResponse(shockingFact);
//   setAiResponse_Tip(tips);

// } catch (error) {
//   setError("Can't fetch data for the specified location");
// }

//   } catch (error) {
//     console.error("Error fetching data:", error);
//     setError("Can't fetch data for the specified location");
//   }
// };
