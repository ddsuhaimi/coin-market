const axios = require("axios");
const config = require("./config");

const cmBaseUrl = "https://pro-api.coinmarketcap.com/v1/";
const cmAxios = axios.create({
  baseURL: cmBaseUrl,
  headers: { "X-CMC_PRO_API_KEY": config.cm.apiKey },
});

module.exports = cmAxios;
