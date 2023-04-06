const config = {
  port: process.env.PORT || 5055,
  mockServer: process.env.MOCK_SERVER || "http://10.10.210.119:5055",
  alchemyBaseUrl: process.env.ALCHEMY_BASE_URL || "http://localhost",
};

module.exports = config;
