import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import App from './App.jsx';
import { config } from './config.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
