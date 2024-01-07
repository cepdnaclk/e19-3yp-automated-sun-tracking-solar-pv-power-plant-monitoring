CREATE DATABASE HelioEye;

USE HelioEye;

CREATE TABLE admins(
    id              INT(3) AUTO_INCREMENT PRIMARY KEY,
    admin_name      VARCHAR(50),
    email           VARCHAR(255) UNIQUE NOT NULL,
    passphrase      VARCHAR(30) NOT NULL,

);

CREATE TABLE company(
    id              INT(4) AUTO_INCREMENT PRIMARY KEY,
    company_name    VARCHAR(50) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    passphrase      VARCHAR(30) NOT NULL,
    company_address VARCHAR(255),
    contact_no1     VARCHAR(13),
    contact_no2     VARCHAR(13),
);

CREATE TABLE customer(
    id               INT(6) AUTO_INCREMENT PRIMARY KEY,
    customer_name    VARCHAR(50),
    email            VARCHAR(255) UNIQUE NOT NULL,
    passphrase       VARCHAR(30) NOT NULL,
    customer_address VARCHAR(255)
);

CREATE TABLE device(
    id              INT(6) AUTO_INCREMENT PRIMARY KEY,
    model_name      VARCHAR(50),
    model_number    VARCHAR(20),
    dimension       VARCHAR(20),
    description_    VARCHAR(255),
    assigned_company_id INT(4),
    assigned_customer_id INT(6),

    FOREIGN KEY(assigned_company_id) REFERENCES company(id),
    FOREIGN KEY(assigned_customer_id) REFERENCES customer(id)
);

--primary system admin account
INSERT INTO admins(id,admin_name, email, passphrase) VALUES
(1,"Helio Eye Super Admin","e19029@eng.pdn.ac.lk","abcd1234");

