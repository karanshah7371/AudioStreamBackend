const express = require("express");
const path = require("path");
const { Station } = require("@fridgefm/radio-core");

const port = 3001;
const server = express();

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

server.listen(port, () => {
  console.log(`Starting on http://localhost:${port}`);
  station.start();
});

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./streamaudio.html"));
});
