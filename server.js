const express = require("express");

const app = express();
const port = 8080;
app.use(express.json());
const data = [
  { id: "id-1", name: "name-1", note: "note info 1" },
  { id: "id-2", name: "name-2", note: "note info 2" },
  { id: "id-3", name: "name-3", note: "note info 3" },
];
app.get("/notes", async (request, response) => {
  response.send(data);
});
app.post(
  "/notes",
  (request, response, next) => {
    console.log("Middleware test");
    next();
  },
  async (request, response) => {
    console.log(response.body);
    data.push(request.body);
    response.sendStatus(201);
  }
);

// path parameter
app.get("/notes/:noteId", async (request, response) => {
  console.log(request.params);
  const item = data.find((item) => {
    item.id == request.params.noteId;
  });
  response.send(item);
});
// query parameter
app.get("/notes", async (request, response) => {
  console.log(request.query);
  const { id } = request.query;
  if (!id) {
    response.send({});
  }
  const item = data.find((item) => {
    item.id == id;
  });
  response.send(item);
});

app.put("/user", (request, response) => {
  const { id, note, name } = request.body;
  // array findIndex 같은 id 탐색
  // 찾은 index 값을 가지고 원하는 데이터 변경
  if (!id) response.sendStatus(400);
  if (!note) response.sendStatus(400);
  if (!name) response.sendStatus(400);
  const idx = data.findIndex((item) => item.id === id);
  data[idx].name = body.name;
  data[idx].note = body.note;
  response.sendStatus(204);
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/hello", function (request, response) {
  response.send("Hello");
});
