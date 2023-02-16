import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./styles/tailwind.generated.css";

import { Provider } from 'urql';
import { client } from './graphql';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
