import { NavLink } from "react-router-dom";
import {
  ChartArea,
  DatabaseIcon,
  MessageSquare,
} from "lucide-react";
import { useSidebarContext } from "../../context/sidebarContext";
import { useLayoutEffect, useRef } from "react";
export const Sidebar = () => {
  const ref = useRef();
  const{showSidebar,setShowSidebar} = useSidebarContext();
  useLayoutEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        window.innerWidth < 1024 &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setShowSidebar(false);
      }
      else
      {
        setShowSidebar(true);

      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowSidebar]);
  const sidebarClose =()=>
    {
      if(window.innerWidth<1024){
        setShowSidebar(false);
      }
    }
  return (
    <div
      ref={ref}
      className={`z-[9999] flex flex-col lg:relative absolute ${
        showSidebar ? "translate-x-0" : "translate-x-[-1000px]"
      } transition:all ease-in-out duration-500 lg:block bg-accent-primary lg:w-[15%] w-[70%]  shadow-right h-full`}
    >
      <div className="flex justify-between p-3 items-start">
        <div className="logo flex items-start ">
          <div className="text-white text-4xl flex items-start">Weath</div>
          <div className=" text-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-4xl text-bottom">
            FAX
          </div>
        </div>
        {/* <Checkbox show={showSidebar} /> */}
      </div>
      <div className="links mt-10 flex flex-col gap-3 pr-10 px-3">
        <NavLink
        onClick={()=>{sidebarClose()}}
          to="/"
          end
          className={({ isActive }) =>
             isActive
              ? "flex items-center gap-3 text-white h-12 font-bold  text-lg rounded-lg bg-secondary  p-2"
              : "flex items-center gap-3 text-white h-12 font-bold text-lg hover:text-secondary p-2"
          }
        >
          <DatabaseIcon className="w-5" /> Location
        </NavLink>
        <NavLink
          to="weatherData"
               onClick={()=>{sidebarClose()}}
            className={({ isActive }) =>
             isActive
              ? "flex items-center gap-3 text-white h-12 font-bold  text-lg rounded-lg bg-secondary  p-2"
              : "flex items-center gap-3 text-white h-12 font-bold text-lg hover:text-secondary p-2"
          }
        >
          <MessageSquare className="w-5" /> Weather
        </NavLink>
        <NavLink
          to="/underDev"
               onClick={()=>{sidebarClose()}}

            className={({ isActive }) =>
             isActive
              ? "flex items-center gap-3 text-white h-12 font-bold  text-lg rounded-lg bg-secondary  p-2"
              : "flex items-center gap-3 text-white h-12 font-bold text-lg hover:text-secondary p-2"
          }
        >
          <ChartArea className="w-5" /> settings
        </NavLink>
      </div>
    </div>
  );
};
