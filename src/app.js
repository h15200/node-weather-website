const path = require('path')
const express = require("express")
const hbs = require('hbs') // you need this for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() // to initialize express
// paths for public and templates dir
const publicDirectoryPath = path.join(__dirname, '../public') //dirname, path.join are core variable and methods
const viewsPath = path.join(__dirname, '../templates/views') // point to the dir of hbs files
const partialsPath = path.join(__dirname, '../templates/partials')// to partials dir 

// Setup handlebar stuff - app.set is all you need for hbs connection, UNLESS you want partials
app.set('view engine', 'hbs') // set up for handlebar. make dir "views" (MUST BE 'VIEWS'!!) in project dir, create index.hbs
app.set('views', viewsPath) // set where to look for files
hbs.registerPartials(partialsPath)

// setup static directory to serve. 
app.use(express.static(publicDirectoryPath)) // use html files for paths. Go this route if you
// only need static information that you can embed into the html files. otherwise, use handlebar files instead for dynamic rendering

app.get('', (req, res) => { // the first arg empty string implies root '/' page.
  res.render('index', {
    title: 'Weather',  // sending dynamic data to handlebar file, then render
    name: "Hideaki Aomori"
  }) //res.render will render a view template (like handlebar). 
})             // for INDEX ONLY, you only need to use the string name of the file name with out the extension, .hbs

app.get('/about', (req, res) => { // for other parts of the page , you need forward slash
  res.render('about', {
    title: 'About Me',
    name: 'Hideaki Aomori'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Hideaki Aomori'
  })
})


app.get("/weather", (req, res) => {
  // serve object as JSON to webpage directly
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => { // cannot set headers after they are sent to the client means
  if (!req.query.search){ // you CANT't send twice. To solve this, just return the first if statement
    return res.send({
      error: 'You must provide a search term'
  })}
  res.send({
    products: []
  })
}
)


// '*' match anything ELSE that wasn't written before. This code must be last app.get
app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404',
    name: 'Hideaki Aomori',
    error: 'Help article not found' 
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404', 
    name: 'Hideaki Aomori',
    error: 'Page not found'
  })
})

app.listen(3000, () => { // set up the port. consoling log as a dev update
  console.log("Server is up on port 3000.")
})