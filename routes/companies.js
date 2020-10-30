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

module.exports = router;