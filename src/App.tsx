import React, { useState } from 'react';
import PublicRoutes from './routes/PublicRoutes';
import UserProvider, { UserContext } from './context/UserContext';

import {
  RouteProps,
  Routes,
  Route
} from 'react-router-dom';
import { client } from './graphql';

import {
  Provider,
} from "urql";
import AppProvider from './context';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
    <div className="App bg-theme-color-500 h-100 w-100">
      <Provider value={client}>
        <AppProvider>
          <Routes>
            {PublicRoutes.map((route: RouteProps, i) => <Route key={i} {...route} />)}
          </Routes>
        </AppProvider>
      </Provider>
    </div>
  );
}

export default App;
