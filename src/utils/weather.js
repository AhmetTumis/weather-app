let request = require('request')


let weather = (latitude, longitude, callback) => {

    //let query = latitude.toString() + ',' + longitude.toString()
    let weatherUrl = 'http://api.weatherstack.com/current?access_key=b75a3a0e716a736fd5677e1486639cd2&query=' + latitude + ',' + longitude + '&units=m'

    request({url : weatherUrl, json:true}, (error,response) => {
        if(error){
            callback(error, undefined)
        }else if(response.body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined, { 
                location: response.body.location.name,
                temp: response.body.current.temperature,
                precip: response.body.current.precip
            })
        }
    })

}


module.exports = weather

