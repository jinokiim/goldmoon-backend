const express = require("express");

const app = express();
const port = 8080;
app.use(express.json());
const data = [
  { id: "id-1", name: "name-1", note: "note info 1" },
  { id: "id-2", name: "name-2", note: "note info 2" },
  { id: "id-3", name: "name-3", note: "note info 3" },
];
app.get("/notes", async (req, res) => {
  res.send(data);
});
app.post(
  "/notes",
  (req, res, next) => {
    console.log("Middleware test");
    next();
  },
  async (req, res) => {
    console.log(res.body);
    data.push(req.body);
    res.sendStatus(201);
  }
);

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/hello", function (request, response) {
  response.send("Hello");
});
