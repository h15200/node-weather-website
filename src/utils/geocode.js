const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaDE1MjAwIiwiYSI6ImNqems5OHUxdzBpaGMzbWs2b3Q2M2p3YW8ifQ.mdxqYgxS449izqD-X7BKjg&limit=1'

  request({
    url,
    json: true
  }, (error, {body} = {}) => {  // set default of destructure to empty set
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('No matching results. Try another search!', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode