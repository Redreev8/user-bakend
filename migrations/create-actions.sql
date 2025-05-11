CREATE TABLE Actions (
    id SERIAL PRIMARY KEY NOT NULL, 
    action VARCHAR(255) NOT NULL
);

INSERT INTO actions (action) VALUES ('ALL'); -- 1

INSERT INTO actions (action) VALUES ('GET /actions/'); -- 2
INSERT INTO actions (action) VALUES ('POST /actions/'); -- 3
INSERT INTO actions (action) VALUES ('PATCH /actions/:id'); -- 4
INSERT INTO actions (action) VALUES ('DELETE /actions/:id'); -- 5

INSERT INTO actions (action) VALUES ('GET /roles/'); -- 6
INSERT INTO actions (action) VALUES ('POST /roles/'); -- 7
INSERT INTO actions (action) VALUES ('PATCH /roles/:id'); -- 8
INSERT INTO actions (action) VALUES ('DELETE /roles/:id'); -- 9

INSERT INTO actions (action) VALUES ('GET /check-token/'); -- 10
INSERT INTO actions (action) VALUES ('GET /token-payload/'); -- 11
INSERT INTO actions (action) VALUES ('POST /token/'); -- 12


INSERT INTO actions (action) VALUES ('PUT /user/change-role/'); -- 13