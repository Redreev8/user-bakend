CREATE TABLE Role_Actions (
    role_id INTEGER REFERENCES roles(id),
    action_id INTEGER REFERENCES actions(id),
    PRIMARY KEY (role_id, action_id)
);

INSERT INTO role_actions (role_id, action_id) VALUES (1, 2);
INSERT INTO role_actions (role_id, action_id) VALUES (2, 1);