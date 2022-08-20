import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import routes from "./routes/index.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3005;
const mode = process.env.NODE_ENV || "development";

try {
  if (mode === "development") {
    mongoose
      .connect(process.env.DEVELOPMENT_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("DEV DB CONNECTED");
      });
  } else if (mode === "test") {
    mongoose
      .connect(process.env.TEST_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("TEST DB CONNECTED");
      });
  } else if (mode === "production") {
    mongoose
      .connect(process.env.PRODUCTION_DB, { useNewUrlParser: true })
      .then((res) => {
        console.log("PROD DB CONNECTED");
      });
  }
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Leave APP API" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/", routes);
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

process.on("exit", function (code) {
  return console.log(`Process to exit with code ${code}`);
});

export default app;
