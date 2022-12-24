import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QueryContextProvider from './QueryContext';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <QueryContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchResults />} />
          <Route path="/results" element={<div/>} />
        </Routes>
      </Router>
    </QueryContextProvider>
  );
}

export default App;
