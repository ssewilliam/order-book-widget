/**
 * Get the current bids and asks based on the order response
 * @param {object} bidsAsksObj An object of bids and asks
 * @param {Array<number>} streamFields an array of the price count and amount
 * @returns {object<bids,asks>} returns the object of bids and asks
 */
export const calculateBidsAndAsks = (bidsAsksObj, streamFields) => {
  const [price, count, amount] = streamFields;
  const BOOK = { bids: { ...bidsAsksObj.bids }, asks: { ...bidsAsksObj.asks } };
  if (count > 0) {
    //Add or update price level
    const side = amount > 0 ? "bids" : "asks";
    BOOK[side][price] = {
      price,
      amount: Math.abs(amount),
      count: (BOOK[side][price]?.count || 0) + 1,
    };
  }

  if (count === 0) {
    // delete price level
    const side = amount === 1 ? "bids" : "asks";
    BOOK[side][price] && delete BOOK[side][price];
  }
  return BOOK;
};
