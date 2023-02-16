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
import useRoutes from './hooks/useRoutes';

function App() {
  const [routes, fetching] = useRoutes();

  console.log(routes);

  return (
    <div className="App bg-theme-color-500 h-100 w-100">
      <Provider value={client}>
        <AppProvider>
          <Routes>
            {!fetching ? routes.map((route: RouteProps, i) => <Route key={i} {...route} />) : []}
          </Routes>
        </AppProvider>
      </Provider>
    </div>
  );
}

export default App;
