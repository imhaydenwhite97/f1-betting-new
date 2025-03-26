DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS races;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS race_results;
DROP TABLE IF EXISTS wager_groups;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS invitations;
DROP TABLE IF EXISTS bets;

-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Races table
CREATE TABLE races (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming', 'in_progress', 'completed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE drivers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Race results table
CREATE TABLE race_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id INTEGER NOT NULL,
  driver_id INTEGER NOT NULL,
  position INTEGER,
  dnf BOOLEAN DEFAULT FALSE,
  fastest_lap BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (race_id) REFERENCES races (id),
  FOREIGN KEY (driver_id) REFERENCES drivers (id)
);

-- Wager groups table
CREATE TABLE wager_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

-- Group members table
CREATE TABLE group_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES wager_groups (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE (group_id, user_id)
);

-- Invitations table
CREATE TABLE invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (group_id) REFERENCES wager_groups (id)
);

-- Bets table
CREATE TABLE bets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  race_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  prediction TEXT NOT NULL, -- JSON array of driver names in predicted order
  fastest_lap TEXT, -- Driver name
  dnf_prediction TEXT, -- JSON array of driver names predicted to DNF
  score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (race_id) REFERENCES races (id),
  FOREIGN KEY (group_id) REFERENCES wager_groups (id),
  UNIQUE (user_id, race_id, group_id)
);

-- Insert sample data for drivers
INSERT INTO drivers (name, team, number) VALUES
('Max Verstappen', 'Red Bull Racing', 1),
('Sergio Perez', 'Red Bull Racing', 11),
('Lewis Hamilton', 'Mercedes', 44),
('George Russell', 'Mercedes', 63),
('Charles Leclerc', 'Ferrari', 16),
('Carlos Sainz', 'Ferrari', 55),
('Lando Norris', 'McLaren', 4),
('Oscar Piastri', 'McLaren', 81),
('Fernando Alonso', 'Aston Martin', 14),
('Lance Stroll', 'Aston Martin', 18),
('Pierre Gasly', 'Alpine', 10),
('Esteban Ocon', 'Alpine', 31),
('Alexander Albon', 'Williams', 23),
('Logan Sargeant', 'Williams', 2),
('Yuki Tsunoda', 'RB', 22),
('Daniel Ricciardo', 'RB', 3),
('Valtteri Bottas', 'Sauber', 77),
('Zhou Guanyu', 'Sauber', 24),
('Kevin Magnussen', 'Haas F1 Team', 20),
('Nico Hulkenberg', 'Haas F1 Team', 27);

-- Insert sample data for races
INSERT INTO races (name, location, date, status) VALUES
('Bahrain Grand Prix', 'Bahrain International Circuit', '2025-03-02', 'completed'),
('Saudi Arabian Grand Prix', 'Jeddah Corniche Circuit', '2025-03-09', 'completed'),
('Australian Grand Prix', 'Albert Park Circuit', '2025-03-23', 'completed'),
('Japanese Grand Prix', 'Suzuka International Racing Course', '2025-04-06', 'upcoming'),
('Chinese Grand Prix', 'Shanghai International Circuit', '2025-04-20', 'upcoming'),
('Miami Grand Prix', 'Miami International Autodrome', '2025-05-04', 'upcoming'),
('Emilia Romagna Grand Prix', 'Autodromo Enzo e Dino Ferrari', '2025-05-18', 'upcoming'),
('Monaco Grand Prix', 'Circuit de Monaco', '2025-05-25', 'upcoming'),
('Canadian Grand Prix', 'Circuit Gilles Villeneuve', '2025-06-08', 'upcoming'),
('Spanish Grand Prix', 'Circuit de Barcelona-Catalunya', '2025-06-22', 'upcoming');

