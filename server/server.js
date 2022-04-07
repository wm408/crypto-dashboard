const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:3000"
}))

const getCryptoData = async () => {
    const config = {
        method: 'get',
        // baseURL: 'https://api.coincap.io/v2/assets', //coincap
        // baseURL: 'https://api.cryptowat.ch/markets/kraken/btcusd/price', //cryptowat.ch
        baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5',
        // baseURL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
        // url: '',
        headers: {
        // 'Api-Token': '94e41911-5362-4f5d-918a-1654c878ea9a', // for coinmarketcap.com
        'X-CMC_PRO_API_KEY': '94e41911-5362-4f5d-918a-1654c878ea9a', // for coinmarketcap.com
        'Accept': 'application/json'
        },
    }
    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
    }
}

app.get(`/list`, async (req, res) =>{ // middleware
    const getList = await getCryptoData();
    res.send(getList);
})

app.listen(8000, () => console.log('Running on localhost 8000'));