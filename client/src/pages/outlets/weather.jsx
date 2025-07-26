import React, { useState, useEffect, useRef } from "react";
import { useLocContext } from "../../context/locationContext";
import { DropDown } from "../../components/input/input";
import Checkbox from "../../components/hamburger/hamburger";
import { useFetcher } from "react-router-dom";
import axios from "axios";
import { BotMessageSquareIcon, Send } from "lucide-react";
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
  const { location, setLocation } = useLocContext();
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

        console.log(res.data);
        // console.log(aiRes.data.response);
        // setAiResponse(aiRes.data.response);
        setWeatherData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.length > 0) {
      handleFetchData();
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
    <div className="bg-primary overflow-y-scroll h-full md:overflow-hidden min-h-screen mb-10  gap- 3sm:h-full w-full lg:w-[80%] flex lg:flex-row flex-col">
      <div className="h-full flex flex-col    lg:w-[65%] w-full p-3">
        <header className="w-full flex justify-between w-full">
          <DropDown />
          <Checkbox />
        </header>
        {weatherData ? (
          <>
            <div className="flex mt-10 h-full flex-col lg:flex-row">
              <div className="flex flex-col w-full">
                <div className="flex  justify-between mb-10 items-center ">
                  <div className="heading px-3  flex flex-col gap-3">
                    <h1 className=" text-4xl">{weatherData.location.name}</h1>
                    <div class="country text-2xl flex flex-col ">
                      <span className="city text-gray-400">
                        {weatherData.location.region}
                      </span>
                      <span className="city text-gray-400">
                        {weatherData.location.country}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col items-center">
                    <p className="text-3xl">{weatherData.current.temp_c}°C</p>
                    <div className="flex items-center gap-2">
                      <p>{weatherData.current.condition.text}</p>
                      <img src={weatherData.current.condition.icon} alt="" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-3 ">
                  {weatherData.forecast.forecastday[0].hour.map((curr, idx) => {
                    if (idx > 4) {
                      return;
                    }
                    return (
                      <div className="flex items-center justify-between flex-col bg-accent-primary p-3 tracking-tight rounded-lg h-[100px] w-full">
                        <h2 className="text-lg">{curr.time.split(" ")[1]}</h2>
                        <h2 className="text-2xl flex gap-1">
                          {curr.temp_c} <p className="text-secondary">&deg;C</p>
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>gsfdgsdf</>
        )}
      </div>
      <div className="flex justify-between items-center p-3 lg:p-0 lg:pl-5 h-full lg:w-[35%] w-full ">
        <div className="rounded-lg p-5 bg-accent-primary w-full  h-full">
          <h1 className="text-2xl mb-10 flex items-center gap-3">
            {" "}
            <BotMessageSquareIcon /> AI playground
          </h1>
          <div ref={chatRefContainer}
           className="chats overflow-y-scroll max-h-[350px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {aiResponse.map((chat, idx) => (
              <div
              
                key={idx}
                className={`w-full my-2 flex ${
                  chat.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.role === "assistant"
                      ? "bg-primary text-left"
                      : "bg-blue-600 text-white text-right"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-left">
                    {chat.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading?<>stfu and wait nigga</>:<></>}
          </div>
            <div class="handler w-full flex gap-2  mt-10 justify-between ">
              <input value={userPrompt} placeholder="Ask here"  onKeyDown={(e)=>{e.key === 'Enter'? handleInput(): <></>}} onChange={(e)=>{setUserPrompt(e.target.value)}} type="text" className="w-full h-10 bg-primary  rounded-md p-2" />
              <button onClick={handleInput} className="bg-secondary p-2 rounded-lg">
                <Send />
              </button>
        </div>
             <div className="flex flex-col gap-2">
               {weatherData && <>
              <h2 className="mt-8 mb-5 text-xl font-bold">Quick Actions</h2>
<button onClick={(e)=> setUserPrompt(e.target.innerText)} className=" bg-accent-secondary p-2 rounded-md">UV Index: {weatherData.current.uv}, Any precautions?</button>

<button onClick={(e)=> setUserPrompt(e.target.innerText)} className="bg-accent-secondary p-2 mb-10 rounded-md">{weatherData.current.temp_c}°C — Any tips?</button></>
              }
             </div>
            </div>
      </div>
    </div>
  );
};

export default WeatherPage;
