DROP TABLE IF EXISTS wallet CASCADE;
DROP TABLE IF EXISTS currentbets;
DROP TABLE IF EXISTS previousbets;

CREATE TABLE IF NOT EXISTS wallet(
  id SERIAL NOT NULL,
  total INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS currentbets(
  id SERIAL NOT NULL,
  wallet_id INTEGER NOT NULL,
  fav_name varchar(255) DEFAULT NULL,
  fav_odds INTEGER DEFAULT NULL,
  under_name varchar(255) DEFAULT NULL,
  under_odds INTEGER DEFAULT NULL,
  pick_name varchar(255) DEFAULT NULL,
  pick_odds INTEGER DEFAULT NULL,
  amount DECIMAL DEFAULT NULL,
  payout DECIMAL DEFAULT NULL,
  date_aired varchar(255),

  PRIMARY KEY (id),
  FOREIGN KEY (wallet_id)
  REFERENCES wallet (id)
);

CREATE TABLE IF NOT EXISTS previousbets(
  id SERIAL NOT NULL,
  wallet_id INTEGER NOT NULL,
  fav_name varchar(255) DEFAULT NULL,
  fav_odds INTEGER DEFAULT NULL,
  under_name varchar(255) DEFAULT NULL,
  under_odds INTEGER DEFAULT NULL,
  pick_name varchar(255) DEFAULT NULL,
  pick_odds INTEGER DEFAULT NULL,
  amount DECIMAL DEFAULT NULL,
  payout DECIMAL DEFAULT NULL,
  date_aired varchar(255),

  PRIMARY KEY (id),
  FOREIGN KEY (wallet_id)
  REFERENCES wallet (id)
);





