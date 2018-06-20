const now = require('performance-now');
// helpers
const numberOfData = 100000;
const t0 = now();
let t2;

const getRandomInt = function getRandomIntegerBetweenValues(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
};

const getRandomDecimal = function getRandomDecimalBetweenValues(min, max, decimalPlace) {
  const rand = (Math.random() * (max - min)) + min;
  const power = 10 ** decimalPlace;
  return Math.floor(rand * power) / power;
};

const getRandomPosNeg = function getRandomPositiveOrNegative() {
  return Math.random() >= 0.5 ? 1 : -1;
};

const getDateString = function getDateStringForSQLInsertion(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};


// generating listings
const listings = [];
for (let i = 0; i < numberOfData; i += 1) {
  const row = [];

  row.push(i + 1); // index
  row.push(getRandomDecimal(2, 5, 1)); // average_rating
  row.push(getRandomInt(10, 500)); // review_count
  row.push(getRandomInt(2, 20)); // max_adults
  row.push(getRandomInt(2, 6)); // max_children
  row.push(getRandomInt(2, 6)); // max_infants
  row.push(getRandomInt(0, 80)); // cleaning_fee
  row.push(getRandomDecimal(0, 0.4, 2)); // service_fee_perc
  row.push(getRandomDecimal(0, 0.4, 2)); // occ_tac_rate_perc
  row.push(getRandomInt(0, 50)); // additional_guest_fee

  listings.push(row);
}

// generate reservations
const reservations = [];
const startDate = new Date(2018, 5, 15);

let rowNum = 1;

for (let i = 0; i < (numberOfData / 100); i += 1) {
  const reservationsForListing = getRandomInt(10, 50);
  const nextReservation = new Date(startDate);
  nextReservation.setDate(startDate.getDate() + getRandomInt(0, 10));

  for (let j = 0; j < reservationsForListing; j += 1) {
    const endOfReservation = new Date(nextReservation);
    endOfReservation.setDate(nextReservation.getDate() + getRandomInt(1, 10));

    const row = [rowNum, i + 1, getDateString(nextReservation), getDateString(endOfReservation)];
    reservations.push(row);

    rowNum += 1;
    nextReservation.setDate(endOfReservation.getDate() + getRandomInt(0, 10));
  }
}

// generate daily prices
const dailyPrices = [];
const priceStartDate = new Date(2018, 5, 1);
rowNum = 1;

for (let i = 0; i < (numberOfData / 100); i += 1) {
  const priceChangesForListing = getRandomInt(5, 10);
  const nextDate = new Date(priceStartDate);
  let nextPrice = getRandomInt(45, 500);

  for (let j = 0; j < priceChangesForListing; j += 1) {
    const row = [];

    row.push(rowNum); // index
    row.push(i + 1); // listing_id
    row.push(nextPrice); // cost_per_night
    row.push(getDateString(nextDate)); // start_date

    dailyPrices.push(row);
    rowNum += 1;

    const potentialNextPrice = nextPrice + (getRandomInt(0, 50) * getRandomPosNeg());
    nextPrice = potentialNextPrice > 45 ? potentialNextPrice : 45;
    nextDate.setDate(nextDate.getDate() + getRandomInt(10, 50));
  }
}

t2 = now();
console.log('generator finished in', (t2 - t1).toFixed(3));

module.exports = {
  listings,
  reservations,
  dailyPrices,
  t0,
  now,
};
