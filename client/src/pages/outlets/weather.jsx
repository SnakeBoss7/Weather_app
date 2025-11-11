import React, { useState, useEffect, useRef } from "react";
import { useLocContext } from "../../context/locationContext";
import { DropDown } from "../../components/input/input";
import { MessageSquare, Send, Wind, Droplets, Eye, Gauge, Sun, Moon, LocateFixedIcon } from "lucide-react";

import Checkbox from "../../components/hamburger/hamburger";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const WeatherPage = ({ handleOpac }) => {
  const chatRefContainer = useRef(null);
  const [aiResponse, setAiResponse] = useState([
    {
      role: "assistant",
      content:
        "Hello! I can help you understand weather patterns, suggest activities based on conditions, or answer any weather-related questions.",
    },
  ]);
  const [userPrompt,setUserPrompt] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const { location } = useLocContext();
  const [weatherData, setWeatherData] = useState();
  console.log(location);
  useEffect(() => {
    const container = chatRefContainer.current;
    if(container)
      {
    container.scrollTop = container.scrollHeight;

      }
  },[aiResponse]);
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        let res = await axios.post(`${apiUrl}/getdata/getWeathData`, {
          location,
        });
        setWeatherData(res.data.data);
        localStorage.setItem("weath_data",JSON.stringify(res.data.data))
      } catch (err) {
        console.log(err);
      }
    };
    
      if(localStorage.getItem("weath_data")){
        const locationData = JSON.parse(localStorage.getItem("weath_data"));
    setWeatherData(JSON.parse(localStorage.getItem("weath_data")));
    const loc = JSON.parse(localStorage.getItem("locData"))
    if(location.lat !==  locationData.lat){
      handleFetchData();

    }
  }
    
  }, [location]);

  const handleInput=async ()=>
    {
      if(userPrompt.trim() === '') return;
      setAiResponse(prev=>[...prev,{role:'user',content:userPrompt}]);
      setUserPrompt('');
      setIsLoading(true);
      try {
        let aiRes = await axios.post(`${apiUrl}/getdata/askTogetherAi`, {aiResponse,userPrompt});
        console.log(aiRes.data);
         setAiResponse(prev=>[...prev,{role:'assistant',content:aiRes.data.response}]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);

    }
  return (
  <div className="bg-primary overflow-y-scroll h-full md:overflow-hidden min-h-screen mb-10 w-full flex lg:flex-row flex-col">
      <div className="h-full flex flex-col lg:w-[75%] w-full p-3 ">
        <header className="w-full flex justify-between">
          <DropDown />
          <Checkbox />
        </header>
        
        {weatherData ? (
          <div className="flex mt-10 h-full flex-col overflow-y-scroll px-3 hide-scrollbar" >
            {/* Main Weather Info */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              {/* Location & Current Temp */}
              <div className="flex justify-between lg:justify-start lg:flex-col lg:w-1/2 items-start lg:items-start">
                <div className="heading flex flex-col gap-3">
                  <h1 className="text-4xl font-bold">{weatherData.location.name}</h1>
                  <div className="text-2xl flex flex-col">
                    <span className="text-gray-400">{weatherData.location.region}</span>
                    <span className="text-gray-400">{weatherData.location.country}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end lg:items-start lg:mt-4">
                  <p className="text-5xl font-bold">{weatherData.current.temp_c}°C</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-lg">{weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt="" className="w-12 h-12" />
                  </div>
                  <p className="text-gray-400 mt-1">Feels like {weatherData.current.feelslike_c}°C</p>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4 lg:w-1/2">
                <div className="bg-accent-primary p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <Wind size={20} />
                    <span className="text-sm">Wind</span>
                  </div>
                  <p className="text-2xl font-semibold">{weatherData.current.wind_kph} km/h</p>
                  <p className="text-sm text-gray-400">{weatherData.current.wind_dir}</p>
                </div>

                <div className="bg-accent-primary p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <Droplets size={20} />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <p className="text-2xl font-semibold">{weatherData.current.humidity}%</p>
                  <p className="text-sm text-gray-400">Average</p>
                </div>

                <div className="bg-accent-primary p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <Eye size={20} />
                    <span className="text-sm">Visibility</span>
                  </div>
                  <p className="text-2xl font-semibold">{weatherData.current.vis_km} km</p>
                  <p className="text-sm text-gray-400">Clear</p>
                </div>

                <div className="bg-accent-primary p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <Gauge size={20} />
                    <span className="text-sm">Pressure</span>
                  </div>
                  <p className="text-2xl font-semibold">{weatherData.current.pressure_mb} mb</p>
                  <p className="text-sm text-gray-400">Normal</p>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mb-2">
              <h2 className="text-xl font-semibold mb-2">Hourly Forecast</h2>
              <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar pb-2 scrollbar-thin scrollbar-thumb-accent-secondary scrollbar-track-accent-primary">
                {weatherData.forecast.forecastday[0].hour.slice(0, 8).map((curr, idx) => (
                  <div key={idx} className=" items-center justify-center w-full flex-col bg-accent-primary p-2 tracking-tight rounded-lg min-w-[100px]">
                   <div className="flex items-center justify-between">
                     <h2 className="text-sm text-gray-400">{curr.time.split(" ")[1]}</h2>
                    <img src={curr.condition.icon} alt="" className="w-10 h-10 my-2" />
                   </div>
                    <h2 className="text-xl font-semibold text-center align-center">
                      {curr.temp_c.toFixed(1)}<span className="text-secondary">°C</span>
                    </h2>
                  </div>
                ))}
              </div>
            </div>

            {/* Sun & Moon Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-accent-primary p-4 rounded-lg">
                <div className="flex items-center gap-2 text-secondary mb-3">
                  <Sun size={20} />
                  <span className="font-semibold">Sun Times</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Sunrise</p>
                    <p className="text-lg font-semibold">{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sunset</p>
                    <p className="text-lg font-semibold">{weatherData.forecast.forecastday[0].astro.sunset}</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent-primary p-4 rounded-lg">
                <div className="flex items-center gap-2 text-secondary mb-3">
                  <Moon size={20} />
                  <span className="font-semibold">Moon Phase</span>
                </div>
                <p className="text-lg font-semibold">{weatherData.forecast.forecastday[0].astro.moon_phase}</p>
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-sm text-gray-400">Today's High</p>
                    <p className="text-lg font-semibold">{weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Today's Low</p>
                    <p className="text-lg font-semibold">{weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isLoading?<>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Loading weather data...</p>
          </div></>:<>
           <div className="flex flex-col items-center justify-center min-h-full px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-accent-primary rounded-full p-6">
            <LocateFixedIcon
              size={64} 
              className="text-[#45BBFF] opacity-50"
            />
          </div>
        </div>
        
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-3 text-white">
          No Location Selected
        </h2>
        
        {/* Description */}
        <p className="text-lg text-gray-400 mb-6">
          Search for a city or location above to view detailed information, population data, and fun facts.
        </p>
        
        {/* Optional: Suggestion text */}
        <div className="bg-accent-primary rounded-lg p-4 mt-4">
          <p className="text-sm text-gray-300">
            💡 Try searching for cities like <span className="text-[#45BBFF] font-medium">Mumbai</span>, 
            <span className="text-[#45BBFF] font-medium"> Delhi</span>, or 
            <span className="text-[#45BBFF] font-medium"> Bangalore</span>
          </p>
        </div>
      </div>
    </div></>}
      </div>

      {/* AI Chatbot - Responsive */}
      <div className="flex justify-between items-center p-3 lg:p-0  h-full lg:w-[25%] w-full">
        <div className="rounded-lg p-4 lg:p-5 bg-accent-primary w-full h-full flex flex-col">
          <h1 className="text-xl lg:text-2xl mb-4 lg:mb-10 flex items-center gap-3">
            <MessageSquare />
            AI Playground
          </h1>
          
          <div 
            ref={chatRefContainer}
            className="chats overflow-y-scroll flex-1 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {aiResponse.map((chat, idx) => (
              <>

<div
  key={idx}
  className={`w-full my-2 flex ${
    chat.role === "assistant" ? "justify-start" : "justify-end"
  }`}
>
  <div
    className={`max-w-[85%] lg:max-w-[80%] p-3 rounded-lg text-sm lg:text-base ${
      chat.role === "assistant"
        ? "bg-primary text-left"
        : "bg-blue-600 text-white text-right"
    }`}
  >
    <div 
      className="whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{ __html: chat.content }}
    />
  </div>
</div>
            
              
            </>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-primary p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex gap-2 mb-3">
              <input 
                value={userPrompt} 
                placeholder="Ask about the weather..." 
                onKeyDown={(e) => { e.key === 'Enter' && handleInput() }} 
                onChange={(e) => { setUserPrompt(e.target.value) }} 
                type="text" 
                className="w-full h-10 bg-primary rounded-md p-2 text-sm lg:text-base" 
              />
              <button 
                onClick={handleInput} 
                className="bg-secondary p-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send size={20} />
              </button>
            </div>

            {weatherData && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm lg:text-base font-bold mb-2">Quick Actions</h2>
                <button 
                  onClick={(e) => setUserPrompt(e.target.innerText)} 
                  className="bg-accent-secondary p-2 rounded-md text-xs lg:text-sm hover:opacity-90 transition-opacity text-left"
                >
                  UV Index: {weatherData.current.uv}, Any precautions?
                </button>
                <button 
                  onClick={(e) => setUserPrompt(e.target.innerText)} 
                  className="bg-accent-secondary p-2 rounded-md text-xs lg:text-sm hover:opacity-90 transition-opacity text-left"
                >
                  {weatherData.current.temp_c}°C — Any tips?
                </button>
                <button 
                  onClick={(e) => setUserPrompt(`Wind speed is ${weatherData.current.wind_kph} km/h. Is it safe to go outside?`)} 
                  className="bg-accent-secondary p-2 rounded-md text-xs lg:text-sm hover:opacity-90 transition-opacity text-left"
                >
                  Wind: {weatherData.current.wind_kph} km/h — Safe to go out?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
