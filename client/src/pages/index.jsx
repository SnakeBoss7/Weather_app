import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";
export const Home = ()=>
{
    return(
        <div className="flex overflow-hidden h-full w-full">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}