-- #run: mysql -u root < sample-data/schema.sql

DROP DATABASE IF EXISTS project_nomad_booking;
CREATE DATABASE project_nomad_booking;

-- should \c project_nomad_booking
-- USE project_nomad_booking;

CREATE TABLE listings (
  id int PRIMARY KEY,
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
  id int PRIMARY KEY,
  listing_id int NOT NULL,
  begin_date date NOT NULL,
  end_date date NOT NULL
);

CREATE TABLE listing_daily_prices (
  id int PRIMARY KEY,
  listing_id int NOT NULL,
  cost_per_night decimal(10, 2) NOT NULL,
  begin_date date NOT NULL
);