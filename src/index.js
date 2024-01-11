import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastState from './CONTEXT/State/ToastState';
import RetweetState from './CONTEXT/State/RetweetState';
import TweetState from './CONTEXT/State/TweetState';
import ProfileState from './CONTEXT/State/ProfileState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastState>
    <ProfileState>
    <TweetState>
      <RetweetState>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RetweetState>
    </TweetState>
    </ProfileState>
  </ToastState>
);

reportWebVitals();
