const express = require("express");
const router = express.Router();

//handlers
const ping = require("./handlers/ping");
const displayXml = require("./handlers/displayxml");
const payTest = require("./handlers/payTest");

// General Endpoints
router.post("/postxml", (req, res) => displayXml(req, res));

// Testing Endpoints
router.get("/ping", (req, res) => ping(req, res));
router.post("/ping", (req, res) => ping(req, res));
router.get("/test", (req, res) => payTest(req, res));
router.post("/test", (req, res) => payTest(req, res));

module.exports = router;
