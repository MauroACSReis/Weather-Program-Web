// require modules
const express = require('express')
const https = require('https') //require https native
const bodyParser = require('body-parser')

// initialize express
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// GET
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

//POST
app.post('/', function (req, res) {
  // POST - API config
  const query = req.body.cityName
  const apiKey = 'fd280f662c8045f1ae5794e7148ab277'
  const unit = 'metric'
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    unit

  // POST - https module to transfer the data from Weather API as JSON object
  https.get(url, function (res2) {
    // POST - console log status codes
    console.log(res2.statusCode) // get API and send response with https.get

    // POST - send response back to client using response.on("data")
    res2.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write('<p>The weather is currently ' + weatherDescription + '</p>')
      res.write('<img src="' + imageURL + '">')
      res.write(
        '<h2>The temperature in ' +
          query +
          ' is ' +
          temp +
          ' degrees celsius</h2>'
      )
      //POST - send
      res.send()
    })
  })
})

// LISTEN to port
const port = 3000
app.listen(port, function () {
  console.log(`Server started at port ${port}.`)
})
