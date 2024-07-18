import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchStocks } from '../api/stocksApi';
import { setStocks } from '../app/stocksSlice';
import ChangeStockModal from './ChangeStockModal';
import { Stock } from '../types';

const StockTable: React.FC = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stocks.stocks);
  const selectedStock = useSelector((state: RootState) => state.selectedStock.selectedStock);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const data = await fetchStocks(selectedStock);
        dispatch(setStocks(data));
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocksData();
    const interval = setInterval(fetchStocksData, 5000);

    return () => clearInterval(interval);
  }, [dispatch, selectedStock]);

  return (
    <div className='stock-container'>
      <h2>Stock Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock: Stock) => (
            <tr key={stock.id}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChangeStockModal />
    </div>
  );
};

export default StockTable;
