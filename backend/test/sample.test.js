const request = require("supertest");

const app = require("../index");

// testing /api/save

describe("POST /api/save", () => {
  it("respond with 201 created", (done) => {
    const data = {
      nombre: "Rod",
      edad: "29",
    };
    request(app)
      .post("/api/save")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});

// testing api/list

describe("GET /api/list", () => {
  it(" list of all users", (done) => {
    request(app)
      .get("/api/list")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

   
   

 
 
