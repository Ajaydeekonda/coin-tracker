const fetch = require('node-fetch'); // Import node-fetch
const Crypto = require('../models/Crypto');
const cron = require('node-cron');
require('dotenv').config(); // Load environment variables from .env file

// Define the CoinGecko API URL for the cryptocurrencies
const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x_cg_demo_api_key=CG-DG7TEUCDhS9kMZbPJZC8i2iK";

// Function to fetch cryptocurrency data from the CoinGecko API
const fetchCryptoData = async () => {
  try {
    // Fetch data from CoinGecko API using node-fetch
    console.log(process.env.COINGECKO_API_KEY);
    const response = await fetch(COINGECKO_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response

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
      console.log(`Saved ${coinId} data to the database`); // Console log to check whether it's saved
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
};

// Schedule the function to run every 2 hours (you can adjust this as needed)
cron.schedule('0 */2 * * *', fetchCryptoData); // This runs the task at every 2nd hour

// Export the function for use in other parts of the app if necessary
module.exports = fetchCryptoData;
