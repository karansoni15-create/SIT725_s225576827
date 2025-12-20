const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Recipe API Tests", () => {

  it("should create a recipe with valid data", (done) => {
    chai.request(app)
      .post("/api/recipe")
      .send({ title: "Pasta", cookTime: 20 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.recipe.title).to.equal("Pasta");
        done();
      });
  });

  it("should return error for invalid recipe data", (done) => {
    chai.request(app)
      .post("/api/recipe")
      .send({ title: "", cookTime: -5 })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

});
