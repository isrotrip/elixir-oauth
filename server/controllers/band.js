const bandAxios = require('../helpers/bandsInTownApi.js');

class BandController {
  static getBands(req, res, next) {
    bandAxios
      .get('/artists/arnold', {
        params: {
          app_id: 1
        }
      })
      .then(result => {
        const { data } = result;
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = BandController;