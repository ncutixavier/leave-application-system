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

  it("Should get user by id", (done) => {
    request(app)
      .get(`/api/v1/users/${id}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("user");
        done();
      });
  });

  it("Should not get user by id when not found", (done) => {
    request(app)
      .get(`/api/v1/users/60b4e38dceb4a50015741ca6`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not get user by id when not exists", (done) => {
    request(app)
      .get(`/api/v1/users/343534`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should update user", (done) => {
    request(app)
      .patch(`/api/v1/users/${id}`)
      .send(userMock.userUpdate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("user");
        done();
      });
  });

  it("Should not update user when id not found", (done) => {
    request(app)
      .patch(`/api/v1/users/60b4e38dceb4a50015741ca6`)
      .send(userMock.userUpdate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not update user when id not exists", (done) => {
    request(app)
      .patch(`/api/v1/users/343534`)
      .send(userMock.userUpdate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should delete user", (done) => {
    request(app)
      .delete(`/api/v1/users/${id}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not delete user when id not found", (done) => {
    request(app)
      .delete(`/api/v1/users/60b4e38dceb4a50015741ca6`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not delete user when id not exists", (done) => {
    request(app)
      .delete(`/api/v1/users/343534`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should not login when email not found", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send(userMock.userEmailNotFound)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("Should not login when password not match", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send(userMock.userPasswordNotMatch)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

});
