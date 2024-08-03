const axios = require('axios');
const Crypto = require('../model/crypto');

// const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
// const apiKey = 'CG-uL4NNEdbzUBuVCJFYYxY1KbT'; // Replace with your actual API key

const fetchCryptoData = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {
            params: {
                vs_currency: 'usd'
                // ids: 'bitcoin,ethereum,ripple,litecoin,chainlink',
            },
            headers: {
                accept: 'application/json',
                'x-cg-api-key': 'CG-uL4NNEdbzUBuVCJFYYxY1KbT'
            }
        });
    
        const data = response.data;
        await Crypto.deleteMany({}); 
        await Crypto.insertMany(data);
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

const getLatestCryptoData = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50; 
        const data = await Crypto.find().sort({ createdAt: -1 }).limit(limit); 
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

module.exports = {
    fetchCryptoData,
    getLatestCryptoData
};
