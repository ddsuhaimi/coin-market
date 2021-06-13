require("dotenv").config();
const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT),
  },
  db: {
    uri: process.env.DEV_DB_URI,
  },
  jwt: {
    secret: process.env.PROD_JWT_SECRET,
  },
  cm: {
    apiKey: process.env.DEV_COIN_MARKET_API_KEY,
  },
};

const production = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT),
  },
  db: {
    uri: process.env.PROD_DB_URI,
  },
  jwt: {
    secret: process.env.PROD_JWT_SECRET,
  },
  cm: {
    apiKey: process.env.PROD_COIN_MARKET_API_KEY,
  },
};

const config = {
  development: { ...development, isProduction: process.env.NODE_ENV === "production" },
  production: { ...production, isProduction: process.env.NODE_ENV === "production" },
};

module.exports = config[env];
