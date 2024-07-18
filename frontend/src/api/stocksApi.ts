import axios from 'axios';
import { Stock } from '../types';

const API_BASE_URL = 'http://localhost:4000'; // Replace with your backend URL

export const fetchStocks = async (stockSymbol: string): Promise<Stock[]> => {
  const response = await axios.get<Stock[]>(`${API_BASE_URL}/api/stocks?symbol=${stockSymbol}`);
  return response.data;
};
