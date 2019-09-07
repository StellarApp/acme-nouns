const express = require("express");
const db = require("./db");
const path = require("path");
const app = express();
const PORT = 3000;

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/people", async (req, res, next) => {
  try {
    const result = await db.models.People.findAll();
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/places", async (req, res, next) => {
  try {
    res.send(await db.models.Places.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/things", async (req, res, next) => {
  try {
    res.send(await db.models.Things.findAll());
  } catch (ex) {
    next(ex);
  }
});

db.syncAndSeed().then(
  app.listen(PORT, () => console.log(`listening port ${PORT}`))
);
