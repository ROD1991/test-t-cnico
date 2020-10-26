const request = require("supertest");

const app = require("../index");

// testing /api/delete/:nombre


describe("/api/delete/:nombre", () => {
    it("respond with 201 delete", (done) => {
      const data = {
        nombre: "Rod"
       
      };
      request(app) 
        .delete(`/api/delete/${data.nombre}`)
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