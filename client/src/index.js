import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '~/components/GlobalStyles';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      
        <App />
      
    </GlobalStyle>
  </React.StrictMode>
);


reportWebVitals();
