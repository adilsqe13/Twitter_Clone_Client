import React from 'react';
import CoverPage from './Components/CoverPage';
import MainPage from './Components/MainPage';
import './App.css';
import Toast from './Components/Toast'

export default function App() {
  const token = localStorage.getItem('token');
  return (
    <>
      <Toast />
      {!token && <CoverPage />}
      {token && <MainPage />}
    </>
  );
}

