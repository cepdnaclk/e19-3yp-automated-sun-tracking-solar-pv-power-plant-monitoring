CREATE DATABASE HelioEye;

USE HelioEye;

CREATE TABLE user(
    id              INT(6) AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50),
    user_type       VARCHAR(20), -- "super admin", "admin", "client"
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
    purchased_customer_email    VARCHAR(255),
    assigned_customer_id        INT(6),
    device_name_by_customer     VARCHAR(15),
    device_latitude             FLOAT, 
    device_longitude            FLOAT, 
    FOREIGN KEY(assigned_company_id)  REFERENCES user(id),
    FOREIGN KEY(assigned_customer_id) REFERENCES user(id)
);

-- primary system admin account

INSERT INTO user (id, username, user_type, email, passphrase, contact_number, user_address)
VALUES 
         
(2, 'supun', 'admin', 'e19349@eng.pdn.ac.lk', '$2b$10$DxLK9VQQb2c.oayUny5R/OG3.PnNs6cbJoKuocvP1ZX8OJyzr5WCy', '1234567890', '123 Main Street, Cityville'),
(3, 'thilanka', 'company', 'e19413@eng.pdn.ac.lk', '$2b$10$krQrt9PeeKlDwRrlVePAxO9mPqeL15ulY1YgfFMHeL.kDYvL80nLO', '0123456789', '123 Main Street, Peradeniya'),
(7, 'sanda2', 'customer', 'e19351@eng.pdn.ac.lk', '$2a$10$NnDiRHT3d1XoYjNrsPDfEOShG2rqLIQftyLpsssd.JbtWtzwclJPy', NULL, NULL),
(14, 'sanda4', 'customer', 'e19357@eng.pdn.ac.lk', '$2a$10$6Fr5avUJE23kV0J9SCLLM.lVlpo0GHqdNpJnPOAafgElT1YcBU3/W', NULL, NULL);
