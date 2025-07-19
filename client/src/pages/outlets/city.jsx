import { useEffect, useState } from "react";
import axios from "axios";
import Switch from "../../components/hamburger/hamburger";
import { DropDown } from "../../components/input/input";
import { useLocContext } from "../../context/locationContext";
import {
  Flag,
  LightbulbIcon,
  LocateFixedIcon,
  LocateIcon,
  Users,
} from "lucide-react";
const apiUrl = process.env.REACT_APP_API_URL;

const City = () => {
  const { location } = useLocContext();
  const [locationInfo, setLocationData] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        let res = await axios.post(`${apiUrl}/getdata/getLocInfo`, {
          location,
        });
        let aiRes = await axios.post(`${apiUrl}/getdata/getFunFact`, {
          location,
        });
        console.log(res.data);
        console.log(aiRes.data.response);
        setAiResponse(aiRes.data.response);
        setLocationData(res.data.locationData);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.length > 0) {
      handleFetchData();
    }
  }, [location]);
  return (
    <div className="bg-primary min-h-screen p-3 sm:h-full w-full lg:w-[80%] flex flex-col">
      <header className="w-full flex justify-between w-full">
        <DropDown />
        <Switch />
      </header>
      {locationInfo ? (
        <>
          {" "}
          <div className="heading px-3 flex flex-col gap-3">
            <h1 className="mt-10 text-4xl">
              {locationInfo.toponymName ||
                locationInfo.PlaceName ||
                locationInfo.adminName1}
            </h1>
            <div class="country text-2xl flex flex-col ">
              <span className="city text-gray-400">
                {locationInfo.adminName1}
                {!locationInfo.countryName && "-" + locationInfo.countryCode}
              </span>
              <span className="city text-gray-400">
                {locationInfo.countryName &&
                  locationInfo.countryName + "-" + locationInfo.countryCode}
              </span>
            </div>
          </div>
          <div className="Data flex mt-10 w-full p-3 md:flex-row flex-col gap-3">
            <div className="flex flex-col gap-4 sm:w-[60%] w-full ">
              <div className="grid grid-cols-1 gap-4 w-[100%]  sm:grid-cols-2">
                <div className=" p-4 rounded bg-accent-primary rounded-xl flex flex-col gap-2">
                  <div class="heading flex gap-3 text-xl items-center">
                    <Users
                      className="bg-accent-secondary h-8 w-8 p-[6px] rounded-xl"
                      color="#45BBFF"
                      size={10}
                    />{" "}
                    Population
                  </div>
                  <p className="text-2xl tracking-tight text-zinc-300">
                    {locationInfo.population || "Not available"}
                  </p>
                </div>
                <div className=" p-4 rounded bg-accent-primary rounded-xl flex flex-col gap-2">
                  <div class="heading flex gap-3 text-xl items-center">
                    <LocateFixedIcon
                      className="bg-accent-secondary h-8 w-8 p-[6px] rounded-xl"
                      color="#45BBFF"
                      size={10}
                    />{" "}
                    Population
                  </div>
                  <p className="text-2xl tracking-tight text-zinc-300">{locationInfo.lng}</p>
                </div>
                <div className=" p-4 rounded bg-accent-primary rounded-xl flex flex-col gap-2">
                  <div class="heading flex gap-3 text-xl items-center">
                    <LocateFixedIcon
                      className="bg-accent-secondary h-8 w-8 p-[6px] rounded-xl"
                      color="#45BBFF"
                      size={10}
                    />{" "}
                    Population
                  </div>
                  <p className="text-2xl tracking-tight text-zinc-300">{locationInfo.lat}</p>
                </div>
                <div className=" p-4 rounded bg-accent-primary rounded-xl flex flex-col gap-2">
                  <div class="heading flex gap-3 text-xl items-center">
                    <Flag
                      className="bg-accent-secondary h-8 w-8 p-[6px] rounded-xl"
                      color="#45BBFF"
                      size={10}
                    />{" "}
                    Country
                  </div>
                  <p className="text-2xl tracking-tight text-zinc-300">
                    {locationInfo.countryName || locationInfo.countryCode}
                  </p>
                </div>
              </div>
              <div class="funfact bg-accent-primary flex flex-col gap-3 rounded-lg p-3">
                <h1 className="text-3xl flex items-center gap-3">
                  <LightbulbIcon
                    className="bg-yellow-600 p-1 opacity-[80%] rounded-lg"
                    size={30}
                    color="yellow"
                  />
                  Fun Fact
                </h1>
                <p className="tracking-tight text-xl text-zinc-300">{aiResponse}</p>
              </div>
            </div>
            <div class="map w-full mb-[10px] sm:mb-0  min-h-[350px] rounded-xl bg-accent-primary p-3 sm:w-[40%]">
              <iframe
                className="w-full h-full min-h-[500px]rounded-xl"
                marginwidth="0"
                id="gmap_canvas"
                src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Mauli%20Jagran%20Chandigarh+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>{" "}
              <a href="https://www.acadoo.de/leistungen/ghostwriter-doktorarbeit/"></a>{" "}
              <script
                type="text/javascript"
                src="https://embedmaps.com/google-maps-authorization/script.js?id=352c676308b50158828fa7fe48afae0dc04d7c52"
              ></script>
            </div>
          </div>
        </>
      ) : (
        <>
          <iframe
            className="w-full rounded-xl h-[500px]"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Mauli%20Jagran%20Chandigarh+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>{" "}
          <a href="https://www.acadoo.de/leistungen/ghostwriter-doktorarbeit/"></a>{" "}
          <script
            type="text/javascript"
            src="https://embedmaps.com/google-maps-authorization/script.js?id=352c676308b50158828fa7fe48afae0dc04d7c52"
          ></script>
        </>
      )}
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
