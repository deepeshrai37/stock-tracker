import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '../types';

export interface StocksState {
  stocks: Stock[];
}

const initialState: StocksState = {
  stocks: [],
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks(state, action: PayloadAction<Stock[]>) {
      state.stocks = action.payload;
    },
  },
});

export const { setStocks } = stocksSlice.actions;
export default stocksSlice.reducer;
