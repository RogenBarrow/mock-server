const path = require("node:path");
const fs = require("node:fs/promises");
const axios = require("axios");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const builder = new XMLBuilder();

// XML Parser Config
const parser = new XMLParser({ ignoreDeclaration: true });

// Axios Configuration
const config = { headers: { "Content-Type": "text/xml", Accept: "*/*" } };

// Mock Server Configuration
const { alchemyBaseUrl } = require("../config/configuration");
const { post } = require("../router");

const payTest = async (req, res) => {
  const currentDate = new Date().toLocaleString();

  let type;
  type = req.body.type;
  const id = req.body.tranid;
  if (!type) type = "1";

  try {
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, `START`);
    // XML File path
    const xmlFilePath = path.join(__dirname, `../paymentsinfo/payType${type}.xml`);

    // const options = {
    //   ignoreAttributes: false,
    //   attributeNamePrefix: "",
    // };

    // read XML Data into variable and convert to JSON and back to XML
    const xmlData = await fs.readFile(xmlFilePath, { encoding: "utf8" });
    //console.log(xmlData);
    const convertedData = parser.parse(xmlData);
    console.log(convertedData);
    // Update the value of tranid
    convertedData.request.tranid = id;

    // Convert the updated JSON object back to XML
    const updatedXML = builder.build(convertedData);
    console.log("updated:", updatedXML);

    // Post the XML data to the server
    console.log(alchemyBaseUrl);
    const result = await axios.post(
      `${alchemyBaseUrl}/request/reqtype/1`,
      { data: xmlData },
      config
    );
    console.log("Response - ", result.data);

    // Respond to Server
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, "OK");
    res.status(200).send("Test Completed");
  } catch (err) {
    console.error("PAYTEST -", currentDate, `${err}`, "ERROR");
  }
};

module.exports = payTest;
