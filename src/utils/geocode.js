let request = require('request')

let geocode = (address, callback) => {
    let geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWhtZXR0dW1pcyIsImEiOiJjbDJobmV1bHkwZmpkM2JwaG5kdTM0Z3U0In0.pGkRl8nAl5tWx0GATGdGLA&limit=1'
    
    request({url:geocodeURL, json:true}, (error, response) => {
        if(error){
            callback({error:'Unable to connect to location services!'}, undefined)
        } else if(response.body.message || response.body.features.length  === 0){
            callback({error:'Unable to find location. Try another search!'}, undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports =geocode