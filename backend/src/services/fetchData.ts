import axios from 'axios';
import Stock from '../models/Stock';
import Bottleneck from 'bottleneck';

// Set up the rate limiter
const limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests in milliseconds
  maxConcurrent: 1, // Max concurrent requests
});

const fetchData = async () => {
  const symbols = ['bitcoin', 'ethereum'];
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

  try {
    const response = await limiter.schedule(() => axios.get(apiUrl));
    const data = response.data;
    symbols.forEach(async (symbol) => {
      const price = data[symbol]?.usd;
      if (price) {
        const newStock = new Stock({ symbol, price });
        await newStock.save();
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchData;

// Call fetchData every 5 seconds
setInterval(fetchData, 5000);
