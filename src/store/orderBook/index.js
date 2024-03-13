import { createSlice } from "@reduxjs/toolkit";

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState: {
    bids: {},
    asks: {},
    subscription: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    setSubscription: (state, action) => ({
      ...state,
      subscription: action.payload,
    }),
    setBidsAndOffers: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});
export const { setLoading, setSubscription, setBidsAndOffers } =
  orderBookSlice.actions;
export default orderBookSlice.reducer;
