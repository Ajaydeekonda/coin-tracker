const express = require('express');
const connectToDatabase = require('./database');
const { getCryptoStats, getCryptoDeviation } = require('./controllers/CryptoController');
const fetchCryptoData = require('./servies/fetchCrypto'); 

require('dotenv').config(); // To use .env variables

const app = express();
app.use(express.static('public'));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Define routes
app.get("/stats", getCryptoStats); // for stats get request
app.get("/deviation", getCryptoDeviation); //for deviation get request

const PORT = process.env.PORT || 10000;
// Connect to MongoDB Atlas and start the server
connectToDatabase().then(async () => {
  await fetchCryptoData(); // Fetch data immediately on startup
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
