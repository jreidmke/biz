const express = require("express");
const router = express.Router();
const db = require("../db");
const slugify = require("slugify");
const ExpressError = require("../expressError");

//hey!!! you're going to have to comeback here and update this.
//so well need to add TWO JOINS.

//we'll need to return an INVOICES ARRAY and a INDUSTRY ARRAY
router.get('/', async (req, res, next) => {
    try {
        const resp = await db.query(`
        SELECT * FROM companies;
        `);
        return res.json(resp.rows);
    } catch (error) {
        return next(error);
    }
})

router.get('/:code', async(req, res, next) => {
    try {
        //try to retrieve a company
        const resp = await db.query(`
        SELECT * FROM companies
        WHERE code=$1
        `, [req.params.code]);
        if(resp.rows.length === 0) {
            throw new ExpressError("Invalid Company Code", 404);
        }
        return res.json({company: resp.rows[0]});
        //return this {company: {code, name, description}}
    } catch (error) {
        return next(error);
    }
})

//come back to change this route and add sluggify library.
router.post('/', async(req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const resp = await db.query(`
        INSERT INTO companies
        VALUES($1, $2, $3)
        RETURNING code, name, description
        `, [code, name, description]);
        return res.status(201).json({company: resp.rows[0]});
    } catch (error) {
        return next(error);
    }
})

router.put('/:code', async(req, res, next) => {
    try {
        const { name, description } = req.body;
        //takes in json like {name, description}
        //you can't change the code!!!!
        const resp = await db.query(`
        UPDATE companies
        SET name=$1, description=$2
        WHERE code=$3
        RETURNING code, name, description
        `, [name, description, req.params.code]);
        if(resp.rows.length === 0) {
            throw new ExpressError("Invalid Company Code", 404);
        }
        return res.status(200).json({company: resp.rows[0]});
        //returns {company: {code, name, description}}
    } catch (error) {
        return next(error);
    }
})

router.delete('/:code', async(req, res, next) => {
    try {
        await db.query(`
        DELETE FROM companies
        WHERE code=$1
        `, [req.params.code]);
        return res.status(202).json({status: "deleted"});
    } catch (error) {
        return next(error);
    }
})

module.exports = router;