process.env.NODE_ENV = "test";// this will set DB_URI to list-test

const request = require("supertest");//import supertest to make requests to server

const app = require("../app");
const db = require("../db");

//need a beforeEach, afterEach and afterAll

let company;

beforeEach(async() => {
    const resp = await request(app).post(`/companies`).send({code: 'pizza', name: 'Pizza Co.', description: 'The best pizza in the world.'});
    company = resp.body["company"];
})

afterEach(async() => {
    db.query(`DELETE FROM companies`);
})

afterAll(async() => {
    await db.end();
})

//get

describe("GET /companies", () => {
    test("returns a list of all companies", async() => {
        const resp = await request(app).get(`/companies`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body[0]).toEqual(company);
    })
})

//get by code

describe("GET /companies/:code", () => {
    test("returns company by code", async() => {
        const resp = await request(app).get(`/companies/${company.code}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({company: company});
    })

    test("returns 404 on bad code", async() => {
        const resp = await request(app).get(`/companies/blah`);
        expect(resp.statusCode).toBe(404);
    })

})

//post
describe("POST /companies", () => {
    test("adds new company and returns it", async() => {
        const newCompany = {code:"maria", name:"Maria Co.", description:"We make candy."};
        const resp = await request(app).post(`/companies`).send(newCompany);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({company: newCompany});

        const getCoResp = await request(app).get(`/companies/${newCompany.code}`);
        expect(getCoResp.body).toEqual({company: newCompany});
    })
})

//put
describe("PUT /companies/:code", () => {
    test("selects and updates company", async() => {
        const updates = {name:"Maria Co.", description:"We make candy."};
        const resp = await request(app).put(`/companies/${company.code}`).send(updates);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({company: {code: "pizza", name:"Maria Co.", description:"We make candy."}});

        const getCoResp = await request(app).get(`/companies/${company.code}`);
        expect(resp.body).toEqual({company: {code: "pizza", name:"Maria Co.", description:"We make candy."}});
    })

    test("returns 404 with bad code", async() => {
        const resp = await request(app).put(`/companies/blah`).send("nope");
        expect(resp.statusCode).toBe(404);
    })
})

//delete

describe("DELETE /companies/:code", () => {
    test("deletes one company by code", async() => {
        const resp = await request(app).delete(`/companies/${company.code}`);
        expect(resp.statusCode).toBe(202);
        expect(resp.body).toEqual({status: "deleted"});
    })
})