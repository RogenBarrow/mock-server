const express = require('express');
const router = express.Router();

//handlers
const ping = require('./handlers/ping');
const displayXml = require('./handlers/displayxml')

//endpoint
router.get('/ping', (req, res) => ping(req, res))
router.post('/postxml', (req, res) => displayXml(req, res));


module.exports = router;
