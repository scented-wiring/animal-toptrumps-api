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
      await expect(insertedArtistRecords.alignment).to.equal("Neutral Evil");
    });
  });
});
