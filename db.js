/** Database connection for shopping list. */

const { Client } = require("pg"); //import Client Class from pg object
const { DB_URI } = require("./config"); //import DB_URI property from ./config.js

const client = new Client(DB_URI); //set client equal to a new instantiation of Client class with DB_URI passed in as arg

client.connect();//call connect method on this instantiation

module.exports = client; //export it so all can use it!