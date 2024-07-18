import { Schema, model } from 'mongoose';

const stockSchema = new Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Stock = model('Stock', stockSchema);
export default Stock;
