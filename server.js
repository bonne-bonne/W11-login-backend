// Module Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

// Enable express
const app = express();

// Middlewares
app.use(cors());

// SQL connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// ===============================//
// API Endpoint
app.get("/", (req, res) => {
  res.send("Hey backend is running yoooooo~😉");
});

// API: USER Endpoint
// users Endpoint which retrieves the data from team_mate table
app.get("/users", (req, res) => {
  pool.query(`SELECT name, images FROM team_mate;`, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

// Port
const port = process.env.PORT;

app
  .listen(port, () => {
    console.log(`It's working yo, at http://localhost:${port}`);
  })
  .on("error", (error) => console.log(error));
