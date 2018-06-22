const fs = require('fs');

const {
  generateListing,
  generateReservation,
  generateDailyPrices,
} = require('./generator');

// adds listings to csv

fs.writeFileSync('./listings.csv', '');

for (let i = 0; i < 100; i += 1) {
  let listings = [];
  for (let j = 0; j < 100000; j += 1) {
    const listing = generateListing();
    listings.push(listing);
  }
  listings = listings.join('\n');
  listings += '\n';
  fs.appendFileSync('./listings.csv', listings);
}

// add reservations to csv
fs.writeFileSync('./reservations.csv', '');

let reservations = [];
for (let i = 0; i < 10000000; i += 1) {
  let reservation = generateReservation(i);
  reservation = reservation.join('\n');
  reservations.push(reservation);
  if (i % 100000 === 0) {
    reservations = reservations.join('\n');
    reservations += '\n';
    fs.appendFileSync('./reservations.csv', reservations);
    reservations = [];
  }
}

// add dailyPrices to csv
fs.writeFileSync('./dailyPrices.csv', '');
let dailyPrices = [];
for (let i = 0; i < 10000000; i += 1) {
  let dailyPrice = generateDailyPrices(i);
  dailyPrice = dailyPrice.join('\n');
  dailyPrices.push(dailyPrice);
  if (i % 100000 === 0) {
    dailyPrices = dailyPrices.join('\n');
    dailyPrices += '\n';
    fs.appendFileSync('./dailyPrices.csv', dailyPrices);
    dailyPrices = [];
  }
}
