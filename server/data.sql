DROP DATABASE IF EXISTS brewery_finder_db;

CREATE DATABASE brewery_finder_db;

\c brewery_finder_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS breweries;
DROP TABLE IF EXISTS users_breweries;

-- CREATE TABLE users
-- (
--     id SERIAL PRIMARY KEY,
--     username text NOT NULL,
--     password text NOT NULL,
--     is_admin boolean DEFAULT NOT NULL DEFAULT FALSE,
--     CONSTRAINT username_unique UNIQUE (username)
-- );

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  location TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT username_unique UNIQUE (username)
);


CREATE TABLE breweries
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    location text
);

CREATE TABLE users_breweries
(
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    brewery_id INTEGER NOT NULL REFERENCES breweries ON DELETE CASCADE,
    PRIMARY KEY(user_id, brewery_id)
);

-- INSERT INTO users (username, password, first_name, last_name, email, location, is_admin) 
--     VALUES ('pascal', 'pascal','Pascal', 'Kurkin', 'pas@gmail.com', 'Kiev', false);
INSERT INTO users (username, password, first_name, last_name, email, location, is_admin) 
    VALUES ('vika', '$2b$12$y49lvIgrdo8mUgfVPbx8U.5gvCetnunY3Oe7a60MrI1oq8.mFxXMi','Victoria', 'Kurkina', 'vika@mail.com', 'Houston', false);
INSERT INTO users (username, password, first_name, last_name, email, location, is_admin) 
    VALUES ('max', '$2b$12$356Uda./ZX5MQ6n7rGjdQuIcqA2oRo1P0fkKyHBgzpK9zSbyNLb4K','Maxim', 'Kurkin', 'max@gmail.com', 'Cypress', true);
INSERT INTO users (username, password, first_name, last_name, email, location, is_admin) 
    VALUES ('lera', '$2b$12$As/CPrKBNwWmNP1iCHbLv.zgZiTn4DmyiG8AMwHQKQQUDbfWuh13O','Valerie', 'Kurkina', 'lera@mail.ru', 'New York', true);

INSERT INTO breweries (name, location) VALUES ('Active Craft', 'Brooklyn, NY');
INSERT INTO breweries (name, location) VALUES ('Local Lager', 'Cypress, TX');
INSERT INTO breweries (name, location) VALUES ('LA Local', 'Los Angeles, CA');
INSERT INTO breweries (name, location) VALUES ('Active Brew', 'Edison, NJ');
INSERT INTO breweries (name, location) VALUES ('Mountain Spring', 'Denver, CO');

INSERT INTO users_breweries VALUES (1,1), (1,2),(1,4),(2,2),(3,1),(3,3),(4,2),(4,4);

-- SELECT u.id, u.name, b.name, b.location
-- FROM users AS u
-- LEFT JOIN users_breweries AS ub
-- ON u.id = ub.user_id
-- LEFT JOIN breweries AS b
-- ON ub.brewery_id = b.id
-- WHERE u.id = 1