import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderBookComponent from "./OrderBook";

export default function OrderBook() {
  const dispatch = useDispatch();
  const [subscription] = useState({
    event: "subscribe",
    channel: "book",
    pair: "tBTCUSD",
    prec: "P0",
    freq: "F0",
    len: "25",
  });

  useEffect(() => {
    dispatch({ type: "socket/connect", payload: subscription });
    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, [dispatch, subscription]);

  return <OrderBookComponent dispatch={dispatch} payload={subscription} />;
}
