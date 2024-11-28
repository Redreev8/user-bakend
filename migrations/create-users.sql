CREATE TABLE Users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id) DEFAULT 1
);