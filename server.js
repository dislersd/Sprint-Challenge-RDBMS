const express = require("express");
const server = express();
const projectsRouter = require("./routers/projects-router.js");
const actionsRouter = require("./routers/actions-router.js");

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = server;
