import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;

let db;
let api;


const users = [
  {
    username: "user1",
    password: "test1",
    favourite :[], //602211
    watchlist :[],
  },
  {
    username: "user2",
    password: "test2",
    favourite :[],
    watchlist :[],
  },
];

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  // after(async () => {
  //   try {
  //     await db.dropDatabase();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });

  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 401 status with a invaild password", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "quill",
          password: "123456",
        })
        .expect(200)
        .end((err, res) => {
          console.log(res.body.msg);
          expect(res.body.msg).to.equal("Check your password format.");
        });
    });
    it("should return a 401 status with a right uername but a wrong password", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "user1",
          password: "test2",
        })
        .expect(401)
        .end((err, res) => {
          // console.log(res.body.msg);
          expect(res.body.msg).to.equal(undefined);
        });
    });

    it("should return a 201 status and create successfully", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .end((err,res) => {
          // console.log(res);
          expect(res.body.msg).to.equal("Successful created new user.");
        });
    });

      // after(() => {
      //   return request(api)
      //     .get("/api/users")
      //     .set("Accept", "application/json")
      //     .expect("Content-Type", /json/)
      //     .expect(200)
      //     .then((res) => {
      //       // expect(res.body).to.be.a("array");
      //       // expect(res.body.length).to.equal(3);
      //       let result = res.body.map((user) => user.username);
      //       console.log(result);
      //       expect(result).to.have.members(["user1", "user2", "user3"]);
      //     });
      // });
  });

  

});

describe("Users /favourite endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });


  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });

describe("GET /users/ username/favourites ", () => {
  it("should return the users favourites movies and a status 201", () => {
    request(api)
      .get(`/api/users/user1/favourites`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(0); 
      });
  });
});

//post a movie to favourites
describe("POST /users /username /favourites ", () => {
it("should return a 401 status with a already had movie id", () => {
  request(api)
    .post(`/api/users/user1/favourites`)//?action=register
    .send({
      id: "602211",
    });
    request(api)
    .post(`/api/users/user1/favourites`)//?action=register
    .send({
      id: "602211",
    })
    .expect(401);
    // .end((err, res) => {
    //  expect(res.body.msg).to.equal("This movie has been added");
});
it("should return a 201 status with a vaild movie id", () => {
  request(api)
    .post(`/api/users/user1/favourites`)
    .send({
      id: "729648",//sample _id "5ffccf054606a41fc7ca85d3
    })
    .expect(201);
      // expect(res.body).to.have.members([ "5ffccf054606a41fc7ca85d3"]);
    });
});



describe("GET /users/ username/watchlist ", () => {
it("should return the users watchlist movies and a status 200", () => {
  request(api)
    .get(`/api/users/user2/watchlist`)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201)
    .end((err, res) => {
      console.log(res.body.msg);
      expect(res.body).to.be.a("array");
      expect(res.body.length).to.equal(0); 
    });
});
});

//post a movie to watchlist
describe("POST /users /username /watchlist ", () => {
  it("should return a 401 status with a invaild movie id", () => {
    request(api)
      .post(`/api/users/user2/watchlist?action=register`)
      .send({
        id: "729648",
      });
      request(api)
      .post(`/api/users/user2/watchlist?action=register`)
      .send({
        id: "729648",
      })
      .expect(401);
      // .end((err, res) => {
      //   console.log(res.body.msg);
      //   expect(res.body.msg).to.equal("This movie has been added");
      });

  it("should return a 201 status with a vaild watchlist movie id", () => {
    request(api)
      .post(`/api/users/user2/watchlist?action=register`)
      .send({
        id: "602211",//sample movie id _id "5ffc57ac6243480c00f3d5e7"
      })
      .expect(201);
        // let result = res.body.map((watchlist) => watchlist._id);
        // console.log(result);
        // expect(res.body).to.have.members(["5ffc57ac6243480c00f3d5e7"]);
      });
  });
});