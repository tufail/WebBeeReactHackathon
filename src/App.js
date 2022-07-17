import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import ManageTypes from './pages/ManageTypes';
import ItemById from './pages/ItemById';
import NoPage from './pages/NoPage';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/types" element={<ManageTypes />} />
        <Route path="/type/:id" element={<ItemById />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
