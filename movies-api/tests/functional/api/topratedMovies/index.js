import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api;
let token;

const sampleMovie = {
  id: 696374,
  title: "Gabriel's Inferno",
};

describe("topratedMovies endpoint", () => {
  beforeEach(function(done) {
    this.timeout(6000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res) =>{
        token= res.body.token;
        done();
      });
    },4000)
  });

  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /toprated ", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/toprated")
        .set("Accept", "application/json")
        .set("Authorization",token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /toprated/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching toprated movie", () => {
        return request(api)
          .get(`/api/toprated/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/toprated/xxx")
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect({
            success: false,
            status_code: 34,
            status_message: "The resource you requested could not be found.",
          });
      });
    });
  });
});
