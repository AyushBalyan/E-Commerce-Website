// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ViewAllSneakers from './pages/ViewAllSneakers';
import ViewAllWatches from './pages/ViewAllWatches';
import ProductPage from './pages/ProductPage';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/view-all-sneakers" element={<ViewAllSneakers />} />
          <Route path="/view-all-watches" element={<ViewAllWatches/>} />
          <Route path="/product/:category/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;