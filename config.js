// Config database uri.

let baseURL = `postgresql://postgres:postgres4@localhost/`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${baseURL}biz-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${baseURL}biz`;
}

module.exports = { DB_URI }; //export so all can use

//Also, this is a good place to put things like bcrypt work factor

//Or process.env variables.
