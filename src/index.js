import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import {SocketProvider} from './Components/Context/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <Auth0Provider
    domain="dev-kwhmbsrhsjzbmzrb.us.auth0.com"
    clientId="oRpZn4hyPdf1cazgA6n5km8q60JQcCrt"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <SocketProvider>
    <App />
    </SocketProvider>
  </Auth0Provider>
    </HashRouter>
  </React.StrictMode>
);

