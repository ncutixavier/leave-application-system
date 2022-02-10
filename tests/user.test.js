import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import userMock from "./mocks/userMock";
import departmentMock from "./mocks/departmentMock";
import Department from "../src/models/Department";
import User from "../src/models/User";
import app from "../src/app";
import "dotenv/config";
let user, id, department;
use(chaiHttp);

describe("TEST USERS ENDPOINT", () => {
  before(function (done) {
    mongoose.connect(process.env.TEST_DB, function () {
      mongoose.connection.db.dropDatabase(function () {
        done();
      });
    });
  });

  beforeEach(function (done) {
    user = new User(userMock.userExist);
    user.save();
    department = new Department(departmentMock.createExist);
    department.save().then(() => done());
    id = user._id.toString();
  });

  it("Should not register when email already exist", (done) => {
    request(app)
      .post("/api/v1/users/register")
      .send(userMock.userExist)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not register when department not found", (done) => {
    request(app)
      .post("/api/v1/users/register")
      .send(userMock.userDepNotFound)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should register new user", (done) => {
    request(app)
      .post("/api/v1/users/register")
      .send(userMock.userCreate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property("user");
        done();
      });
  });

  it("Should get all users", (done) => {
    request(app)
      .get("/api/v1/users")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("users");
        done();
      });
  });
  // it("Should not login", (done) => {
  //   request(app)
  //     .post("/api/v1/users/login")
  //     .send({
  //       email: "test",
  //       password: "test",
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(403);
  //       done();
  //     });
  // });
  // it("Should login", (done) => {
  //   request(app)
  //     .post("/api/v1/users/login")
  //     .send({
  //       email: "ncuti65@gmail.com",
  //       password: "Pass@123",
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(200);
  //       done();
  //     });
  // });
  // it("Should not register user when email exist", (done) => {
  //   request(app)
  //     .post("/api/v1/users/register")
  //     .send({
  //       username: "test",
  //       email: "ncuti65@gmail.com",
  //       password: "Pass@123",
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(409);
  //       done();
  //     });
  // });
});
