import { ReactNode } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import hasRouteAccess from './functions/hasRouteAccess';
import { useAuthFromLocalStorage } from './hooks/useAuthFromLocalStorage';
import routes from "./routes/appRoutes";
import { useRootState } from './state/store';


const App: React.FC = () => {

  const authState = useRootState().auth
  useAuthFromLocalStorage()

  const renderRoutes = (): ReactNode => routes.map(r =>
    <Route
      key={r.linkName} path={r.path} exact={r.exact}
      render={() => hasRouteAccess(r, authState) ?
        <r.component {...r.props} /> : <Redirect to={"/"} />
      } />
  )

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          {renderRoutes()}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


