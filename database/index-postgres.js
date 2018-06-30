const { Client } = require('pg');
const config = require('./config-postgres');

const connection = new Client(config);
connection.connect();

// SELECT l.*, ROUND(AVG(p.cost_per_night), 0) as avg_cost_per_night FROM listings l JOIN listing_daily_prices p ON l.id=p.listing_id WHERE l.id=9999999 GROUP BY 1,2,3,4,5,6,7;
const getBaseDataForListing = (listingId, callback) => {
  const query = `SELECT l.*, ROUND(AVG(p.cost_per_night), 0) as avg_cost_per_night
    FROM listings l
    JOIN listing_daily_prices p ON l.id = p.listing_id
    WHERE l.id = ${listingId}
    GROUP BY 1,2,3,4,5,6,7`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// SELECT id, begin_date, end_date FROM reservations WHERE listing_id=10000000 AND (begin_date BETWEEN '2018-07-01' AND '2018-09-28' OR end_date BETWEEN '2018-07-01' AND '2018-09-28');
const getReservationDataForDateRange = (listingId, beginDate, endDate, callback) => {
  const query = `SELECT id, begin_date, end_date
    FROM reservations
    WHERE listing_id = ${listingId}
    AND (begin_date BETWEEN '${beginDate}' AND '${endDate}'
    OR end_date BETWEEN '${beginDate}' AND '${endDate}');`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getMaxPrice = function getMaxPrice(listingId, callback) {
  const maxQuery = `SELECT id, begin_date, cost_per_night
    FROM listing_daily_prices
    WHERE listing_id = ${listingId}
    ORDER BY begin_date DESC LIMIT 1;`;

  connection.query(maxQuery, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// SELECT id, begin_date, cost_per_night FROM listing_daily_prices WHERE listing_id = 9999800 AND begin_date < '2018-09-28';
const getPricingDataForDateRange = (listingId, endDate, callback) => {
  const query = `SELECT id, begin_date, cost_per_night
    FROM listing_daily_prices
    WHERE listing_id = ${listingId}
    AND begin_date < '${endDate}';`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length > 0) {
      callback(null, results);
    } else { // if no results in date range, just get most recent price
      getMaxPrice(listingId, callback);
    }
  });
};

// INSERT INTO reservations(listing_id,begin_date,end_date) VALUES(8234343,'2018-03-22','2018-03-24');
const addReservation = (listingId, beginDate, endDate, callback) => {
  const query = `INSERT INTO reservations(listing_id,begin_date,end_date)
    VALUES(${listingId},'${beginDate}','${endDate}');`;
  
  connection.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// UPDATE reservations SET begin_date='2018-08-22',end_date='2018-08-24' WHERE id=32342349;
const updateReservation = (reservationId, beginDate, endDate, callback) => {
  const query = `UPDATE reservations SET begin_date='${beginDate}',
  end_date='${endDate}' WHERE id=${reservationId}`;

  connection.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// DELETE FROM reservations WHERE id=9329440;
const deleteReservation = (reservationId, callback) => {
  const query = `DELETE FROM reservations WHERE id=${reservationId}`;

  connection.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

module.exports = {
  getPricingDataForDateRange,
  getReservationDataForDateRange,
  getBaseDataForListing,
  addReservation,
  updateReservation,
  deleteReservation,
};
