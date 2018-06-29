const fs = require('fs');

const { generateListing, generateReservationCass, generateDailyPricesCass } = require('./generator');

// adds listings to csv

fs.writeFileSync('./listings-Cass.csv', '');

let listings = [];
for (let i = 1; i <= 10000000; i += 1) {
  const listing = generateListing();
  const prices = generateDailyPricesCass(i);
  prices.map(elem => elem.push(...listing));
  listings.push(...prices);
  if (i % 100000 === 0) {
    listings = listings.join('\n');
    listings += '\n';
    fs.appendFileSync('./listings-Cass.csv', listings);
    listings = [];
  }
}

// Adds Reservations to csv
fs.writeFileSync('./reservations-Cass.csv', '');

let reservations = [];
for (let i = 1; i <= 10000; i += 1) {
  let reservation = generateReservationCass(i);
  reservation = reservation.join('\n');
  reservations.push(reservation);
  if (i % 100 === 0) {
    reservations = reservations.join('\n');
    reservations += '\n';
    fs.appendFileSync('./reservations-Cass.csv', reservations);
    reservations = [];
  }
}
