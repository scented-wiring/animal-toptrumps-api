const express = require("express");
const app = express();
app.use(express.json());

const controllers = require("./controllers");

app.post("/cards", controllers.create);

module.exports = app;
