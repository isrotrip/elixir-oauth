const router = require('express').Router();
const BandController = require('../controllers/band.js');
const authentication = require('../middlewares/authentication');

router.get('/', authentication, BandController.getBands);

module.exports = router;