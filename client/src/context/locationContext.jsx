// locationContext.js
import { useState, useContext, createContext } from "react";

let LocContext = createContext({
  location: {},
  setLocation: () => {}
});

const LocationContextProvider = ({children}) => {
  const [location, setLocation] = useState({}); // Changed from [] to {}
  
  return (
    <LocContext.Provider value={{ location, setLocation }}>
      {children}
    </LocContext.Provider>
  );
};

const useLocContext = () => useContext(LocContext);

export { useLocContext, LocationContextProvider };