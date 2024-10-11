const Crypto = require('../models/Crypto');

// the below function is used for getting the stats
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;
  try {
    //finds the latest coin object stored in the database
    const latestCrypto = await Crypto.findOne({ coinId: coin }).sort({ timestamp: -1 }); 
    if (!latestCrypto) {
      return res.status(404).json({ message: 'No data found for the requested cryptocurrency.' });
    }
    res.json({
      price: latestCrypto.price,
      marketCap: latestCrypto.marketCap,
      '24hChange': latestCrypto['24hChange'].toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cryptocurrency stats', error });
  }
};

// function to find the deviation of the price of the particular coin
const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;
    try {
      // Fetch last 100 prices for the given coin
      const prices = await Crypto.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100).select('price'); 
      if (!prices.length) {
        return res.status(404).json({ message: 'Not enough data to calculate deviation.' });
      }
      
      // console.log(prices);
      const priceValues = prices.map((p) => p.price);
      
      // Calculate standard deviation
      const mean = priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length; // calculate mean
      const variance = priceValues.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / priceValues.length; //calculate variance
      const standardDeviation = Math.sqrt(variance).toFixed(2); // Limit to two decimal places
  
      res.json({ deviation: parseFloat(standardDeviation) }); // Convert back to number for JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error calculating deviation', error });u
    }
  };
  
//export the functions
module.exports = {
  getCryptoStats,
  getCryptoDeviation,
};
