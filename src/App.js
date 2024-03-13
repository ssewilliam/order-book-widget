import OrderBook from "components/OrderBook";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <OrderBook />
    </Provider>
  );
}

export default App;
