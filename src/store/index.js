import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import orderBookReducer from 'store/orderBook';

const store = configureStore({
    reducer: {
        orderBook: orderBookReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);
export default store;
