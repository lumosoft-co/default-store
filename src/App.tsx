import {
  RouteProps,
  Routes,
  Route
} from 'react-router-dom';
import { client } from './graphql';
import { Alert } from './components';

import {
  Provider,
} from "urql";
import AppProvider from './context';
import useRoutes from './hooks/useRoutes';

import { SnackBarContext, ISnackBarMessage, ISnackBarContext } from './context/SnackBar';
import { useContext } from 'react';

function App() {
  const [routes, fetching] = useRoutes();
  const { snackBar } = useContext(SnackBarContext) as ISnackBarContext;

  return (
    <div className="App bg-theme-color-500 h-100 w-100">
      <Routes>
        {!fetching ? routes.map((route: RouteProps, i) => <Route key={i} {...route} />) : []}
      </Routes>
      {snackBar.map((alert: ISnackBarMessage) => {
        return (
          <div className="fixed z-50 right-0 bottom-0">
            <Alert {...alert} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
