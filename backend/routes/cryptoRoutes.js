const express = require('express');
const router = express.Router();
const { fetchCryptoData, getLatestCryptoData } = require('../controllers/cryptoController');


router.get('/fetch', fetchCryptoData);


router.get('/latest', getLatestCryptoData);

module.exports = router;
