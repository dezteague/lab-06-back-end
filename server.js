'use strict'

// app dependiencies
const express = require('express');
const cors = require('cors');

// get proect enviroment variables
require('dotenv').config();

// app constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors());

// **************a test route that gives you turtle tim.*****************
// app.get('/testroute', function (req, res) {
//     let animal = { type: 'turtle', name: 'tim' };
//     Response.json(animal);
// });

app.get('/location', (req, res) => {
  console.log('my request object: ', req);
  const locationData = searchToLatLng(req.query.data);
  res.send(locationData);
});

// helper function
function searchToLatLng(query) {
  const geoData = require('data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query;
  return location;
}

function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});