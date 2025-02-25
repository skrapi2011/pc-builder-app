-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-20 17:24:53.262

-- tables
-- Table: Build
CREATE TABLE Build (
    build_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    Name double precision NOT NULL,
    date datetime NOT NULL,
    username integer NOT NULL,
    status varchar(25) NOT NULL,
    FOREIGN KEY (username) REFERENCES User (username)
);


-- Table: BuildInfo
CREATE TABLE BuildInfo (
    name VARCHAR(30) NOT NULL,
    component_id integer NOT NULL,
    build_id integer NOT NULL,
    quantity integer NOT NULL,
    price double NOT NULL,
    FOREIGN KEY (component_id) REFERENCES Component (component_id),
    FOREIGN KEY (build_id) REFERENCES Build (build_id)
);

-- Table: Category
CREATE TABLE Category (
    cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_name VARCHAR(25) NOT NULL,
    description VARCHAR(200) NOT NULL
);


-- Table: Component
CREATE TABLE Component (
    component_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL,
    description varchar(250) NOT NULL,
    price double NOT NULL,
    cat_id integer NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES Category (cat_id)
);


-- Table: User
CREATE TABLE User (
    username varchar(25) NOT NULL PRIMARY KEY,
    name varchar(25) NOT NULL,
    surname varchar(25) NOT NULL,
    email varchar(25) NOT NULL,
    password varchar(25) NOT NULL,
    role varchar(25) NOT NULL,
    token
);

-- End of file.