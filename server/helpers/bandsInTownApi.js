const axios = require('axios');

const bandsInAxios = axios.create({
  baseURL: 'https://rest.bandsintown.com'
});

module.exports = bandsInAxios;