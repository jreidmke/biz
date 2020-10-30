const express = require("express");
const router = express.Router();

const db = require("../db");

const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try {
        return res.send("PIZZA")
    } catch (error) {
        return next(error);
    }
})

router.get('/:code', async(req, res, next) => {
    try {
        //try to retrieve a company
        //return this {company: {code, name, description}}
    } catch (error) {
        return next(error);
    }
})

router.post('/', async(req, res, next) => {
    try {
        //try to post a new company
        //return this {company: {code, name, description}}
    } catch (error) {
        return next(error);
    }
})

router.put('/:code', async(req, res, next) => {
    try {
        //takes in json like {name, description}
        //you can't change the code!!!!
        //returns {company: {code, name, description}}
    } catch (error) {
        return next(error);
    }
})

router.delete('/:code', async(req, res, next) => {
    try {
        //tries to delete a company
        //returns {status: "deleted"}
    } catch (error) {
        return next(error);
    }
})

module.exports = router;