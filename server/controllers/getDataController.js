const locInputData = async(req,res) =>
    {
        const username = process.env.USERNAME_KEY;
        const {locName} = req.body;
        let url = isNaN(locName)?`https://secure.geonames.org/searchJSON?q=${locName}&featureClass=P&maxRows=10&username=${username}`:`https://secure.geonames.org/postalCodeSearchJSON?postalcode=${locName}&maxRows=10&username=${username}`       
        let options =[];
        try
        {
            let response = await fetch(url);
            let locData = await response.json();
            console.log(locData)
            let locations = locData.geonames|| locData.postalCodes;
            locations.forEach((loc,index)=>
                {
                    options.push(
                        {
                            label:(loc.toponymName || loc.postalCode )+ (loc.placeName ? (', '+loc.placeName):'') +', '+loc.adminName1 + ', ' +( loc.countryName || loc.countryCode),
                            value:index
                        })
                    
                })

            console.log(options)
            res.json({options});
        }catch(err)
        {
            console.log(err);
            res.status(400).json({mess:'there some issue with geonames',error:err});
        }
    } 

const locData = async (req, res) => {
  console.log('Called locData');
  
  const username = process.env.USERNAME_KEY;
  const { location } = req.body;

  if (!Array.isArray(location) || location.length < 2) {
    return res.status(400).json({ error: 'Invalid location input' });
  }

  const nameOrPin = location[0];
  const country = location[location.length - 1];
  const adminName = location.length >= 3 ? location[1] : ''; 

  const url = isNaN(nameOrPin)
    ? `http://api.geonames.org/searchJSON?name_equals=${encodeURIComponent(nameOrPin)}&adminName1=${encodeURIComponent(adminName)}&maxRows=10&username=${username}`
    : `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(nameOrPin)}&country=${encodeURIComponent(country)}&maxRows=10&username=${username}`;

  try {
    const response = await fetch(url);
    const locationsData = await response.json();

    let locationData = null;

    if (isNaN(nameOrPin)) {
      locationData = locationsData.geonames?.find(
        (data) =>
          data.adminName1?.trim().toLowerCase() === adminName.trim().toLowerCase()
      );
    } else {
      locationData = locationsData.postalCodes?.find(
        (data) =>
          data.placeName?.trim().toLowerCase() === location[1].trim().toLowerCase()
      );
    }
    console.log(locationData)

    return res.status(200).json({ locationData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'There was an issue with GeoNames API',
      error: err.message || err,
    });
  }
};

module.exports = { locData ,locInputData};