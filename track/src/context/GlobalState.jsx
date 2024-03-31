
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, { transactions: [] });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      dispatch({
        type: 'SET_TRANSACTIONS',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }
  

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{ transactions: state.transactions, deleteTransaction, addTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
