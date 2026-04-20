const cors = require("cors");
const express = require("express");
const { flaschenpost } = require("flaschenpost");
const http = require("http");

const logger = flaschenpost.getLogger();

const api = express();
api.use(cors());

api.get("/", (request, response) => {
  response.json({
    now: Date.now(),
  });
});

const server = http.createServer(api);
const port = 3000;

server.listen(port, () => {
  logger.info(`Server listening on port ${port}.`);
});
