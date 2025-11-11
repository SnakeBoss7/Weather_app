const axios = require('axios'); // ADD THIS: npm install axios
const { response } = require('express');

const USERNAME = process.env.USERNAME_KEY || null; // GeoNames username from env
const Weath_key = process.env.WEATH_API || null; // GeoNames username from env
if (!USERNAME) console.warn('Warning: USERNAME_KEY is not set in environment. GeoNames requests may fail.');
// INPUT: Get location suggestions
const locInputData = async (req, res) => {
  const { locName } = req.body;
  if (!locName) return res.status(400).json({ mess: 'locName required' });

  const isPostal = !isNaN(locName);
  const url = isPostal
    ? `http://api.geonames.org/postalCodeSearchJSON?postalcode=${locName}&maxRows=10&username=${USERNAME}`
    : `http://api.geonames.org/searchJSON?q=${encodeURIComponent(locName)}&featureClass=P&maxRows=10&username=${USERNAME}`;

    // console.log({url})
  try {
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;
    const locations = isPostal ? data.postalCodes : data.geonames || [];
    const options = locations.map((loc, i) => ({
      label: `${loc.toponymName || loc.postalCode || ''}${loc.placeName ? `, ${loc.placeName}` : ''}, ${loc.adminName1 || ''}, ${loc.countryName || loc.countryCode}`,
      value: {lat:loc.lat,lng:loc.lng},
    }));

    res.json({ options });
  } catch (err) {
    console.error('GeoNames Error:', err.message);
    res.status(500).json({ mess: 'GeoNames API failed', error: err.message });
  }
};

// GET: Final weather data
const locData = async (req, res) => {
  const { lat,lng } = req.body.location;

const url = `  http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=${USERNAME}`

  
  try {
    const response  = await axios.get(url, { timeout: 8000 });
    const data =response.data.geonames[0];
    const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${Weath_key}&q=${lat},${lng}&days=3&aqi=no&alerts=no`;
    const weatherRes = await axios.get(weatherUrl);
    res.json({ locationData: data, weather: weatherRes.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mess: 'API Error', error: err.message });
  }
};

const weathData = async (req, res) => {
  const {lat,lng} = req.body.location;
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${Weath_key}&q=${lat},${lng}&days=3&aqi=no&alerts=no`
    );
    console.log(response.data);
    res.json({ data: response.data });
  } catch (err) {
    res.status(400).json({ mess: "Weather API failed", err: err.message });
  }
};

module.exports = { locData, locInputData, weathData };