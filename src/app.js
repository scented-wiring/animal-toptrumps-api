const express = require("express");
const app = express();
app.use(express.json());

const controllers = require("./controllers");

app.post("/cards", controllers.create);
app.get("/cards", controllers.list);
app.get("/cards/:cardId", controllers.getCardById);
app.patch("/cards/:cardId", controllers.updateCard);

module.exports = app;
