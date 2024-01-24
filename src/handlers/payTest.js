const path = require("node:path");
const fs = require("node:fs/promises");
const axios = require("axios");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const builder = new XMLBuilder();
const pug = require("pug");
// const compiledFunction = pug.compileFile("./src/payments/html.pug");

// XML Parser Config
const parser = new XMLParser({ ignoreDeclaration: true });

// Axios Configuration
const config = { headers: { "Content-Type": "text/xml", Accept: "*/*" } };

// Mock Server Configuration
const { alchemyBaseUrl } = require("../config/configuration");
const { post } = require("../router");

const payTest = async (req, res) => {
  const currentDate = new Date().toLocaleString();

  console.log("This comes in the request: ", req.body);

  let type;
  type = req.body.type;
  //request type
  const id = req.body.tranid;
  console.log("this is to check the ID: ", id);
  const date = req.body.date;
  //from account
  const account = req.body.account;
  const name = req.body.name;
  const branch = req.body.branch;
  const accCurency = req.body.currency;
  //transaction information
  const currency = req.body.tranCurrency;
  const amount = req.body.tranAmount;
  //beneficiery information
  const benAccount = req.body.benAccount;
  const benName = req.body.benName;
  const benAddress = req.body.benAddress;
  const benCity = req.body.benCity;
  const benCountry = req.body.benCountry;
  //bank info
  const bicCode = req.body.biccode;
  const bankName = req.body.bankname;
  //charges1
  const charName1 = req.body.charName1;
  const charAmount1 = req.body.charAmount1;
  const charpercent1 = req.body.charPercent1;
  const charCurrency1 = req.body.charCurrency1;
  const chartaxind1 = req.body.charTaxind1;
  const chartaxappl1 = req.body.charTaxappl1;
  //charges2
  const charName2 = req.body.charName2;
  const charAmount2 = req.body.charAmount2;
  const charpercent2 = req.body.charPercent2;
  const charCurrency2 = req.body.charCurrency2;
  const chartaxind2 = req.body.charTaxind2;
  const chartaxappl2 = req.body.charTaxappl2;
  //charges3
  const charName3 = req.body.charName3;
  const charAmount3 = req.body.charAmount3;
  const charpercent3 = req.body.charPercent3;
  const charCurrency3 = req.body.charCurrency3;
  const chartaxind3 = req.body.charTaxind3;
  const chartaxappl3 = req.body.charTaxappl3;
  //response
  const status = req.body.status;
  const description = req.body.description;

  if (!type) type = "1";

  const msgArray = [];

  try {
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, `START`);
    msgArray.push("PAYTEST -", currentDate, `payType${type}.xml`, `START`);
    // XML File path
    const xmlFilePath = path.join(__dirname, `../paymentsinfo/payType${type}.xml`);

    // read XML Data into variable and convert to JSON and back to XML
    const xmlData = await fs.readFile(xmlFilePath, { encoding: "utf8" });
    console.log(xmlData);
    const convertedData = parser.parse(xmlData);

    console.log(convertedData);
    let dataRequest = convertedData.request;
    // Update the value of tranid
    dataRequest = {
      ...dataRequest,
      tranid: id || dataRequest.tranid,
      date: date || dataRequest.date,
    };
    // convertedData.request.tranid = id;
    // convertedData.request.date = date;

    //from account
    dataRequest = {
      ...dataRequest,
      fromacctinfo: {
        ...dataRequest.fromacctinfo,
        account: account || dataRequest.fromacctinfo.account,
        name: name || dataRequest.fromacctinfo.name,
        branch: branch || dataRequest.fromacctinfo.branch,
        currency: accCurency || dataRequest.fromacctinfo.branch,
      },
    };
    // convertedData.request.fromacctinfo.account = account;
    // convertedData.request.fromacctinfo.name = name;

    //transaction information
    dataRequest = {
      ...dataRequest,
      traninfo: {
        ...dataRequest.traninfo,
        currency: currency || dataRequest.traninfo.currency,
        amount: amount || dataRequest.traninfo.amount,
      },
    };

    //transaction information
    dataRequest = {
      ...dataRequest,
      benebankinfo: {
        ...dataRequest.benebankinfo,
        biccode: bicCode || dataRequest.benebankinfo.biccode,
        name: bankName || dataRequest.benebankinfo.name,
      },
    };

    // convertedData.request.traninfo.currency = currency;
    // convertedData.request.traninfo.amount = amount;

    //beneficiery information

    dataRequest = {
      ...dataRequest,
      beneinfo: {
        ...dataRequest.beneinfo,
        account: benAccount || dataRequest.beneinfo.account,
        address: benAddress || dataRequest.beneinfo.address,
        name: benName || dataRequest.beneinfo.name,
        city: benCity || dataRequest.beneinfo.city,
        country: benCountry || dataRequest.beneinfo.country,
      },
    };

    // convertedData.request.beneinfo.account = benAccount;
    // convertedData.request.beneinfo.name = benName;
    // convertedData.request.beneinfo.address = benAddress;
    // convertedData.request.beneinfo.city = benCity;
    // convertedData.request.beneinfo.country = benCountry;

    //charges1

    dataRequest = {
      ...dataRequest,
      charge1: {
        ...dataRequest.charge1,
        name: charName1 || dataRequest.charge1.name,
        amount: charAmount1 || dataRequest.charge1.amount,
        percent: charpercent1 || dataRequest.charge1.charpercent1,
        currency: charCurrency1 || dataRequest.charge1.currency,
        taxind: chartaxind1 || dataRequest.charge1.chartaxind1,
        taxappl: chartaxappl1 || dataRequest.charge1.chartaxappl1,
      },
    };

    // convertedData.request.charge1.name = charName1;
    // convertedData.request.charge1.amount = charAmount1;
    // convertedData.request.charge1.percent = charpercent1;
    // convertedData.request.charge1.currency = charCurrency1;
    // convertedData.request.charge1.taxind = chartaxind1;
    // convertedData.request.charge1.taxappl = chartaxappl1;

    //charges2
    dataRequest = {
      ...dataRequest,
      charge2: {
        ...dataRequest.charge2,
        name: charName2 || dataRequest.charge2.name,
        amount: charAmount2 || dataRequest.charge2.amount,
        percent: charpercent2 || dataRequest.charge2.charpercent2,
        currency: charCurrency2 || dataRequest.charge2.currency,
        taxind: chartaxind2 || dataRequest.charge2.chartaxind2,
        taxappl: chartaxappl2 || dataRequest.charge2.chartaxappl2,
      },
    };

    // convertedData.request.charge2.name = charName2;
    // convertedData.request.charge2.amount = charAmount2;
    // convertedData.request.charge2.percent = charpercent2;
    // convertedData.request.charge2.currency = charCurrency2;
    // convertedData.request.charge2.taxind = chartaxind2;
    // convertedData.request.charge2.taxappl = chartaxappl2;
    //charges3

    dataRequest = {
      ...dataRequest,
      charge3: {
        ...dataRequest.charge3,
        name: charName3 || dataRequest.charge3.name,
        amount: charAmount3 || dataRequest.charge3.amount,
        percent: charpercent3 || dataRequest.charge3.charpercent3,
        currency: charCurrency3 || dataRequest.charge3.currency,
        taxind: chartaxind3 || dataRequest.charge3.chartaxind3,
        taxappl: chartaxappl3 || dataRequest.charge3.chartaxappl3,
      },
    };

    dataRequest = {
      ...dataRequest,
      tranid: id || dataRequest.tranid,
      status: status || dataRequest.status,
      description: description || dataRequest.description,
    };

    // convertedData.request.charge3.name = charName3;
    // convertedData.request.charge3.amount = charAmount3;
    // convertedData.request.charge3.percent = charpercent3;
    // convertedData.request.charge3.currency = charCurrency3;
    // convertedData.request.charge3.taxind = chartaxind3;
    // convertedData.request.charge3.taxappl = chartaxappl3;

    // ReUnite request object
    convertedData.request = dataRequest;
    // Convert the updated JSON object back to XML
    const updatedXML = `<?xml version="1.0" encoding="UTF-8"?>${builder.build(convertedData)}`;
    const jsonXml = parser.parse(updatedXML);
    console.log("updated:", updatedXML);
    msgArray.push("updated:", JSON.stringify(convertedData));

    // Remove updatedXML property from the request object
    delete req.body.updatedXML;

    // Post the XML data to the server
    console.log(alchemyBaseUrl);
    const result = await axios.post(`${alchemyBaseUrl}/request/reqtype/1`, updatedXML, config);
    console.log("Response - ", result.data);
    msgArray.push("Response - ", result.data);

    // Respond to Server
    console.log("PAYTEST -", currentDate, `payType${type}.xml`, "OK");
    msgArray.push("PAYTEST -", currentDate, `payType${type}.xml`, "OK");
    console.log("this is in the array: - ", msgArray);

    // render
    const compiledFunction = pug.compileFile(path.join(__dirname, "./src/payments/html.pug"));
    return res.status(200).send(compiledFunction({ msgArray }));
  } catch (err) {
    console.error("What is the error: ", err);
    console.error("PAYTEST -", currentDate, `${err}`, "ERROR");
    msgArray.push("PAYTEST -", currentDate, `${err}`, "ERROR");
    res.status(500).send("Test err");
  }
};

module.exports = payTest;
