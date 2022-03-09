const express = require("express");
const path = require("path");
const { Station } = require("@fridgefm/radio-core");

const server = express();

server.use(express.static("public"));

const station = new Station({
  verbose: true,
  responseHeaders: {
    cool_instrumental: "Rinkiyakepapa",
  },
});

station.addFolder("./music");

// main stream route
server.get("/stream", (req, res) => {
  station.connectListener(req, res);
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Starting on http://localhost:${process.env.PORT || 3000}`);
  station.start();
});

server.get("/", (req, res) => {
  res.send(" ");
});
