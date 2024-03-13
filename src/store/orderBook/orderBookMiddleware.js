import { SOCKET_API } from "config/env";
import { setBidsAndOffers, setSubscription, setLoading } from ".";
import { calculateBidsAndAsks } from "util/calculateBidsAndAsks";

export const OrderBookSocket = {
  socket: null,
  time: Date.now(),
  connect(url) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
    }
  },

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  },
  send(message) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  },
  on(eventName, callback) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  },
};

/**
 * orderBook Middleware used to handle read orderbook data
 * @param {*} socket Socket object used to make requests to the orderbook API
 * @returns
 */
export const orderBookMiddleware = socket => params => next => action => {
  const { dispatch, getState } = params;
  const { type, payload } = action;
  switch (type) {
    case "socket/connect":
      dispatch(setLoading(true));
      socket.connect(SOCKET_API);
      socket.on("open", () => socket.send(payload));

      socket.on("message", event => {
        const response = JSON.parse(event.data);
        if (response.event === "subscribed") {
          dispatch(setLoading(false));
          return dispatch(setSubscription(response));
        }
        if (response.event === "unsubscribed") {
          dispatch(setLoading(false));
          return dispatch(setSubscription(null));
        }
        if (response.event) return;
        if (!response.length || response[1].length < 3) return;
        const data = response[1];

        if (data.length > 3) {
          const bidsAsksObj = data.reduce(
            ({ bids = {}, asks = {} }, currentField) =>
              calculateBidsAndAsks({ bids, asks }, currentField),
            []
          );
          return dispatch(setBidsAndOffers(bidsAsksObj));
        }
        if (data.length === 3) {
          const { bids, asks } = getState().orderBook;
          const bidsAsksObj = calculateBidsAndAsks({ bids, asks }, data);
          dispatch(setBidsAndOffers(bidsAsksObj));
        }
      });
      break;

    case "socket/subscribe":
      dispatch(setLoading(true));
      socket.send(payload);
      break;
    case "socket/unsubscribe":
      dispatch(setLoading(true));
      socket.send({ payload });
      break;
    case "socket/disconnect":
      socket.disconnect();
      break;

    default:
      break;
  }

  return next(action);
};
