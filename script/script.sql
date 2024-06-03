CREATE TABLE "shop_users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    product BOOLEAN,
    address VARCHAR(255),
    card_number VARCHAR(16),
    cvv VARCHAR(10),
    expiry_date VARCHAR(10)
);
