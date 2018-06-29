CREATE KEYSPACE IF NOT EXISTS booking WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

CREATE TABLE IF NOT EXISTS booking.listings (
  listing_id INT,
  avg_rating DECIMAL,
  review_count INT,
  max_adults INT,
  max_children INT,
  max_infants INT,
  cleaning_fee DECIMAL,
  service_fee_perc DECIMAL,
  occ_tax_rate_perc DECIMAL,
  additional_guest_fee DECIMAL,
  begin_date DATE,
  cost_per_night DECIMAL,
  PRIMARY KEY (listing_id, begin_date)) WITH CLUSTERING ORDER BY (begin_date DESC);

CREATE TABLE IF NOT EXISTS booking.reservations (
  id TIMEUUID,
  listing_id INT,
  begin_date DATE,
  end_date DATE,
  PRIMARY KEY((listing_id), begin_date, end_date);
);

COPY reservations (listing_id , begin_date , end_date , id ) FROM '/Users/justinshih/HackReactor/airJordans/booking-module/reservations-Cass.csv';