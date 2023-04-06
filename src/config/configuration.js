const config = {
  port: process.env.PORT || 5055,
  mockServer: process.env.MOCK_SERVER || "http://localhost:5056",
  alchemyBaseUrl: process.env.ALCHEMY_BASE_URL || "http://localhost",
};

module.exports = config;
