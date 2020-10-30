\c biz

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS company_industry;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision)) --this checks to make sure amt > 0;
);

CREATE TABLE industries (
  ind_code text PRIMARY KEY,
  industry text NOT NULL
);

CREATE TABLE company_industry (
  code text REFERENCES companies,
  ind_code text REFERENCES industries
);

\dt