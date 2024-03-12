import { createSlice } from '@reduxjs/toolkit';

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {
        isLoading: false,
        orders: [],
        error: null,
    },
    reducers: {
        setLoading: (state, action) => ({
            ...state,
            isLoading: action.payload,
        }),
        setOrders: (state, action) => ({
            ...state,
            isLoading: false,
            orders: action.payload,
        }),
    },
});
export const { setLoading, setOrders } = orderBookSlice.actions;
export default orderBookSlice.reducer;
