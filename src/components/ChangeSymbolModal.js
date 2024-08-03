import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/slices/cryptoSlice';

const ChangeSymbolModal = ({ closeModal }) => {
  const [newSymbol, setNewSymbol] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setSymbol(newSymbol));
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <input
          type="text"
          placeholder="Enter stock/crypto symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ChangeSymbolModal;
