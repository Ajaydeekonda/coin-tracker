# Coin Tracker API

## Overview
The Coin Tracker API provides a simple interface to track and analyze cryptocurrency prices. It allows users to fetch real-time price data and calculate statistical insights into cryptocurrency price movements.

## Features
- Retrieve the latest cryptocurrency prices.
- Calculate the standard deviation of the last 100 prices for any specified cryptocurrency.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** MongoDB Atlas, Render

## API Endpoints

### GET /deviation
Calculates the standard deviation of the last 100 prices for a specified cryptocurrency.

### GET /stats
Retrieves statistical data for the specified cryptocurrency, including the average price and price variance.




