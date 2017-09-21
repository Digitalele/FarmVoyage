var express = require('express');
var router = express.Router();
const DataApi = require('../models/googleMapsInfo');
const passport   = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Farm Voyage' }, {user : req.user});
});

//save route in db
router.post('/save/route', (req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new route with location
    const newRoute = {
      userId:      req.user._id,
      route:       req.body.nameRoute,
      country:     req.body.country,
      to:          req.body.destination,
      from:        req.body.starting,
      distance:    req.body.searchRadius,
      type:        req.body.type,
      keyword:     req.body.keyword,
      name:        req.body.name
    };


  const route = new DataApi(newRoute);

  route.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});

//save place in db
router.post('/save/place', (req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
    const newPlace = {
      
      namePlace:      req.body.placeName,
      phonePlace:     req.body.placePhone,
      websitePlace:   req.body.placeWebsite,
      location:       location,
    };

  const place = new DataApi(newPlace);

  place.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});


//get api
router.get('/api/locations', function(req, res, next) {
  Place.find({}, (error, places) => {
    if (error) {
      next(error);
    } else {
      res.json(places);
    }
  })
});

module.exports = router;
