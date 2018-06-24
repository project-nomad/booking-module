const express = require('express');
const path = require('path');
const db = require('../database/index-postgres');

const app = express();

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/listings/:listingId', express.static(path.join(__dirname, '/../public')));

app.get('/listings/:listingId/booking/core', (req, res) => {
  db.getBaseDataForListing(req.params.listingId, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).send(results);
    }
  });
});

// structure: http://localhost:3001/listings/3/booking/availability/?start_date=2018-07-01&end_date=2018-09-28
app.get('/listings/:listingId/booking/availability/', (req, res) => {
  db.getReservationDataForDateRange(req.params.listingId, req.query.begin_date, req.query.end_date, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      console.log(results);
      res.status(200).send(results);
    }
  });
});

// structure: http://localhost:3001/listings/3/booking/pricing/?end_date=2018-09-28
app.get('listings/:listingId/booking/pricing/', (req, res) => {
  db.getPricingDataForDateRange(req.params.listingId, req.query.end_date, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).send(results);
    }
  });
});

// add reservation
app.post('/reservations/:listingId/', (req, res) => {

});
// update reservation
app.put('/reservations/:reservationId/', (req, res) => {

});
// delete reservation
app.delete('reservations/:reservationId', (req, res) => {

});

module.exports = app;
