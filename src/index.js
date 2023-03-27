require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();
const { port, mockServer } = require("./config/configuration");

//middleware
app.use(bodyParser.text({ type: "application/xml" }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`
    Payment Test Server
    Running at: http://localhost:${port}
    Started at ${new Date().toLocaleString()} local time

    Test Endpoint: http://localhost:${port}/test
    Ping Endpoint: http://localhost:${port}/ping

    Configured Mock Server is: ${mockServer};
  `);
});
