import React, { useState, useRef } from 'react';
import PublicRoutes from './routes/PublicRoutes';

import {
  RouteProps,
  Routes,
  Route
} from 'react-router-dom';
import { client } from './graphql';

import {
  Provider,
} from "urql";

function App() {
  return (
    <div className="App">
      <Provider value={client}>
        <Routes>
          {PublicRoutes.map((route: RouteProps, i) => <Route key={i} {...route} />)}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
