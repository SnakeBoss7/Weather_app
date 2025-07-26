import {  useEffect, useState } from "react";
import axios from "axios";
import checkbox from "../../components/hamburger/hamburger";
import { DropDown } from "../../components/input/input";
import { useLocContext } from "../../context/locationContext"; // Adjust path as needed
import {
  Flag,
  LightbulbIcon,
  LocateFixedIcon,
  LocateIcon,
  Users,
} from "lucide-react";
import Checkbox from "../../components/hamburger/hamburger";
import Skeleton from "react-loading-skeleton";
const apiUrl = process.env.REACT_APP_API_URL;

const City = () => {
  const {location} = useLocContext();
  const [locationData, setLocationData] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState(null);
  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    if (location.length > 0) {
      handleFetchData();
    }
  }, [location]);
  return (
    <div className="bg-primary overflow-y-scroll md:overflow-hidden min-h-screen p-3 sm:h-full w-full lg:w-[80%] flex flex-col">
      <header className="w-full flex justify-between w-full">
        <DropDown />
        <Checkbox/>
      </header>
      {isLoading?<>
      
     <div className="heading px-3 mt-20 flex flex-col gap-3">
           <Skeleton height={40} width={300} />
            <div class="country text-2xl flex flex-col ">
                <Skeleton height={20} width={250} />
    <Skeleton height={40} width={180} />
            </div>
          </div>
          <div className="Data flex mt-10 w-full p-3 md:flex-row flex-col gap-3">
            <div className="flex flex-col gap-4 md:w-[60%] w-full ">
              <div className="grid grid-cols-1 gap-4 w-[100%]  sm:grid-cols-2">
               
                 <Skeleton height={100}  />
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                  <Skeleton height={100} />

            </div>
              <div  className="w-full">
                <Skeleton height={100} />
              </div>
          </div>
            <div class="map w-full mb-[10px] sm:mb-0  min-h-[350px] rounded-xl bg-accent-primary p-3 md:w-[40%]">
              <Skeleton height={300} />
            </div>
  </div>
      </>: locationData ? (
        <>
          {" "}
          <div className="heading px-3 flex flex-col gap-3">
            <h1 className="mt-10 text-4xl">
              {locationData.toponymName ||
                locationData.PlaceName ||
                locationData.adminName1}
            </h1>
            <div class="country text-2xl flex flex-col ">
              <span className="city text-gray-400">
                {locationData.adminName1}
                {!locationData.countryName && "-" + locationData.countryCode}
              </span>
              <span className="city text-gray-400">
                {locationData.countryName &&
                  locationData.countryName + "-" + locationData.countryCode}
              </span>
            </div>
          </div>
          <div className="Data flex mt-10 w-full p-3 md:flex-row flex-col gap-3">
            <div className="flex flex-col gap-4 md:w-[60%] w-full ">
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
                    {locationData.population || "Not available"}
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
                  <p className="text-2xl tracking-tight text-zinc-300">{locationData.lng}</p>
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
                  <p className="text-2xl tracking-tight text-zinc-300">{locationData.lat}</p>
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
                    {locationData.countryName || locationData.countryCode}
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
                <p className="tracking-tight md:text-xl text-md text-zinc-300">{aiResponse}</p>
              </div>
            </div>
            <div class="map w-full mb-[10px] sm:mb-0  min-h-[350px] rounded-xl bg-accent-primary p-3 md:w-[40%]">
              <iframe
                className="w-full h-full min-h-[500px]rounded-xl"
                marginwidth="0"
                id="gmap_canvas"
                src={`https://www.google.com/maps?q=${locationData.toponymName||locationData.PlaceName ||
                locationData.adminName1},+${locationData.countryName || locationData.countryCode}&z=12&output=embed`}
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
  src="https://www.google.com/maps?q=Solan,+Himachal+Pradesh,+India&z=12&output=embed"
  width="520"
  height="400"
  allowfullscreen=""
  loading="lazy">
</iframe>
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
