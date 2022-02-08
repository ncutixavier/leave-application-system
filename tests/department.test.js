import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import departmentMock from "./mocks/departmentMock";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

describe("TEST DEPARTMENT ENDPOINT", () => {
  before(function (done) {
    mongoose.connect(process.env.TEST_DB, function () {
      mongoose.connection.db.dropDatabase(function () {
        done();
      });
    });
  });

  it("Should not create department when name is empty", (done) => {
    request(app)
      .post("/api/v1/departments")
      .send(departmentMock.nameEmpty)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not create department when supervisor name is empty", (done) => {
    request(app)
      .post("/api/v1/departments")
      .send(departmentMock.supervisorNameEmpty)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not create department when supervisor email is invalid", (done) => {
    request(app)
      .post("/api/v1/departments")
      .send(departmentMock.supervisorEmailInvalid)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should create department", (done) => {
    request(app)
      .post("/api/v1/departments")
      .send(departmentMock.create)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("department");
        done();
      });
  });

  it("Should get all departments", (done) => {
    request(app)
      .get("/api/v1/departments")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("departments");
        done();
      });
  });
});
