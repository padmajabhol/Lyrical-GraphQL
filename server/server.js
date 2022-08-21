const express = require("express");
const models = require("./models");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

// Replace with your mongoLab URI
const MONGO_PORT = 27017;
const MONGO_URI =
  "mongodb+srv://padmajabhol24:brveronica24@cluster0.xuf2cqt.mongodb.net/?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error("You must provide a MongoDB URI!");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  authSource: "admin",
  retryWrites: true,
  dbName: "graphql",
});
const db = mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
