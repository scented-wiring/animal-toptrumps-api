const { Card } = require("./models");

exports.create = (req, res) => {
  const total = req.body.cool + req.body.largeness + req.body.handsome;

  if (total > 25) {
    res.status(404).json({
      error:
        "This card is too powerful! The maximum total for the numerical parameters is 25.",
    });
  } else {
    Card.create(req.body).then((card) => res.status(201).json(card));
  }
};

exports.list = (req, res) => {
  Card.findAll().then((cards) => {
    res.status(200).json(cards);
  });
};

exports.getCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByPk(cardId).then((card) => {
    if (!card) {
      res.status(404).json({ error: "Card not found!" });
    } else {
      res.status(200).json(card);
    }
  });
};

exports.updateCard = (req, res) => {
  const { cardId } = req.params;
  Card.update(req.body, { where: { id: cardId } }).then(([updatedCard]) => {
    if (!updatedCard) {
      res.status(404).json({ error: "Card not found!" });
    } else {
      res.status(200).json(updatedCard);
    }
  });
};

exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.destroy({ where: { id: cardId } }).then((deletedCard) => {
    if (!deletedCard) {
      res.status(404).json({ error: "Card not found!" });
    } else {
      res.status(204).json(deletedCard);
    }
  });
};

exports.deleteCards = (req, res) => {
  Card.destroy({ where: {} }).then((deletedCards) => {
    if (!deletedCards) {
      res.status(404).json({ error: "No cards found!" });
    } else {
      res.status(204).json({ success: "Cards deleted" });
    }
  });
};
