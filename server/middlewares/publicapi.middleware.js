const axios = require('axios');
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    app.get('/api/list', authenticate, async (req, res) =>{ // middleware
        const getCryptoData = async () => {
            const config = {
                method: 'get',
                // baseURL: 'https://api.coincap.io/v2/assets', //coincap
                // baseURL: 'https://api.cryptowat.ch/markets/kraken/btcusd/price', //cryptowat.ch
                baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=2',
                // baseURL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
                // url: '',
                headers: {
                // 'Api-Token': 'xxxxxxx' // default api token key:value format.
                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY, // for coinmarketcap.com
                'Accept': 'application/json'
                },
            }
            try {
                const response = await axios(config);
                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        }
        const getList = await getCryptoData();
        res.send(getList);
    })
    app.get(`/api/list/getone`, authenticate, async (req, res) =>{ // middleware - FIX AUTH.
        const getCryptoOne = async () => {
            const config = {
                method: 'get',
                // baseURL: 'https://api.coincap.io/v2/assets', //coincap
                // baseURL: 'https://api.cryptowat.ch/markets/kraken/btcusd/price', //cryptowat.ch
                baseURL: `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${req.query.symbol}`, //https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
                // baseURL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
                // url: '',
                headers: {
                // 'Api-Token': 'xxxxxxx' // default api token key:value format.
                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY, // for coinmarketcap.com
                'Accept': 'application/json'
                },
            }
            try {
                const response = await axios(config);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
        const getOne = await getCryptoOne();
        res.send(getOne);
    })
}