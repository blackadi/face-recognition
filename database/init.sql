-- This will run inside the 'face-recognition' database automatically
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    enteries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS login (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email TEXT UNIQUE NOT NULL
);