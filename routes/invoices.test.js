process.env.NODE_ENV = "test";// this will set DB_URI to list-test

const request = require("supertest");//import supertest to make requests to server

const app = require("../app");
const db = require("../db");

let invoice;

beforeEach(async() => {
    //create company
    await request(app).post(`/companies`).send({code: 'candy', name: 'Candy Co.', description: 'The best candy in the world.'});
    const resp = await request(app).post(`/invoices`).send({comp_code:'candy', amt: 25.99, paid: true});
    invoice = resp.body["invoice"];
})

afterEach(async() => {
    await db.query(`DELETE FROM invoices`);
    await db.query(`DELETE FROM companies`);
})

afterAll(async() => {
    await db.end();
})

describe("GET /invoices", () => {
    test("Returns all invoices", async () => {
        const resp = await request(app).get(`/invoices`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body[0]).toEqual(invoice);
    })
})

describe("GET /invoices/:id", () => {
    test("Returns specific invoice", async () => {
        const resp = await request(app).get(`/invoices/${invoice.id}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body["invoice"]).toEqual(invoice);
    })

    test("Returns 404 with invalid id", async () => {
        const resp = await request(app).get(`/invoices/678`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("POST /invoices", () => {
    test("Posts new invoice", async() => {
        const newInvoice = {comp_code: 'candy', amt: 80};
        const resp = await request(app).post(`/invoices`).send(newInvoice);
        expect(resp.statusCode).toBe(201);
        const invoice = resp.body['invoice'];
        const invoiceResp = await request(app).get(`/invoices/${invoice.id}`);
        expect(invoiceResp.body['invoice']).toEqual(invoice);
    })
})

describe("DELETE /invoices/:id", () => {
    test("Deletes invoice by id", async () => {
        const resp = await request(app).delete(`/invoices/${invoice.id}`);
        expect(resp.statusCode).toBe(202);
        expect(resp.body).toEqual({status: "deleted"});
    })
})
