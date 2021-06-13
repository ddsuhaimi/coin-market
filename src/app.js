const express = require("express");
const logger = require("./config/logger");
const mongoose = require("mongoose");
const config = require("./config/config");

const app = express();

addMiddlewares(app);
addRoutes(app);
addDatabase(app);

async function addDatabase(app) {
  try {
    const db = await mongoose.connect(config.db.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (!config.isProduction) {
      mongoose.set("debug", true);
    }
    if (db) {
      logger.info("MongoDB connected");
    }
  } catch (error) {
    logger.error("MongoDb connection failed");
    logger.error(`Error: ${error}`);
  }
}

function addRoutes(app) {
  app.use("/api", require("./routes/api"));
}

function addMiddlewares(app) {
  const middlewares = [express.json(), express.urlencoded({ extended: true })];

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
}

module.exports = app;
