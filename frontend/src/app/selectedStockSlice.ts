import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedStockState {
  selectedStock: string;
}

const initialState: SelectedStockState = {
  selectedStock: 'bitcoin', // Default stock
};

const selectedStockSlice = createSlice({
  name: 'selectedStock',
  initialState,
  reducers: {
    setSelectedStock(state, action: PayloadAction<string>) {
      state.selectedStock = action.payload;
    },
  },
});

export const { setSelectedStock } = selectedStockSlice.actions;
export default selectedStockSlice.reducer;
