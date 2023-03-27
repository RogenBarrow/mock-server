const path = require("node:path");
const fs = require("node:fs/promises");
const axios = require("axios");
const XMLParser = require("fast-xml-parser").XMLParser;

// XML Parser Config
const parser = new XMLParser({ ignoreDeclaration: true });

// Axios Configuration
const config = { headers: { "Content-Type": "application/xml" } };

// Mock Server Configuration
const { mockServer } = require("../config/configuration");

const payTest = async (req, res) => {
  const currentDate = new Date().toLocaleString();

  let type;
  type = req.body.type;
  if (!type) type = "1";

  try {
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, `START`);
    // XML File path
    const xmlFilePath = path.join(__dirname, `../paymentsinfo/payType${type}.xml`);

    // read XML Data into variable
    const xmlData = await fs.readFile(xmlFilePath, { encoding: "utf8" });

    // Post the XML data to the server
    await axios.post(`${mockServer}/listen`, { data: xmlData }, config);

    // Respond to Server
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, "OK");
    res.status(200).send("Test Completed");
  } catch (err) {
    console.error("PAYTEST -", currentDate, `${err}`, "ERROR");
  }
};

module.exports = payTest;
