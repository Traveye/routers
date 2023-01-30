const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const path = require("path");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  readFromFile(path.join(__dirname, "../db/diagnostics.json")).then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const content = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: req.body.errors
  }
  console.log(content)
  readAndAppend(content, path.join(__dirname, "../db/diagnostics.json"));
});

module.exports = diagnostics;
