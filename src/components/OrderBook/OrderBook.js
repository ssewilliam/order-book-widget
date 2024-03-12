import "./OrderBook.css"

export default function OrderBookComponent() {
    return (
        <div className="orderbook">
            <div className="topbar">
                <span className="title">
                    <i className="fa fa-chevron-right" aria-hidden="true"></i> ORDER BOOK <span className="muted">BTC/USD</span>
                </span>
                <span className="actions">
                    <span>.0 <sub><i className="fa fa-arrow-left" aria-hidden="true"></i></sub></span>
                    <span>.00<sub><i className="fa fa-arrow-right" aria-hidden="true"></i></sub></span>
                </span>
            </div>
            <div className="book-data-container">
                <div className="highest-bids">
                    <div></div>
                    <div>COUNT</div>
                    <div>AMOUNT</div>
                    <div>TOTAL</div>
                    <div>PRICE</div>
                </div>
                <div className="lowest-bids">
                    <div>PRICE</div>
                    <div>TOTAL</div>
                    <div>AMOUNT</div>
                    <div>COUNT</div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
