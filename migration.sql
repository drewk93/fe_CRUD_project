DROP TABLE IF EXISTS planes;
DROP TABLE IF EXISTS manufacturers;

CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(3) NOT NULL
);

CREATE TABLE planes (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    tail_number VARCHAR(5) NOT NULL,
    manufacturer_id INT,
    CONSTRAINT unique_tail UNIQUE (tail_number),
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers (id)
);
