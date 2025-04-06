import React from 'react';
import Home from './home';
import City, { PlaceProvider } from './city';
import Setting from './setting';


const Main = ({ selectedOption ,handleOpac}) => {
        const renderComponent = () => {
            switch (selectedOption) {
                case "home":
                    return <Home handleOpac = {handleOpac}/>;
                case "setting":
    
                    return <Setting handleOpac = {handleOpac}/>;
                case "city":
                    return <City handleOpac = {handleOpac}/>;
                default:
                    return <Home handleOpac = {handleOpac} />; // Default page
            }
        }
        return(
            <PlaceProvider>
                {renderComponent()}
            </PlaceProvider>
        )
};
export default Main;
