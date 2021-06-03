DROP DATABASE IF EXISTS servises;
CREATE DATABASE IF NOT EXISTS servises;
USE servises;

CREATE TABLE IF NOT EXISTS users(
    id int AUTO_INCREMENT,
    googleId VARCHAR(200), 
    firstName VARCHAR(200),
    lastName VARCHAR(200),
    email VARCHAR(200),
    password VARCHAR(200),
    numberPhone INT,
     adress VARCHAR(200),
    image VARCHAR(200),
     country VARCHAR(20),
    State VARCHAR(250),
    Zip VARCHAR(250),
    gender VARCHAR(250),
    PRIMARY KEY (id)
);
CREATE TABLE sessions(
    id int NOT NULL AUTO_INCREMENT,
   users_id int NOT NULL ,
    session varchar(250) NOT NULL,
    date varchar(250) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (users_id) References users(id)
);
