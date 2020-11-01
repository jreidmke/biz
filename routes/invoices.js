//hey let's do some routing
const express = require("express");
const router = express.Router();
const ExpressError = require('../expressError');
const db = require("../db");
const slugify = require("slugify");

//alright, let's check those routes


//GET /invoices returns {invoices: {id, comp_code}, {id, comp_code}};
router.get('/', async(req, res, next) => {
    try {
        const resp = await db.query(
            `SELECT * FROM invoices`
        );
        return res.json(resp.rows);
    } catch (error) {
        return next(error);
    }
})

//GET /inovices/id returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const resp = await db.query(
            `SELECT * FROM invoices
            WHERE id=$1
            `, [id]);
        if(resp.rows.length === 0) {
            throw new ExpressError("Invalid Invoice ID", 404);
        }
        return res.json({invoice: resp.rows[0]});
    } catch (error) {
        return next(error);
    }
})

//POST /invoices takes in {comp_code, amt} and RETURNS {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post('/', async(req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const resp = await db.query(`
        INSERT INTO invoices
        (comp_code, amt)
        VALUES($1, $2)
        RETURNING id, comp_code, amt, paid, add_date, paid_date
        `, [comp_code, amt]);
        return res.status(201).json({invoice: resp.rows[0]});
    } catch (error) {
        return next(error);
    }
})

//PUT /invoices/id updates by id. Takes in {amt, paid(bool)}, RETURNS {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
//Allow payment of invoices.
//if paying unpaid invoice:
    //set paid_date to today
//if un-paying:
    //set paid_date to null
//if no change:
    //keep current paid date

//DELETE /invoices/id RETURNS {status: "deleted"}

//LOOKS LIKE YOU"LL NEED TO CHANGE GET/companies UGH

module.exports = router;