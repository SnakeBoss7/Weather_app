import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";
import { useEffect } from "react";
import { useSidebarContext } from "../context/sidebarContext";

export const Home = ()=>
{
    const {setShowSidebar} = useSidebarContext(); 
    useEffect(()=>
        {
            const handleSidebar = () =>
                {
                    if(window.innerWidth>=1024)
                        {
                            setShowSidebar(true);
                        }
                        else
                            {
                                setShowSidebar(false);
                            }
                }
                window.addEventListener('resize',handleSidebar);
                return () => {window.removeEventListener('resize',handleSidebar)}
        },[])
    return(
        <div className="flex h-full w-full">

                <Sidebar/>

            <Outlet/>
        </div>
    );
}