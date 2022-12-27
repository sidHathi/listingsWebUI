import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryContextProvider } from './QueryContext';
import SearchResults from './pages/SearchResults';
import theme from './styles/mui-theme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <QueryContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/results" element={<div/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryContextProvider>
  );
}

export default App;