-- Insert sample race results for completed races
-- Bahrain Grand Prix
INSERT INTO race_results (race_id, driver_id, position, dnf, fastest_lap) VALUES
(1, 1, 1, FALSE, TRUE), -- Max Verstappen
(1, 5, 2, FALSE, FALSE), -- Charles Leclerc
(1, 6, 3, FALSE, FALSE), -- Carlos Sainz
(1, 3, 4, FALSE, FALSE), -- Lewis Hamilton
(1, 2, 5, FALSE, FALSE), -- Sergio Perez
(1, 4, 6, FALSE, FALSE), -- George Russell
(1, 7, 7, FALSE, FALSE), -- Lando Norris
(1, 8, 8, FALSE, FALSE), -- Oscar Piastri
(1, 9, 9, FALSE, FALSE), -- Fernando Alonso
(1, 10, 10, FALSE, FALSE), -- Lance Stroll
(1, 11, 11, FALSE, FALSE), -- Pierre Gasly
(1, 12, 12, FALSE, FALSE), -- Esteban Ocon
(1, 13, 13, FALSE, FALSE), -- Alexander Albon
(1, 15, 14, FALSE, FALSE), -- Yuki Tsunoda
(1, 17, 15, FALSE, FALSE), -- Valtteri Bottas
(1, 18, 16, FALSE, FALSE), -- Zhou Guanyu
(1, 19, 17, FALSE, FALSE), -- Kevin Magnussen
(1, 20, 18, FALSE, FALSE), -- Nico Hulkenberg
(1, 14, NULL, TRUE, FALSE), -- Logan Sargeant (DNF)
(1, 16, NULL, TRUE, FALSE); -- Daniel Ricciardo (DNF)

-- Saudi Arabian Grand Prix
INSERT INTO race_results (race_id, driver_id, position, dnf, fastest_lap) VALUES
(2, 1, 1, FALSE, FALSE), -- Max Verstappen
(2, 2, 2, FALSE, FALSE), -- Sergio Perez
(2, 5, 3, FALSE, TRUE), -- Charles Leclerc
(2, 8, 4, FALSE, FALSE), -- Oscar Piastri
(2, 9, 5, FALSE, FALSE), -- Fernando Alonso
(2, 4, 6, FALSE, FALSE), -- George Russell
(2, 7, 7, FALSE, FALSE), -- Lando Norris
(2, 3, 8, FALSE, FALSE), -- Lewis Hamilton
(2, 15, 9, FALSE, FALSE), -- Yuki Tsunoda
(2, 20, 10, FALSE, FALSE), -- Nico Hulkenberg
(2, 19, 11, FALSE, FALSE), -- Kevin Magnussen
(2, 13, 12, FALSE, FALSE), -- Alexander Albon
(2, 16, 13, FALSE, FALSE), -- Daniel Ricciardo
(2, 10, 14, FALSE, FALSE), -- Lance Stroll
(2, 17, 15, FALSE, FALSE), -- Valtteri Bottas
(2, 18, 16, FALSE, FALSE), -- Zhou Guanyu
(2, 12, 17, FALSE, FALSE), -- Esteban Ocon
(2, 11, NULL, TRUE, FALSE), -- Pierre Gasly (DNF)
(2, 14, NULL, TRUE, FALSE), -- Logan Sargeant (DNF)
(2, 6, NULL, TRUE, FALSE); -- Carlos Sainz (DNF)

-- Australian Grand Prix
INSERT INTO race_results (race_id, driver_id, position, dnf, fastest_lap) VALUES
(3, 6, 1, FALSE, FALSE), -- Carlos Sainz
(3, 5, 2, FALSE, FALSE), -- Charles Leclerc
(3, 7, 3, FALSE, TRUE), -- Lando Norris
(3, 8, 4, FALSE, FALSE), -- Oscar Piastri
(3, 4, 5, FALSE, FALSE), -- George Russell
(3, 2, 6, FALSE, FALSE), -- Sergio Perez
(3, 9, 7, FALSE, FALSE), -- Fernando Alonso
(3, 10, 8, FALSE, FALSE), -- Lance Stroll
(3, 15, 9, FALSE, FALSE), -- Yuki Tsunoda
(3, 20, 10, FALSE, FALSE), -- Nico Hulkenberg
(3, 11, 11, FALSE, FALSE), -- Pierre Gasly
(3, 13, 12, FALSE, FALSE), -- Alexander Albon
(3, 19, 13, FALSE, FALSE), -- Kevin Magnussen
(3, 12, 14, FALSE, FALSE), -- Esteban Ocon
(3, 17, 15, FALSE, FALSE), -- Valtteri Bottas
(3, 18, 16, FALSE, FALSE), -- Zhou Guanyu
(3, 14, 17, FALSE, FALSE), -- Logan Sargeant
(3, 16, NULL, TRUE, FALSE), -- Daniel Ricciardo (DNF)
(3, 3, NULL, TRUE, FALSE), -- Lewis Hamilton (DNF)
(3, 1, NULL, TRUE, FALSE); -- Max Verstappen (DNF)
