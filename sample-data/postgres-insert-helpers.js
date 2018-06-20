const { Client } = require('pg');
const {
  listings,
  reservations,
  dailyPrices,
  t0,
  now,
} = require('./generator');

const config = {
  host: 'localhost',
  database: 'project_nomad_booking',
  user: 'justinshih',
  password: '',
  port: 5432,
};

const client = new Client(config);
client.connect();

// module.exports = {
const insertListing = (listing, index) => {
  const insertListingQuery = `INSERT INTO listings (id, avg_rating, review_count, max_adults, max_children,
      max_infants, cleaning_fee, service_fee_perc, occ_tax_rate_perc, additional_guest_fee)
      VALUES (${listing[0]}, ${listing[1]}, ${listing[2]}, ${listing[3]},
        ${listing[4]}, ${listing[5]}, ${listing[6]}, ${listing[7]}, ${listing[8]}, ${listing[9]});`;

  client.query(insertListingQuery, (err) => {
    if (err) {
      console.log(err);
    }
    if (index === listings.length - 1) {
      console.log(`${listings.length} listings loaded!`);
    }
  });
};

const insertReservation = (reservation, index) => {
  const insertReservationQuery = `INSERT INTO reservations (id, listing_id, begin_date, end_date)
  VALUES (${reservation[0]}, ${reservation[1]}, TO_DATE('${reservation[2]}', 'MM/DD/YYYY'), TO_DATE('${reservation[3]}', 'MM/DD/YYYY'));`;

  client.query(insertReservationQuery, (err) => {
    if (err) {
      console.log(err);
    }
    if (index === reservations.length - 1) {
      console.log(`${reservations.length} reservations loaded!`);
    }
  });
};

const insertPrice = (price, index) => {
  const insertPriceQuery = `INSERT INTO listing_daily_prices (id, listing_id, cost_per_night, begin_date)
    VALUES (${price[0]}, ${price[1]}, ${price[2]}, TO_DATE('${price[3]}', 'MM/DD/YYYY'));`;

  client.query(insertPriceQuery, (err) => {
    if (err) {
      console.log(err);
    }
    if (index === dailyPrices.length - 1) {
      console.log(`${dailyPrices.length} daily prices loaded!`);
      const t1 = now();
      console.log('data seeded in', ((t1 - t0).toFixed(3) / 1000), `seconds for ${listings.length + reservations.length + dailyPrices.length} records`);
      client.end();
    }
  });
};

// insert into Postgres database
listings.forEach((listing, index) => {
  insertListing(listing, index);
});

reservations.forEach((reservation, index) => {
  insertReservation(reservation, index);
});

dailyPrices.forEach((price, index) => {
  insertPrice(price, index);
});

