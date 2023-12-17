const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 8080;

const pool = new Pool({
  user: "jinho",
  host: "localhost",
  database: "goldmoon",
  password: "postgres",
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT $1::text as message", [
      "연결성공!",
    ]);
    const message = result.rows[0].message;
    res.send(message);
    client.release();
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/hello", function (request, response) {
  response.send("Hello");
});
