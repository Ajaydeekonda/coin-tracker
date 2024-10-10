const Crypto = require('../models/Crypto');

// GET /stats
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;
  try {
    const latestCrypto = await Crypto.findOne({ coinId: coin }).sort({ timestamp: -1 });
    if (!latestCrypto) {
      return res.status(404).json({ message: 'No data found for the requested cryptocurrency.' });
    }
    res.json({
      price: latestCrypto.price,
      marketCap: latestCrypto.marketCap,
      '24hChange': latestCrypto['24hChange'],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cryptocurrency stats', error });
  }
};

// GET /deviation
const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;
    try {
      // Fetch last 100 prices for the given coin
      const prices = await Crypto.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100).select('price');
      if (!prices.length) {
        return res.status(404).json({ message: 'Not enough data to calculate deviation.' });
      }
      
      const priceValues = prices.map((p) => p.price);
      
      // Calculate standard deviation
      const mean = priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length;
      const variance = priceValues.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / priceValues.length;
      const standardDeviation = Math.sqrt(variance).toFixed(2); // Limit to two decimal places
  
      res.json({ deviation: parseFloat(standardDeviation) }); // Convert back to number for JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error calculating deviation', error });
    }
  };
  

module.exports = {
  getCryptoStats,
  getCryptoDeviation,
};
