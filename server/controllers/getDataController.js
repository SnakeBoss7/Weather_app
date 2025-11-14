const axios = require('axios');

const USERNAME = process.env.USERNAME_KEY;
const WEATH_KEY = process.env.WEATH_API;

// Validate env vars on startup
if (!USERNAME || !WEATH_KEY) {
  throw new Error('Missing required environment variables: USERNAME_KEY and WEATH_API');
}

// INPUT: Get location suggestions
const locInputData = async (req, res) => {
  const { locName } = req.body;
  
  if (!locName || locName.trim() === '') {
    return res.status(400).json({ mess: 'locName required and cannot be empty' });
  }

  const trimmedLocName = locName.trim();
  const isPostal = /^\d+$/.test(trimmedLocName); // More robust postal check
  
  const url = isPostal
    ? `http://api.geonames.org/postalCodeSearchJSON?postalcode=${trimmedLocName}&maxRows=10&username=${USERNAME}`
    : `http://api.geonames.org/searchJSON?q=${encodeURIComponent(trimmedLocName)}&featureClass=P&maxRows=10&username=${USERNAME}`;

  try {
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;
    
    // Handle GeoNames error responses
    if (data.status) {
      console.error('GeoNames API Error:', data.status.message);
      return res.status(500).json({ 
        mess: 'GeoNames API error', 
        error: data.status.message 
      });
    }
    
    const locations = isPostal ? (data.postalCodes || []) : (data.geonames || []);
    
    const options = locations.map((loc) => ({
      label: `${loc.toponymName || loc.postalCode || loc.placeName || 'Unknown'}${
        loc.placeName && loc.toponymName !== loc.placeName ? `, ${loc.placeName}` : ''
      }${loc.adminName1 ? `, ${loc.adminName1}` : ''}${
        loc.countryName ? `, ${loc.countryName}` : loc.countryCode ? `, ${loc.countryCode}` : ''
      }`,
      value: { 
        lat: parseFloat(loc.lat), 
        lng: parseFloat(loc.lng) 
      },
    }));

    res.json({ options });
  } catch (err) {
    console.error('GeoNames Error:', err.message);
    
    // Better error messages
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ mess: 'Request timeout', error: 'GeoNames API is slow to respond' });
    }
    
    res.status(500).json({ 
      mess: 'GeoNames API failed', 
      error: err.message 
    });
  }
};

// GET: Final weather data
const locData = async (req, res) => {
  const { location } = req.body;
  
  if (!location || !location.lat || !location.lng) {
    return res.status(400).json({ mess: 'location with lat and lng required' });
  }

  const { lat, lng } = location;

  try {
    // Make both API calls in parallel for better performance
    const [geoResponse, weatherResponse] = await Promise.all([
      axios.get(
        `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=${USERNAME}`,
        { timeout: 8000 }
      ),
      axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${WEATH_KEY}&q=${lat},${lng}&days=3&aqi=no&alerts=no`,
        { timeout: 8000 }
      )
    ]);

    const locationData = geoResponse.data.geonames?.[0];
    
    if (!locationData) {
      return res.status(404).json({ mess: 'No location found for coordinates' });
    }

    res.json({ 
      locationData, 
      weather: weatherResponse.data 
    });
  } catch (err) {
    console.error('API Error:', err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ mess: 'Request timeout' });
    }
    
    res.status(500).json({ 
      mess: 'API Error', 
      error: err.message 
    });
  }
};
const weathData = async (req, res) => {
  const {lat,lng} = req.body.location;
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${Weath_key}&q=${lat},${lng}&days=3&aqi=no&alerts=no`
    );
    res.json({ data: response.data });
  } catch (err) {
    res.status(400).json({ mess: "Weather API failed", err: err.message });
  }
};

module.exports = { locData, locInputData, weathData };