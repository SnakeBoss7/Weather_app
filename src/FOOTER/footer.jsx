import React from 'react';
import './footer.css'
import { PlaceProvider, usePlace } from '../MAIN/city';
const Footer = () => {
    const {place} = usePlace();
    console.log(place);
    if(place)
        {
            
            return (
                <div className='foot_container'>
                    {place && (<> <iframe className='foot_frame'
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(place.lng) - 0.01},${parseFloat(place.lat) - 0.01},${parseFloat(place.lng) + 0.01},${parseFloat(place.lat) + 0.01}&layer=mapnik&marker=${place.lat},${place.lng}`}
                          ></iframe>
                          <br />
                          <small>
                            <a href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=12/${place.lat}/${place.lng}&layers=N`}>
                              View Larger Map
                            </a>
                          </small></>)}
                </div>
            );
        }
        else
        {
            return (
                <div className='foot_container'>
                    <p>Enter The name of the place</p>
                </div>
            );
        }
}

export default Footer;
