const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=4eb8d1fa9eda9d009e5d3a525e0a3b1c&query=' + address
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to access', undefined)
        }
        else if(body.error || body.data.length===0){  
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log({
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude, 
                location: body.data[0].name
            });
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name
            })
        }
    })
}

module.exports = geocode