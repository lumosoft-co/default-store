import React, { useState, useRef } from 'react';
import PublicRoutes from './routes/PublicRoutes';

import {
  RouteProps,
  Routes,
  Route
} from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  Provider,
  createClient,
  fetchExchange,
  dedupExchange,
  subscriptionExchange,
  cacheExchange
} from "urql";

// TODO perform cache actions
//const cache = cacheExchange()

const client = createClient({
  url: 'http://localhost:4000',
  fetchOptions: () => {
    return {
      headers: {
        "X-AGORA-STORE-ID": Cookies.get("X-AGORA-STORE-ID") ?? "AAABhUtFyNCsaqQL",
      }
    }
  },
  exchanges: [
    dedupExchange,
    fetchExchange
  ]
});


function App() {
  let PublicRouteMap = PublicRoutes;

  return (
    <div className="App">
      <Provider value={client}>
        <Routes>
          {[...PublicRouteMap].map((route: RouteProps, i) => <Route key={i} {...route} />)}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
