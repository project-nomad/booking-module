// helpers

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

const generateListing = () => [
  getRandomDecimal(2, 5, 1),
  getRandomInt(10, 500),
  getRandomInt(2, 20),
  getRandomInt(2, 6),
  getRandomInt(2, 6),
  getRandomInt(0, 40),
  getRandomDecimal(0, 0.4, 2),
  getRandomDecimal(0, 0.4, 2),
  getRandomInt(0, 25),
];

// generate reservations

const generateReservation = (i) => {
  const startDate = new Date(2018, 5, 15);
  const nextReservation = new Date(startDate);
  nextReservation.setDate(startDate.getDate() + getRandomInt(0, 10));
  const reservations = [];
  for (let j = 0; j < getRandomInt(5, 15); j += 1) {
    const endOfReservation = new Date(nextReservation);
    endOfReservation.setDate(nextReservation.getDate() + getRandomInt(1, 10));

    const row = [i + 1, getDateString(nextReservation), getDateString(endOfReservation)];
    reservations.push(row);
    // write row;
    nextReservation.setDate(endOfReservation.getDate() + getRandomInt(0, 10));
  }
  return reservations;
};

// generate daily prices

const generateDailyPrices = (i) => {
  const priceStartDate = new Date(2018, 5, 1);
  const nextDate = new Date(priceStartDate);
  let nextPrice = getRandomInt(45, 500);
  const prices = [];
  for (let j = 0; j < getRandomInt(3, 8); j += 1) {
    const row = [i + 1, nextPrice, getDateString(nextDate)];
    // listing_id, cost_per_night, start_date

    prices.push(row);
    const potentialNextPrice = nextPrice + (getRandomInt(0, 50) * getRandomPosNeg());
    nextPrice = potentialNextPrice > 45 ? potentialNextPrice : 45;
    nextDate.setDate(nextDate.getDate() + getRandomInt(10, 50));
  }
  return prices;
};

module.exports = {
  generateListing,
  generateReservation,
  generateDailyPrices,
};
