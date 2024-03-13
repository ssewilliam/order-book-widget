import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createLogger } from "redux-logger";
import orderBookReducer from "store/orderBook";
import { NODE_ENV } from "config/env";
import {
  orderBookMiddleware,
  OrderBookSocket,
} from "./orderBook/orderBookMiddleware";

let logger = [];
if (NODE_ENV !== "production") {
  logger = [createLogger()];
}

const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      orderBookMiddleware(OrderBookSocket),
      ...logger
    ),
  devTools: process.env.NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export default store;
