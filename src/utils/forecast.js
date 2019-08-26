const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/2b3ecbb7cdc59dda3f3a8f4dac04c9b9/${latitude},${longitude}`
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. ${body.daily.summary}`)
    }
  })
}

module.exports = forecast