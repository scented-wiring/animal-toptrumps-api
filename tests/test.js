const { expect } = require("chai");
const request = require("supertest");
const { Card } = require("../src/models");
const app = require("../src/app");

describe("/cards", () => {
  before(async () => {
    try {
      await Card.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Card.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /cards", () => {
    it("creates a new card in the database", async () => {
      const response = await request(app).post("/cards").send({
        name: "Snake",
        aka: "Long lad",
        cool: 8,
        largeness: 3,
        handsome: 6,
        alignment: "Neutral Evil",
      });

      await expect(response.status).to.equal(201);
      await expect(response.body.name).to.equal("Snake");

      const insertedArtistRecords = await Card.findByPk(response.body.id, {
        raw: true,
      });
      await expect(insertedArtistRecords.name).to.equal("Snake");
      await expect(insertedArtistRecords.aka).to.equal("Long lad");
      await expect(insertedArtistRecords.cool).to.equal(8);
      await expect(insertedArtistRecords.largeness).to.equal(3);
      await expect(insertedArtistRecords.handsome).to.equal(6);
      await expect(insertedArtistRecords.alignment).to.equal("Neutral Evil");
    });
  });

  describe("with cards in the database", () => {
    let cards;
    beforeEach((done) => {
      Promise.all([
        Card.create({
          name: "Snake",
          aka: "Long lad",
          cool: 8,
          largeness: 3,
          handsome: 6,
          alignment: "Neutral Evil",
        }),
        Card.create({
          name: "Dog",
          aka: "Hairy friend",
          cool: 6,
          largeness: 6,
          handsome: 10,
          alignment: "Lawful Good",
        }),
        Card.create({
          name: "Weevil",
          aka: "Lil' bastard",
          cool: 1,
          largeness: 0,
          handsome: 0,
          alignment: "Chaotic Weevil",
        }),
      ]).then((data) => {
        cards = data;
        done();
      });
    });

    describe("GET /cards", () => {
      it("gets all card data", (done) => {
        request(app)
          .get("/cards")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((card) => {
              const expected = cards.find((a) => a.id === card.id);
              expect(card.name).to.equal(expected.name);
              expect(card.aka).to.equal(expected.aka);
              expect(card.cool).to.equal(expected.cool);
              expect(card.largeness).to.equal(expected.largeness);
              expect(card.handsome).to.equal(expected.handsome);
              expect(card.alignment).to.equal(expected.alignment);
            });
            done();
          });
      });
    });
  });
});
