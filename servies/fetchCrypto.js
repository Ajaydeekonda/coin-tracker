const axios = require('axios');
const Crypto = require('../models/Crypto');
const cron = require('node-cron');

// Define the CoinGecko API URL
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';

// Function to fetch cryptocurrency data from the CoinGecko API
const fetchCryptoData = async () => {
  try {
    // Fetch data from CoinGecko API
    const response = await axios.get(COINGECKO_URL);
    const data = response.data;

   // console.log(data); // comment out to check if it is getting the data from coingecko

    // Iterate over the cryptocurrencies to save them in MongoDB
    for (const [coinId, cryptoData] of Object.entries(data)) {
      const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = cryptoData;

      // Create a new record in the database
      const cryptoRecord = new Crypto({
        coinId,
        price,
        marketCap,
        '24hChange': change24h,
        timestamp: Date.now(), // Automatically set current time
      });

      // Save the record to the database
      await cryptoRecord.save();
      console.log(`Saved ${coinId} data to the database`); //console log to check whether it's saved 
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
};

// Schedule the function to run every 2 hours (you can adjust this as needed)
cron.schedule('0 */2 * * *', fetchCryptoData);
 // This runs the task at every 2nd hour

// Export the function for use in other parts of the app if necessary
module.exports = fetchCryptoData;
