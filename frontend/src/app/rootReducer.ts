import { combineReducers } from '@reduxjs/toolkit';
import stocksReducer, { StocksState } from './stocksSlice';
import selectedStockReducer, { SelectedStockState } from './selectedStockSlice';

const rootReducer = combineReducers({
  stocks: stocksReducer,
  selectedStock: selectedStockReducer,
});

export type RootState = {
  stocks: StocksState;
  selectedStock: SelectedStockState;
};

export default rootReducer;
