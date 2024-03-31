
export default function AppReducer(state, action) {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
}
