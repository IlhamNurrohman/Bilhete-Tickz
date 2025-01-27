require("dotenv").config();

// express
const express = require("express");
const cors = require("cors");
const app = express();

// connect
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");

// middleware
const logger = require("morgan");

const init = async () => {
  try {
    // connect
    await db.connect();
    // info connect
    console.log("Database Conected");
    //  middlware
    if (process.env.STATUS_APP !== "production") {
      app.use(
        logger(":method :url :status :res[content-length] - :response-time ms")
      );
    }
    //  body payload
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    //   cors
    const corsOptions = {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));
    app.use(mainRouter);
    app.listen(process.env.PORT, () => {
      console.log(`Server is Running at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// apps
init();
