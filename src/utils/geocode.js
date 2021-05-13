const request = require('request')

const geocode = (address, callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWFrYWZhIiwiYSI6ImNrbnFpdHhneTA1Zm4ycG50N3VsdWhjdjYifQ.S4hNAmeOOk7zFD7lm7haQw'

    request({url: url, json: true}, (error, res) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        }else if(res.body.features.length === 0){
            callback('unable to find location. Try a different location. ', undefined)

        }else{
            callback(undefined, {
                latitude: res.body.features[0].center[0],
                logitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode