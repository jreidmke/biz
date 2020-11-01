\c biz

DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS industries CASCADE;
DROP TABLE IF EXISTS company_industry CASCADE;

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

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries
  VALUES('acct', 'Accounting'),
        ('pizza', 'Pizza'),
        ('comp', 'Computers');

INSERT INTO company_industry
  VALUES('apple', 'acct'),
        ('apple', 'pizza'),
        ('ibm', 'pizza'),
        ('ibm', 'comp');

\dt
SELECT * FROM companies;
SELECT * FROM invoices;
SELECT * FROM industries;
SELECT * FROM company_industry;
