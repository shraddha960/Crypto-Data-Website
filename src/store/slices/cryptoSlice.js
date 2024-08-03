import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ENDPOINT = "http://localhost:5011"; // Backend URL

export const fetchCryptoData = createAsyncThunk('crypto/fetchData', async (symbol) => {
  const response = await axios.get(`${ENDPOINT}/api/crypto/latest`, { params: { limit: 50 } }); 
  return response.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    symbol: 'bitcoin'
  },
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const { setSymbol } = cryptoSlice.actions;
export default cryptoSlice.reducer;
