import { useEffect, useState } from "react";
import OrderBookComponent from "./OrderBook";
import { SOCKET_API } from "config/env";
import { setLoading, setOrders } from "store/orderBook";

export default function OrderBook() {
    const [subscription, setSubscription] = useState({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: "P0",
        freq: "F0"
    });

    const handleSubScription = () => {
        setSubscription(prev => prev);
    }

    useEffect(() => {
        const ws = new WebSocket(SOCKET_API);
        ws.onopen = () => {
            ws.send(JSON.stringify(subscription));
            setLoading(true)
        }
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log("--->",response);
            switch (response.event) {
                case 'data':
                    console.log("---->", response.data);
                    setOrders(response.data);
                    setLoading(false)
                    break;
                case 'reconnect':
                    ws.onopen()
                    break;
                default:
                    setLoading(false)
                    break;
            }
        };
        ws.onclose = () => {
            setLoading(false)
        }
        return () => {
            ws.close()
        }
    }, [subscription]);

    return <OrderBookComponent handleSubscription={handleSubScription} />
}
