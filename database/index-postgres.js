const { Client } = require('pg');
const config = require('./config-postgres');

const connection = new Client(config);
connection.connect();

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

const getReservationDataForDateRange = (listingId, startDate, endDate, callback) => {
  const query = `SELECT id, start_date, end_date
    FROM reservations
    WHERE listing_id = ${listingId}
    AND (start_date BETWEEN '${startDate}' AND '${endDate}'
    OR end_date BETWEEN '${startDate}' AND '${endDate}');`;

  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getMaxPrice = function getMaxPrice(listingId, callback) {
  const maxQuery = `SELECT id, start_date, cost_per_night
    FROM listing_daily_prices
    WHERE listing_id = ${listingId}
    ORDER BY start_date DESC LIMIT 1;`;

  connection.query(maxQuery, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getPricingDataForDateRange = (listingId, startDate, endDate, callback) => {
  const query = `SELECT id, start_date, cost_per_night
    FROM listing_daily_prices
    WHERE listing_id = ${listingId}
    AND start_date < '${endDate}';`;

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

module.exports = {
  getPricingDataForDateRange,
  getReservationDataForDateRange,
  getBaseDataForListing,
};
