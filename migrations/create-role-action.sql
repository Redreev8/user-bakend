CREATE TABLE Role_Actions (
    role_id INTEGER REFERENCES roles(id),
    action_id INTEGER REFERENCES actions(id),
    PRIMARY KEY (role_id, action_id)
)