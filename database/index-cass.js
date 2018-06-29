const Cassandra = require('cassandra-driver');

const client = new Cassandra.Client({ contactpoints: ['127.0.0.1'], keyspace: 'booking' });

// SELECT max_children, max_infants, cleaning_fee,service_fee_perc, occ_tax_rate_perc, additional_guest_fee, avg_rating,review_count,max_adults,avg(cost_per_night) FROM listings WHERE listing_id=8222338;
const getListingData = (listingId, callback) => {
  const query = `SELECT max_children,max_infants,cleaning_fee,service_fee_perc,
    occ_tax_rate_perc,additional_guest_fee,
    avg_rating,review_count,max_adults,avg(cost_per_night)
    FROM listings WHERE listing_id=${listingId}`;

  client.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// SELECT id, begin_date, end_date FROM reservations WHERE listing_id=10000000 AND (begin_date, end_date) >= ('2018-07-01','2018-07-01') AND (begin_date, end_date) <= ('2018-09-28','2018-09-28');
const gerReservationData = (listingId, beginDate, endDate, callback) => {
  const query = ``;

  client.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// SELECT listing_id, begin_date, cost_per_night FROM listings WHERE listing_id=9232322 ORDER BY begin_date DESC LIMIT 1;
const getMaxPrice = (listingId, callback) => {
  const query = `SELECT listing_id, begin_date, cost_per_night
    FROM listings WHERE listing_id =${listingId}
    ORDER BY begin_date DESC LIMIT 1;`;

  client.query(query, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// SELECT listing_id, begin_date, cost_per_night FROM listings WHERE listing_id = 9341233 AND begin_date < '2018-09-28';
const getPricingDataForDateRange = (listingId, endDate, callback) => {
  const query = `SELECT listing_id, begin_date, cost_per_night
    FROM listings WHERE listing_id = ${listingId}
    AND begin_date < ${endDate}`;

  client.query(query, (err, results) => {
    if (err) callback(err, null);
    else if (results.length > 0) callback(null, results);
    else getMaxPrice(listingId, callback);
  });
};

module.exports = {
  getListingData,
  gerReservationData,
  getPricingDataForDateRange,
}