const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS instruments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    serial_number VARCHAR(100) UNIQUE,
    condition VARCHAR(20) CHECK (condition IN ('new', 'used', 'damaged')),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

    
INSERT INTO categories (name, description) VALUES
  ('Guitars', 'Stringed instruments, acoustic and electric'),
  ('Keyboards', 'Pianos, synthesizers, and digital keyboards'),
  ('Percussion', 'Drums, cymbals, and percussion instruments'),
  ('Wind', 'Flutes, clarinets, saxophones, trumpets');

INSERT INTO brands (name, country) VALUES
  ('Fender', 'USA'),
  ('Yamaha', 'Japan'),
  ('Gibson', 'USA'),
  ('Roland', 'Japan'),
  ('Pearl', 'Japan');

INSERT INTO instruments (name, category_id, brand_id, serial_number, condition, quantity, price) VALUES
  ('Stratocaster Electric Guitar', 1, 1, 'STRAT12345', 'new', 5, 1200.00),
  ('Les Paul Standard', 1, 3, 'LPS78910', 'used', 2, 1500.00),
  ('Stage Piano FP-30X', 2, 4, 'FP30X9876', 'new', 3, 900.00),
  ('Grand Piano C3X', 2, 2, 'C3X001122', 'new', 1, 25000.00),
  ('Drum Set Export EXX', 3, 5, 'EXX554433', 'used', 4, 750.00),
  ('Alto Saxophone YAS-280', 4, 2, 'YAS280999', 'new', 6, 1100.00);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
