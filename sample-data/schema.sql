-- #run: mysql -u root < sample-data/schema.sql

DROP DATABASE IF EXISTS project_nomad_booking;
CREATE DATABASE project_nomad_booking;

-- should \c project_nomad_booking
\c project_nomad_booking;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  avg_rating decimal (3, 2),
  review_count int NOT NULL,
  max_adults int NOT NULL,
  max_children int NOT NULL,
  max_infants int NOT NULL,
  cleaning_fee decimal (10, 2) NOT NULL,
  service_fee_perc decimal (3, 2) NOT NULL,
  occ_tax_rate_perc decimal (3, 2) NOT NULL,
  additional_guest_fee decimal(10, 2) NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  listing_id int NOT NULL,
  begin_date date NOT NULL,
  end_date date NOT NULL
);


CREATE TABLE listing_daily_prices (
  id SERIAL PRIMARY KEY,
  listing_id int NOT NULL,
  cost_per_night decimal(10, 2) NOT NULL,
  begin_date date NOT NULL
);

-- COPY listings (avg_rating,review_count,max_adults,max_children,max_infants,cleaning_fee,service_fee_perc,occ_tax_rate_perc,additional_guest_fee) from '/Users/justinshih/HackReactor/airJordans/booking-module/listings.csv' DELIMITER ',' csv;
-- COPY reservations (listing_id,begin_date,end_date) from '/Users/justinshih/HackReactor/airJordans/booking-module/reservations.csv' DELIMITER ',' csv;
-- COPY listing_daily_prices (listing_id,cost_per_night,begin_date) from '/Users/justinshih/HackReactor/airJordans/booking-module/dailyPrices.csv' DELIMITER ',' csv;


-- adds foriegn keys after insertion
-- ALTER TABLE reservations ADD CONSTRAINT fk_reservations FOREIGN KEY (listing_id) REFERENCES listings(id);
-- ALTER TABLE listing_daily_prices ADD CONSTRAINT fk_listing_daily_prices FOREIGN KEY (listing_id) REFERENCES listings(id);