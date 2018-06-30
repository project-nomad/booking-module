require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../database/index-postgres');

const app = express();

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/listings/:listingId', express.static(path.join(__dirname, '/../public')));

// http://localhost:3001/listings/9020323/booking/core/
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
      res.status(200).send(results);
    }
  });
});

// structure: http://localhost:3001/listings/3/booking/pricing/?end_date=2018-09-28
app.get('/listings/:listingId/booking/pricing/', (req, res) => {
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
// http://localhost:3001/listings/9020323/booking/reservations/?begin_date=2018-09-26&end_date=2018-09-28
app.post('/listings/:listingId/booking/reservations/', (req, res) => {
  db.addReservation(req.params.listingId, req.query.begin_date, req.query.end_date, (err) => {
    if (err) res.send(err);
    else res.status(200).end();
  });
});

// update reservation
// http://localhost:3001/reservations/2020323/booking/?begin_date=2018-09-26&end_date=2018-09-28
app.put('/reservations/:reservationId/booking/', (req, res) => {
  db.updateReservation(req.params.reservationId, req.query.begin_date, req.query.end_date, (err) => {
    if (err) res.send(err);
    else res.status(200).end();
  });
});

// delete reservation
// http://localhost:3001/reservations/9020323/
app.delete('/reservations/:reservationId', (req, res) => {
  db.deleteReservation(req.params.reservationId, (err) => {
    if (err) res.send(err);
    else res.status(204).end();
  });
});

module.exports = app;
