const request = require('request')

const forecast = (latitude, logitude, callback) =>{

const url = 'http://api.weatherstack.com/current?access_key=c4ab0a863f7866fc92b67d4d38e72ab6&query= '+ logitude + ',' + latitude + '&units=f'

request({url: url, json: true}, (error, res) =>{
    if(error){
        callback('could not get connect to service', undefined)
    }else if(res.body.error){
        callback('unable to find location', undefined)
    }else{
        callback(undefined, {

            latitude: res.body.location.lat,
            logitude: res.body.location.lon, 
            feeling: res.body.feelslike


            
        })
    }

   
})

}

module.exports = forecast