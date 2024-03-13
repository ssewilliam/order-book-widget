import { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./OrderBook.css";

export default function OrderBookComponent({ dispatch, payload }) {
  const { bids, asks, subscription, isLoading } = useSelector(
    state => state.orderBook
  );
  const sortedBidPrices = Object.keys(bids).sort((a, b) => b - a);
  const sortedOfferPrices = Object.keys(asks).sort((a, b) => b - a);
  const { chanId } = subscription || {};

  const toggleConnection = () => {
    let action = { type: "socket/subscribe", payload };
    if (chanId) {
      action.type = "socket/unsubscribe";
      action.payload = { event: "unsubscribe", chanId };
    }
    dispatch(action);
  };

  /**
   * Set the precision based on the current values of the element | button clicked
   * @param {*} event click event properties for the button element clicked
   */
  const handleSubScription = event => {
    const name = event.target.name;
    let id = Number(event.target.id);
    let action = { type: "socket/subscribe", payload };
    if (name === "decrement" && id !== 4) id++;
    if (name === "increment" && id !== 0) id--;

    // only unsubscribe if there is an active subscription
    if (chanId) {
      dispatch({
        type: "socket/unsubscribe",
        payload: { event: "unsubscribe", chanId },
      });
    }

    // Set the new prec for the payload to be sent on the socket connection
    action.payload.prec = `P${id}`;
    dispatch(action);
    event.target.id = id;
  };
  return (
    <div className="orderbook">
      <div className="topbar">
        <span className="title">
          <i className="fa fa-chevron-right" aria-hidden="true"></i> ORDER BOOK{" "}
          <span className="muted">BTC/USD</span>
        </span>
        <span className="actions">
          <button
            onClick={handleSubScription}
            id="0"
            value={payload.prec}
            name="decrement"
            title="Decrease precision"
            disabled={payload.prec === "P4"}
          >
            .0{" "}
            <sub>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </sub>
          </button>
          <button
            onClick={handleSubScription}
            id="4"
            value={payload.prec}
            name="increment"
            title="increase precision"
            disabled={payload.prec === "P0"}
          >
            .00
            <sub>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </sub>
          </button>
        </span>
      </div>
      <div className="book-data-container">
        <div className="highest-bids">
          <div>COUNT</div>
          <div>AMOUNT</div>
          <div>PRICE</div>
          {sortedBidPrices.map(key => (
            <Fragment key={key}>
              <div>{bids[key].count}</div>
              <div>{bids[key].amount}</div>
              <div>{bids[key].price}</div>
            </Fragment>
          ))}
        </div>
        <div className="lowest-bids">
          <div>PRICE</div>
          <div>AMOUNT</div>
          <div>COUNT</div>
          {sortedOfferPrices.map(key => (
            <Fragment key={key}>
              <div>{asks[key].price}</div>
              <div>{asks[key].amount}</div>
              <div>{asks[key].count}</div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="connect-buttons">
        <button onClick={toggleConnection} disabled={isLoading}>
          {subscription?.chanId ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
OrderBookComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
};
