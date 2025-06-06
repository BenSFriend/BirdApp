BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL,
    username varchar(50) NOT NULL UNIQUE,
    password_hash varchar(200) NOT NULL,
    role varchar(50) NOT NULL,
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE ranges (
 range_id SERIAL PRIMARY KEY,
 bird_range varchar (50) NOT NULL UNIQUE  -- Changed from bird_diet
);

CREATE TABLE diets (
diet_id SERIAL PRIMARY KEY,
bird_diet varchar(50) NOT NULL UNIQUE
);

CREATE TABLE birds (
bird_id SERIAL PRIMARY KEY,
bird_name varchar(50) NOT NULL UNIQUE,
wingspan INT,
range_id int not null,
diet_id int not null,
img_url varchar(200) null,
FOREIGN KEY (range_id) REFERENCES ranges(range_id),
FOREIGN KEY (diet_id) REFERENCES diets(diet_id)
);

COMMIT TRANSACTION;