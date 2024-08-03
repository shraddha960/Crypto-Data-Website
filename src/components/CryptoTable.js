import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCryptoData } from '../store/slices/cryptoSlice';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { data, symbol } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData(symbol)); 

    const socket = new WebSocket('ws://localhost:5011'); 

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      try {
        console.log('Received WebSocket message:', event.data);
        const newData = JSON.parse(event.data);
        console.log('Parsed newData:', newData);
      
        dispatch(fetchCryptoData(symbol));
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => socket.close();
  }, [dispatch, symbol]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Volume</th>
          <th>Change %</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.current_price}</td>
              <td>{crypto.market_cap}</td>
              <td>{crypto.total_volume}</td>
              <td>{crypto.price_change_percentage_24h}%</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CryptoTable;
