const { Card } = require("./models");

exports.create = (req, res) => {
  const total = req.body.cool + req.body.largeness + req.body.handsome;

  if (total > 25) {
    res.status(404).json({
      error:
        "This card is too powerful! The maximum total for the numerical parameters is 25.",
    });
  } else {
    Card.create(req.body).then((artist) => res.status(201).json(artist));
  }
};

exports.list = (req, res) => {
  Card.findAll().then((cards) => {
    res.status(200).json(cards);
  });
};
