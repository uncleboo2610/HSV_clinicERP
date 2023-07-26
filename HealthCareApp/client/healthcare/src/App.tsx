import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './shared/layout/MainLayout';
import HomePage from './modules/HomePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route errorElement={<h2>Error</h2>}>
          <Route path='/auth/login' element={<LogInPage />} />
        </Route> */}
        <Route element={<MainLayout />} errorElement={<h2>Error</h2>}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
