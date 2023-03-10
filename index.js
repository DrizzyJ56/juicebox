const express = require("express");
const server = express();
require("dotenv").config();
const { client } = require("./db");
const PORT = 3000;

client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

const morgan = require("morgan");
server.use(morgan("dev"));

const cors = require("cors");
server.use(cors()); 

server.use(express.json());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);
