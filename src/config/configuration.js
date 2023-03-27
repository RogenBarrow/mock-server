const config = {
  port: process.env.PORT || 5055,
  mockServer: process.env.MOCK_SERVER || "http://localhost:5056",
};

module.exports = config;
