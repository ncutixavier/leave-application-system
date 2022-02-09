import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import departmentMock from "./mocks/departmentMock";
import app from "../src/app";
import Department from "../src/models/Department";
import "dotenv/config";
let department, id;

use(chaiHttp);

describe("TEST DEPARTMENT ENDPOINT", () => {
  before(function (done) {
    mongoose.connect(process.env.TEST_DB, function () {
      mongoose.connection.db.dropDatabase(function () {
        done();
      });
    });
  });

  beforeEach(function (done) {
    department = new Department(departmentMock.createExist);
    department.save().then(() => done());
    id = department._id.toString();
  });

  it("should return home message", (done) => {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Leave APP API");
        done();
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

  it("Should get department by id", (done) => {
    request(app)
      .get(`/api/v1/departments/${id}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("department");
        done();
      });
  });

  it("Should not get department when id is invalid", (done) => {
    request(app)
      .get("/api/v1/departments/aastfd")
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should not get department when id is not found", (done) => {
    request(app)
      .get("/api/v1/departments/60b4e38dceb4a50015741ca6")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should not update department when id is invalid", (done) => {
    request(app)
      .patch("/api/v1/departments/3546436")
      .send(departmentMock.create)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should not update department when id is not found", (done) => {
    request(app)
      .patch("/api/v1/departments/60b4e38dceb4a50015741ca6")
      .send(departmentMock.create)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should update department", (done) => {
    request(app)
      .patch(`/api/v1/departments/${id}`)
      .send(departmentMock.create)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("department");
        done();
      });
  });

  it("Should not delete department when id is invalid", (done) => {
    request(app)
      .delete("/api/v1/departments/3546436")
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should not delete department when id is not found", (done) => {
    request(app)
      .delete("/api/v1/departments/60b4e38dceb4a50015741ca6")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property("error");
        done();
      });
  });
});

describe("TEST OTHER DEPARTMENT ENDPOINT", () => {
  it("Should not create department when name is exist", (done) => {
    request(app)
      .post("/api/v1/departments")
      .send(departmentMock.create)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Should delete department", (done) => {
    request(app)
      .delete(`/api/v1/departments/${id}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
