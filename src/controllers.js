const { Card } = require("./models");

exports.create = (req, res) => {
  Card.create(req.body).then((artist) => res.status(201).json(artist));
};
