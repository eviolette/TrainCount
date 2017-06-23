DROP DATABASE IF EXISTS trains;
CREATE DATABASE trains;

\c trains;

CREATE TABLE lines (
    id INTEGER,
    counter_name VARCHAR(30),
    counter_id INTEGER,
    train_id INTEGER,
    train_line VARCHAR(5),
    dep_time TIME,
    station VARCHAR(50),
    on_count INTEGER,
    off_count INTEGER,
    comments VARCHAR(200)
);

INSERT INTO lines (id, train_id, train_line, dep_time, station)
    VALUES (1, 606, 'UPNW', '05:36:00', 'Crystal Lake'),
            (2, 606, 'UPNW', '05:39:00', 'Pingree Road'),
            (3, 606, 'UPNW', '05:44:00', 'Cary'),
            (4, 606, 'UPNW', '05:47:00', 'Fox River Grove');

SELECT * FROM lines