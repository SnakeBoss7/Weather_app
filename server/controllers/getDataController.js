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

    const locData = async(req,res) =>
    {
        console.log('calld locData')
        const username = process.env.USERNAME_KEY;
        const {location} = req.body;
        console.log(location)
        let url = isNaN(location[0])?`https://secure.geonames.org/searchJSON?q=${location[0]}&countryName=${location[location.length-1]}&adminName1=Delhi&maxRows=10&username=${username}`:`https://secure.geonames.org/postalCodeSearchJSON?postalcode=${location[0]}&country=${location[location.length-1]}&maxRows=10&username=${username}`       

        try
        {
            let response = await fetch(url);
            let locationsData = await response.json();
let locData = locationsData.postalCodes.filter(
  (data) => data.placeName.trim().toLowerCase() === location[1].trim().toLowerCase()
  
);
console.log(locData)
        }catch(err)
        {
            console.log(err);
            res.status(400).json({mess:'there some issue with geonames',error:err});
        }
    } 

module.exports = {locInputData,locData};