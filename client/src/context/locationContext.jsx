import { useState,useContext,createContext } from "react";

let locContext = createContext(
    {
        location:[],
        setLocation:()=>{}
    }
);

const LocationContextProvdier=({children})=>{

    const [location,setLocation] = useState([]);
    return(
        <locContext.Provider value={{location,setLocation}}>
            {children}
        </locContext.Provider>
    )
}

const useLocContext = ()=> useContext(locContext);

export  {useLocContext,LocationContextProvdier};