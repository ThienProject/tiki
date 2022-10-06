import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from '~/components/GlobalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '~/app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Provider store = {store}>
        <App />
      </Provider>
    </GlobalStyle>
  </React.StrictMode>
);

reportWebVitals();
