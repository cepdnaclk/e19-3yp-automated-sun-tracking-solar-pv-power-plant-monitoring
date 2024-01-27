CREATE DATABASE HelioEye;

USE HelioEye;

CREATE TABLE user(
    id              INT(6) AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50),
    user_type       VARCHAR(20), -- "admin", "company", "customer"
    email           VARCHAR(255) UNIQUE NOT NULL,
    passphrase      VARCHAR(255) NOT NULL,
    contact_number  VARCHAR(13),
    user_address    VARCHAR(255)
);

CREATE TABLE device(
    id                          INT(6) AUTO_INCREMENT PRIMARY KEY,
    model_name                  VARCHAR(50),
    model_number                VARCHAR(20),
    description_                VARCHAR(255),
    assigned_company_id         INT(4),
    assigned_company_name       VARCHAR(50),
    purchased_customer_email    VARCHAR(255),
    assigned_customer_id        INT(6),
    device_name_by_customer     VARCHAR(15),
    device_latitude             FLOAT, 
    device_longitude           FLOAT, 
    FOREIGN KEY(assigned_company_id)  REFERENCES user(id),
    FOREIGN KEY(assigned_customer_id) REFERENCES user(id)
);

-- primary system admin account

INSERT INTO user (username, user_type, email, passphrase, contact_number, user_address)
VALUES ('SUPER ADMIN', 'admin', 'john.doe@example.com', 'securepassword', '1234567890', '123 Main Street, Cityville');
         

