CREATE TABLE Roles (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
);

INSERT INTO roles (name) VALUES ('user');
INSERT INTO roles (name) VALUES ('admin');