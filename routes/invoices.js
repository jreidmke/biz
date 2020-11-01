//hey let's do some routing
const express = require("express");
const router = express.Router();
const ExpressError = require('../expressError');
const db = require("../db");

//alright, let's check those routes


//GET /invoices returns {invoices: {id, comp_code}, {id, comp_code}};

//GET /inovices/id returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}

//POST /invoices takes in {comp_code, amt} and RETURNS {invoice: {id, comp_code, amt, paid, add_date, paid_date}}

//PUT /invoices/id updates by id. Takes in {amt}, RETURNS {invoice: {id, comp_code, amt, paid, add_date, paid_date}}

//DELETE /invoices/id RETURNS {status: "deleted"}

//LOOKS LIKE YOU"LL NEED TO CHANGE GET/companies UGH
