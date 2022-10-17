import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from '~/components/GlobalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '~/app/store';
import {ToastProvider} from './providers/ToastProvider/ToastProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <GlobalStyle>
      <Provider store = {store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </GlobalStyle>
  // </React.StrictMode>
);

reportWebVitals();
