CREATE database deli-db;

USE deli-db;

CREATE TABLE public.countries (
   id   integer   NOT NULL   PRIMARY KEY,
   name   character varying   NOT NULL,
   code   character varying   NOT NULL
)

CREATE TABLE public.users (
   id   integer   NOT NULL   PRIMARY KEY,
   username   character varying   NOT NULL   UNIQUE,
   email   character varying   NOT NULL,
   fullname   character varying   NOT NULL,
   isVerified   boolean   NOT NULL,
   age   integer   NOT NULL,
   password   character varying   NOT NULL,
   countryId   integer   NOT NULL,
   CONSTRAINT fk_country FOREIGN KEY (countryId) REFERENCES countries(id)
)

INSERT INTO countries (id, name, code) 
    VALUES (1, 'Argentina', 'AR'), 
    (2, 'Brasil', 'BR'), (3, 'Chile', 'CL'), (4, 'Uruguay', 'UY'), (5, 'Paraguay', 'PY'),
    (6, 'Bolivia', 'BO'), (7, 'Peru', 'PE'), (8, 'Ecuador', 'EC'), (9, 'Colombia', 'CO')