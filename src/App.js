import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CryptoTable from './components/CryptoTable';
import ChangeSymbolModal from './components/ChangeSymbolModal';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Real-time Crypto Dashboard</h1>
        <button onClick={() => setShowModal(true)}>Change Symbol</button>
        {showModal && <ChangeSymbolModal closeModal={() => setShowModal(false)} />}
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;
