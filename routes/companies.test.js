process.env.NODE_ENV = "test";// this will set DB_URI to list-test

const request = require("supertest");//import supertest to make requests to server

const app = require("../app");
const db = require("../db");

