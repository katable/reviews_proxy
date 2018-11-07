const express = require('express');
const morgan = require('morgan');
const request = require('request');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.port || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//get restaurant info
app.get('/restaurant/profile/:id', (req, res) => {
  var getRestaurantInfo = {
    host: 'localhost',
    port: 3001,
    path: `/restaurant/profile/${req.params.id}`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  console.log('Start');
  var restaurantInfoResults = http.request(getRestaurantInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("restaurant not found");
    });
  });
  restaurantInfoResults.end();
});

//get reservations
app.get('/reservations/timesBookedToday/:id', (req, res) => {
  var getReservationInfo = {
    host: 'localhost',
    port: 3002,
    path: `/reservations/timesBookedToday/${req.params.id}`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  console.log('Start');
  var reservationResults = http.request(getReservationInfo, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("reservations not found");
    });
  });
  reservationResults.end();
});

//get menu
app.get('/restaurants/:id/menu', (req, res) => {
  var getMenu = {
    host: 'localhost',
    port: 3000,
    path: `/restaurants/${req.params.id}/menu`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }  
  };
  console.log('Start');
  var menuResults = http.request(getMenu, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("menu not found");
    });
  });
  menuResults.end();
});

//get reviews
app.get('/restaurant/:id/reviews', (req, res) => {
  var getReviews = {
    host: 'localhost',
    port: 8080,
    path: `/restaurant/${req.params.id}/reviews`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };
  console.log('Start');
  var reviewResults = http.request(getReviews, (result) => {
    result.on('data', (data) => {
      res.status(200).send(data);
    }).on('error', (err) => {
      res.status(500).send("reviews not found");
    });
  });
  reviewResults.end();
});

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});