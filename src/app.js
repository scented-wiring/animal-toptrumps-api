const express = require("express");
const app = express();
app.use(express.json());

const controllers = require("./controllers");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.post("/cards", controllers.create);
app.get("/cards", controllers.list);
app.get("/cards/:cardId", controllers.getCardById);
app.patch("/cards/:cardId", controllers.updateCard);
app.delete("/cards/:cardId", controllers.deleteCard);

module.exports = app;
