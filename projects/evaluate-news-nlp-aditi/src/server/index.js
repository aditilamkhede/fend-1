// Setup empty JS object to act as endpoint for all routes
var projectData = {};

const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");

const cors = require('cors')  // import cors
const app = express() // your express app instance
app.use(cors()) // Use it as the middleware

app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set aylien API credentials
var nplapi = new aylien({
application_id: process.env.API_ID,
application_key: process.env.API_KEY
});

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// app.get('/nplapi', function (req, res) {
app.get('/nlpapi', function (req, res) {
    console.log('Get Classify', projectData['nlpurl']);
    // res.send(mockAPIResponse)

    // reference from below api documentation
    // https://docs.aylien.com/textapi/endpoints/?javascript#article-extraction

    nplapi.extract({
      url: projectData['nlpurl'],
      best_image: true
    }, function(error, response) {
      if (error === null) {
        console.log(response);
        projectData['image'] = response['image'];
        projectData['author'] = response['author'];
        projectData['title'] = response['title'];
      }
    });

    // //reference from below api documentation
    // // https://docs.aylien.com/textapi/endpoints/?javascript#combined-calls
    //
    // nplapi.combined({
    //   "url": projectData['nlpurl'],
    //   "endpoint": ["entities", "extract", "language"],
    //   "best_image": true
    // }, function(err, result) {
    //   if (err === null) {
    //     // console.log('results - ' + result.results);
    //     result.results.forEach(function(r) {
    //       console.log(r.endpoint + ':');
    //       console.log(r.result);
    //       projectData[r.endpoint] = r.result;
    //     });
    //   } else {
    //     console.log(err)
    //   }
    // });

    res.send(projectData);

    // nplapi.classify({
    //   // url: req.body['nlpurl']
    //   url: 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'
    // }
    // , function(error, response) {
    //   // console.log(`Your API key is ${process.env.API_KEY}`);
    //   console.log("Inside nplapi", error);
    //   if (error === null) {
    //     // console.log('response', response['categories']);
    //     response['categories'].forEach(function(c) {
    //       console.log('categories', c);
    //       res.send(response['categories']);
    //     });
    //   }
    // });
})

app.post('/nlpapi', function (req, res) {
    console.log('Post Classify', req.body);
    projectData['nlpurl'] = req.body['nlpurl']
    // res.send(mockAPIResponse)
    nplapi.classify({
      url: req.body['nlpurl']
      // url: 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'
    }, function(error, response) {
      // console.log(`Your API key is ${process.env.API_KEY}`);
      // console.log("Inside nplapi", error);
      if (error === null) {
        // console.log('response', response);
        response['categories'].forEach(function(c) {
          console.log('post', c);
          projectData['categories'] = response['categories'];
          res.send(projectData);
        });
      }
    });
})

app.post('/nlpapi/extract', function (req, res) {
    // console.log('Post extract', req.body);
    projectData['nlpurl'] = req.body.nlpurl;

    nplapi.extract({
      url: projectData['nlpurl'],
      best_image: true
    }, function(error, response) {
      if (error === null) {
        // console.log(response);
        projectData['image'] = response['image'];
        projectData['author'] = response['author'];
        projectData['title'] = response['title'];
        res.send(projectData);
      }
    });
})

module.exports = { app };
