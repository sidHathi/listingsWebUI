import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryContextProvider } from './QueryContext';
import SearchResults from './pages/SearchResults';
import theme from './styles/mui-theme';
import { ThemeProvider } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Nav from './ui/Nav';
import { ViewportProvider } from './ui/useViewport';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <ViewportProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContextProvider>
            <QueryContextProvider>
              <Nav />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/results" element={<SearchResults />} />
              </Routes>
              </QueryContextProvider>
            </AppContextProvider>
          </Router>
      </ThemeProvider>
    </ViewportProvider>
  );
}

export default App;
