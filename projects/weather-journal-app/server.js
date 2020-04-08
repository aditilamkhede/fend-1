// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');
// Start up an instance of app
var app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
const server = app.listen(port, listening);

function listening(){
  console.log(`running on localhost: ${port}`);
}

//Get Route
app.get('/all', getWeather);

function getWeather(req, res){
  console.log('Get Weather All');
  res.send(projectData);
}

//Post Route
const data = [];
app.post('/weather', postWeather);

function postWeather(req, res){
  console.log('In Post Weather', req.body);
  // data.push(req.body);
  projectData['temperature'] = req.body['temperature'];
  projectData['date'] = req.body['date'];
  projectData['userip'] = req.body['userip'];
}
