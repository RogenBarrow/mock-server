const displayXml = (req, res) => {
  res.status(200).send("OK");
  console.log(Date(), req.body);
};

module.exports = displayXml;
